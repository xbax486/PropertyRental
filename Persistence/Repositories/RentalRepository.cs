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
    public class RentalRepository : IRentalRepository
    {
        private readonly PropertyRentalContext context;

        public RentalRepository(PropertyRentalContext context)
        {
            this.context = context;
        }

        public async Task<QueryResult<Rental>> GetRentals(RentalQuery queryObject = null)
        {
            var queryResult = new QueryResult<Rental>();
            var query = context.Rentals
                .Include(rental => rental.Tenant)
                .Include(rental => rental.Property)
                    .ThenInclude(property => property.Suburb)
                        .ThenInclude(suburb => suburb.State)
                .AsQueryable();
            query = this.SortByRequired(query, queryObject);
            queryResult.TotalItems = await query.CountAsync();
            query = this.PagingRequired(query, queryObject);
            queryResult.Items = await query.ToListAsync();
            foreach (var rental in queryResult.Items)
            {
                rental.Property.Owner = await context.Owners.SingleOrDefaultAsync(owner => owner.Id == rental.Property.OwnerId);
            }
            return queryResult;
        }

        public async Task<Rental> GetRental(int id, bool includeRelated = true)
        {
            if (!includeRelated)
            {
                return await context.Rentals.FindAsync(id);
            }
            var rental = await context.Rentals
                .Include(rental => rental.Tenant)
                .Include(rental => rental.Property)
                    .ThenInclude(property => property.Suburb)
                        .ThenInclude(suburb => suburb.State)
                .SingleOrDefaultAsync(rental => rental.Id == id);
            rental.Property.Owner = await context.Owners.SingleOrDefaultAsync(owner => owner.Id == rental.Property.OwnerId);
            return rental;
        }

        public async Task<Rental> FindRental(RentalResource rentalResource)
        {
            return await context.Rentals.SingleOrDefaultAsync(record =>
                record.PropertyId == rentalResource.PropertyId &&
                record.TenantId == rentalResource.TenantId &&
                record.Payment == rentalResource.Payment &&
                record.StartDate == rentalResource.StartDate &&
                record.EndDate == rentalResource.EndDate);
        }

        public void Add(Rental rental)
        {
            context.Rentals.Add(rental);
        }

        public void Remove(Rental rental)
        {
            context.Rentals.Remove(rental);
        }
        private IQueryable<Rental> SortByRequired(IQueryable<Rental> query, RentalQuery queryObject)
        {
            if (!String.IsNullOrWhiteSpace(queryObject.SortBy))
            {
                var columnsMap = new Dictionary<string, Expression<Func<Rental, object>>>()
                {
                    ["owner"] = rental => rental.Property.Owner.Name,
                    ["tenant"] = rental => rental.Tenant.Name,
                    ["suburb"] = rental => rental.Property.Suburb.Name,
                    ["state"] = rental => rental.Property.Suburb.State.Acronym,
                };
                return query.ApplyOrdering(queryObject, columnsMap);
            }
            return query;
        }

        private IQueryable<Rental> PagingRequired(IQueryable<Rental> query, RentalQuery queryObject)
        {
            if (queryObject.Page != 0 || queryObject.PageSize != 0)
            {
                return query.ApplyPaging(queryObject);
            }
            return query;
        }
    }
}