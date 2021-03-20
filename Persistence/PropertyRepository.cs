using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using PropertyRental.Models;

namespace PropertyRental.Persistence
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly PropertyRentalContext context;

        public PropertyRepository(PropertyRentalContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Property>> GetProperties(bool available = false)
        {
            if (!available)
            {
                return await context.Properties
                    .Include(property => property.Owner)
                    .Include(property => property.Suburb)
                        .ThenInclude(suburb => suburb.State)
                    .Include(property => property.PropertyType)
                    .ToListAsync();
            }
            else
            {
                return await context.Properties
                    .Where(property => property.Available == true)
                    .Include(property => property.Owner)
                    .Include(property => property.Suburb)
                        .ThenInclude(suburb => suburb.State)
                    .Include(property => property.PropertyType)
                    .ToListAsync();
            }
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