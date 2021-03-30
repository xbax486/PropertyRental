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
    public class SuburbRepository : ISuburbRepository
    {
        private readonly PropertyRentalContext context;

        public SuburbRepository(PropertyRentalContext context)
        {
            this.context = context;
        }

        public async Task<QueryResult<Suburb>> GetSuburbs(SuburbQuery queryObject = null)
        {
            var queryResult = new QueryResult<Suburb>();
            var query = context.Suburbs.Include(suburb => suburb.State).AsQueryable();
            query = this.FilteredRequired(query, queryObject, this.context);
            query = this.SortByRequired(query, queryObject);
            queryResult.TotalItems = await query.CountAsync();
            query = this.PagingRequired(query, queryObject);
            queryResult.Items = await query.ToListAsync();
            return queryResult;
        }

        public async Task<Suburb> GetSuburb(int id, bool includeRelated = true)
        {
            if (!includeRelated)
            {
                return await context.Suburbs.SingleOrDefaultAsync(suburb => suburb.Id == id);
            }
            return await context.Suburbs.Include(suburb => suburb.State).SingleOrDefaultAsync(suburb => suburb.Id == id);
        }

        public async Task<Suburb> FindSuburb(SuburbResource suburbResource)
        {
            return await context.Suburbs.SingleOrDefaultAsync(record =>
                record.Postcode == suburbResource.Postcode &&
                record.Name == suburbResource.Name &&
                record.StateId == suburbResource.StateId);
        }

        public async Task<Suburb> PopulateSuburbWithRelatedFields(Suburb suburb, SuburbResource suburbResource)
        {
            suburb.State = await context.States.SingleOrDefaultAsync(state => state.Id == suburbResource.StateId);
            return suburb;
        }

        public void Add(Suburb suburb)
        {
            context.Suburbs.Add(suburb);
        }

        public void Remove(Suburb suburb)
        {
            context.Suburbs.Remove(suburb);
        }

        private IQueryable<Suburb> FilteredRequired(IQueryable<Suburb> query, SuburbQuery queryObject, PropertyRentalContext context)
        {
            if (queryObject.StateId.HasValue)
                query = query.Where(suburb => suburb.StateId == queryObject.StateId);
            return query;
        }
        private IQueryable<Suburb> SortByRequired(IQueryable<Suburb> query, SuburbQuery queryObject)
        {
            if (!String.IsNullOrWhiteSpace(queryObject.SortBy))
            {
                var columnsMap = new Dictionary<string, Expression<Func<Suburb, object>>>()
                {
                    ["name"] = suburb => suburb.Name,
                    ["postcode"] = suburb => suburb.Postcode,
                    ["state"] = suburb => suburb.State.Name
                };
                return query.ApplyOrdering(queryObject, columnsMap);
            }
            return query;
        }

        private IQueryable<Suburb> PagingRequired(IQueryable<Suburb> query, SuburbQuery queryObject)
        {
            if (queryObject.Page != 0 || queryObject.PageSize != 0)
            {
                return query.ApplyPaging(queryObject);
            }
            return query;
        }
    }
}