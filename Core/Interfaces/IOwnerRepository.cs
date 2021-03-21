using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Core.Interfaces
{
    public interface IOwnerRepository
    {
        Task<IEnumerable<Owner>> GetOwners();
        Task<Owner> GetOwner(int id);
        Task<Owner> FindOwner(OwnerResource ownerResource);
        void Add(Owner owner);
        void Remove(Owner owner);
    }
}