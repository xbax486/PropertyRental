using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;

namespace PropertyRental.Persistence.Interfaces
{
    public interface IPropertyTypeRepository
    {
        Task<IEnumerable<PropertyType>> GetPropertyTypes();
    }
}