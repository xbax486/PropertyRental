using System.Threading.Tasks;
using PropertyRental.Models;
using PropertyRental.Models.Query;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Core.Interfaces
{
    public interface IRentalRepository
    {
        Task<QueryResult<Rental>> GetRentals(RentalQuery queryObject);
        Task<Rental> GetRental(int id, bool includeRelated = true);
        Task<Rental> FindRental(RentalResource rentalResource);
        void Add(Rental rental);
        void Remove(Rental rental);
    }
}