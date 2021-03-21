using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;

namespace PropertyRental.Core.Interfaces
{
    public interface IPropertyTypeRepository
    {
        Task<IEnumerable<PropertyType>> GetPropertyTypes();
        Task<PropertyType> GetPropertyType(int id);
    }
}