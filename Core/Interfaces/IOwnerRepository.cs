using System.Threading.Tasks;
using PropertyRental.Models;
using PropertyRental.Models.Query;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Core.Interfaces
{
    public interface IOwnerRepository
    {
        Task<QueryResult<Owner>> GetOwners(OwnerQuery queryObject);
        Task<Owner> GetOwner(int id);
        Task<Owner> FindOwner(OwnerResource ownerResource);
        void Add(Owner owner);
        void Remove(Owner owner);
    }
}