using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;
using PropertyRental.Controllers.Resources;
using PropertyRental.Persistence.Interfaces;

namespace PropertyRental.Persistence.Repositories
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

        public async Task<Property> PopulatePropertyWithRelatedFields(Property property, PropertyResource propertyResource)
        {
            property.Owner = await context.Owners.SingleOrDefaultAsync(owner => owner.Id == propertyResource.OwnerId);
            property.Suburb = await context.Suburbs.SingleOrDefaultAsync(suburb => suburb.Id == propertyResource.SuburbId);
            property.PropertyType = await context.PropertyTypes.SingleOrDefaultAsync(propertyType => propertyType.Id == propertyResource.PropertyTypeId);
            return property;
        }

        public async Task<Property> FindProperty(PropertyResource propertyResource)
        {
            return await context.Properties.SingleOrDefaultAsync(record =>
                record.OwnerId == propertyResource.OwnerId &&
                record.Unit == propertyResource.Unit &&
                record.Street == propertyResource.Street &&
                record.SuburbId == propertyResource.SuburbId
            );
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