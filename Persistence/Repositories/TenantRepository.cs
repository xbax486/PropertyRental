using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;
using PropertyRental.Core.Interfaces;
using PropertyRental.Controllers.Resources;
using PropertyRental.Extensions;
using PropertyRental.Models.Query;

namespace PropertyRental.Persistence.Repositories
{
    public class TenantRepository : ITenantRepository
    {
        private readonly PropertyRentalContext context;

        public TenantRepository(PropertyRentalContext context)
        {
            this.context = context;
        }

        public async Task<QueryResult<Tenant>> GetTenants(TenantQuery queryObject = null)
        {
            var queryResult = new QueryResult<Tenant>();
            var query = context.Tenants.AsQueryable();
            query = await this.FilteredRequired(query, queryObject, this.context);
            query = this.SortByRequired(query, queryObject);
            queryResult.TotalItems = await query.CountAsync();
            query = this.PagingRequired(query, queryObject);
            queryResult.Items = await query.ToListAsync();
            return queryResult;
        }
        public async Task<Tenant> GetTenant(int id)
        {
            return await context.Tenants.FindAsync(id);
        }

        public async Task<Tenant> FindTenant(TenantResource tenantResource)
        {
            return await context.Tenants.SingleOrDefaultAsync(record =>
                record.Name == tenantResource.Name &&
                record.Email == tenantResource.Email &&
                record.Mobile == tenantResource.Mobile);
        }

        public void Add(Tenant tenant)
        {
            context.Tenants.Add(tenant);
        }

        public void Remove(Tenant tenant)
        {
            context.Tenants.Remove(tenant);
        }

        private async Task<IQueryable<Tenant>> FilteredRequired(IQueryable<Tenant> query, TenantQuery queryObject, PropertyRentalContext context)
        {
            if (queryObject.Available.HasValue && queryObject.Available == true)
            {
                var unavailableTenants = new List<int>();
                var rentals = await context.Rentals.Include(rental => rental.Tenant).ToListAsync();
                foreach (var rental in rentals)
                {
                    unavailableTenants.Add(rental.Tenant.Id);
                }
                query = query.Where(tenant => !unavailableTenants.Any(unavailableTenantId => unavailableTenantId == tenant.Id));
            }
            return query;
        }
        private IQueryable<Tenant> SortByRequired(IQueryable<Tenant> query, TenantQuery queryObject)
        {
            if (!String.IsNullOrWhiteSpace(queryObject.SortBy))
            {
                var columnsMap = new Dictionary<string, Expression<Func<Tenant, object>>>()
                {
                    ["name"] = tenant => tenant.Name,
                    ["email"] = tenant => tenant.Email
                };
                return query.ApplyOrdering(queryObject, columnsMap);
            }
            return query;
        }

        private IQueryable<Tenant> PagingRequired(IQueryable<Tenant> query, TenantQuery queryObject)
        {
            if (queryObject.Page != 0 || queryObject.PageSize != 0)
            {
                return query.ApplyPaging(queryObject);
            }
            return query;
        }
    }
}