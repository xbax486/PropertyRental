using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;
using PropertyRental.Persistence.Interfaces;

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
    }
}