using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;
using PropertyRental.Core.Interfaces;

namespace PropertyRental.Persistence.Repositories
{
    public class PropertyTypeRepository : IPropertyTypeRepository
    {
        private readonly PropertyRentalContext context;

        public PropertyTypeRepository(PropertyRentalContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<PropertyType>> GetPropertyTypes()
        {
            return await context.PropertyTypes.ToListAsync();
        }

        public async Task<PropertyType> GetPropertyType(int id)
        {
            return await context.PropertyTypes.FindAsync(id);
        }
    }
}