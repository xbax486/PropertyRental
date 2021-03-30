using System.Threading.Tasks;
using PropertyRental.Models;
using PropertyRental.Models.Query;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Core.Interfaces
{
    public interface ISuburbRepository
    {
        Task<QueryResult<Suburb>> GetSuburbs(SuburbQuery queryObject);
        Task<Suburb> GetSuburb(int id, bool includeRelated = true);
        Task<Suburb> FindSuburb(SuburbResource suburbResource);
        Task<Suburb> PopulateSuburbWithRelatedFields(Suburb suburb, SuburbResource suburbResource);
        void Add(Suburb owner);
        void Remove(Suburb owner);
    }
}