using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Core.Interfaces
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Property>> GetProperties(PropertyQuery queryObject = null);
        Task<Property> GetProperty(int id, bool includeRelated = true);
        Task<Property> FindProperty(PropertyResource propertyResource);
        void Add(Property property);
        void Remove(Property property);
    }
}