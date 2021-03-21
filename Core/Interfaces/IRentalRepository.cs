using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Core.Interfaces
{
    public interface IRentalRepository
    {
        Task<IEnumerable<Rental>> GetRentals();
        Task<Rental> GetRental(int id, bool includeRelated = true);
        Task<Rental> FindRental(RentalResource rentalResource);
        void Add(Rental rental);
        void Remove(Rental rental);
    }
}