using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;

namespace PropertyRental.Persistence
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Property>> GetProperties(bool available = false);
        Task<Property> GetProperty(int id, bool includeRelated = true);
        void Add(Property property);
        void Remove(Property property);
    }
}