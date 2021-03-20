using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Persistence.Interfaces
{
    public interface ISuburbRepository
    {
        Task<IEnumerable<Suburb>> GetSuburbs();
        Task<Suburb> GetSuburb(int id, bool includeRelated = true);
        Task<Suburb> FindSuburb(SuburbResource suburbResource);
        Task<Suburb> PopulateSuburbWithRelatedFields(Suburb suburb, SuburbResource suburbResource);
        void Add(Suburb owner);
        void Remove(Suburb owner);
    }
}