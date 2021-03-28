using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;
using PropertyRental.Controllers.Resources;
using PropertyRental.Core.Interfaces;

namespace PropertyRental.Persistence.Repositories
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly PropertyRentalContext context;
        public PropertyRepository(PropertyRentalContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Property>> GetProperties(PropertyQuery queryObject = null)
        {
            var query = context.Properties
                .Include(property => property.Owner)
                .Include(property => property.Suburb)
                    .ThenInclude(suburb => suburb.State)
                .Include(property => property.PropertyType)
                .AsQueryable();
            if (queryObject.Available.HasValue)
                query = query.Where(property => property.Available == queryObject.Available);
            if (queryObject.SuburbId.HasValue)
                query = query.Where(property => property.SuburbId == queryObject.SuburbId.Value);
            if (queryObject.StateId.HasValue)
                query = query.Where(property => property.Suburb.StateId == queryObject.StateId.Value);
            return await query.ToListAsync();
        }

        public async Task<Property> GetProperty(int id, bool includeRelated = true)
        {
            if (!includeRelated)
            {
                return await context.Properties.FindAsync(id);
            }
            return await context.Properties
                .Include(property => property.Owner)
                .Include(property => property.Suburb)
                    .ThenInclude(suburb => suburb.State)
                .Include(property => property.PropertyType)
                .SingleOrDefaultAsync(property => property.Id == id);
        }

        public async Task<Property> FindProperty(PropertyResource propertyResource)
        {
            return await context.Properties.SingleOrDefaultAsync(record =>
                record.Unit == propertyResource.Unit &&
                record.Street == propertyResource.Street &&
                record.SuburbId == propertyResource.SuburbId);
        }

        public void Add(Property property)
        {
            context.Properties.Add(property);
        }

        public void Remove(Property property)
        {
            context.Properties.Remove(property);
        }
    }
}