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
    public class OwnerRepository : IOwnerRepository
    {
        private readonly PropertyRentalContext context;

        public OwnerRepository(PropertyRentalContext context)
        {
            this.context = context;
        }

        public async Task<QueryResult<Owner>> GetOwners(OwnerQuery queryObject = null)
        {
            var queryResult = new QueryResult<Owner>();
            var query = context.Owners.AsQueryable();
            queryResult.TotalItems = await query.CountAsync();
            if (queryObject != null)
            {
                query = this.SortByRequired(query, queryObject);
                queryResult.TotalItems = await query.CountAsync();
                query = this.PagingRequired(query, queryObject);
            }
            queryResult.Items = await query.ToListAsync();
            return queryResult;
        }

        public async Task<Owner> GetOwner(int id)
        {
            return await context.Owners.FindAsync(id);
        }

        public async Task<Owner> FindOwner(OwnerResource ownerResource)
        {
            return await context.Owners.SingleOrDefaultAsync(record =>
                record.Name == ownerResource.Name &&
                record.Email == ownerResource.Email &&
                record.Mobile == ownerResource.Mobile);
        }

        public void Add(Owner owner)
        {
            context.Owners.Add(owner);
        }

        public void Remove(Owner owner)
        {
            context.Owners.Remove(owner);
        }
        private IQueryable<Owner> SortByRequired(IQueryable<Owner> query, OwnerQuery queryObject)
        {
            if (!String.IsNullOrWhiteSpace(queryObject.SortBy))
            {
                var columnsMap = new Dictionary<string, Expression<Func<Owner, object>>>()
                {
                    ["name"] = tenant => tenant.Name,
                    ["email"] = tenant => tenant.Email
                };
                return query.ApplyOrdering(queryObject, columnsMap);
            }
            return query;
        }

        private IQueryable<Owner> PagingRequired(IQueryable<Owner> query, OwnerQuery queryObject)
        {
            if (queryObject.Page != 0 || queryObject.PageSize != 0)
            {
                return query.ApplyPaging(queryObject);
            }
            return query;
        }
    }
}