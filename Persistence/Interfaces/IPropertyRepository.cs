using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Persistence.Interfaces
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Property>> GetProperties(bool available = false);
        Task<Property> GetProperty(int id, bool includeRelated = true);
        Task<Property> FindProperty(PropertyResource propertyResource);
        void Add(Property property);
        void Remove(Property property);
    }
}