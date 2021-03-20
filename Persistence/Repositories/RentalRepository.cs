using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;
using PropertyRental.Persistence.Interfaces;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Persistence.Repositories
{
    public class RentalRepository : IRentalRepository
    {
        private readonly PropertyRentalContext context;

        public RentalRepository(PropertyRentalContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Rental>> GetRentals()
        {
            var rentals = await context.Rentals
                .Include(rental => rental.Tenant)
                .Include(rental => rental.Property)
                    .ThenInclude(property => property.Suburb)
                        .ThenInclude(suburb => suburb.State)
                .ToListAsync();
            foreach (var rental in rentals)
            {
                rental.Property.Owner = await context.Owners.SingleOrDefaultAsync(owner => owner.Id == rental.Property.OwnerId);
            }
            return rentals;
        }

        public async Task<Rental> GetRental(int id, bool includeRelated = true)
        {
            if (!includeRelated)
            {
                return await context.Rentals.FindAsync(id);
            }
            var rental = await context.Rentals
                .Include(rental => rental.Tenant)
                .Include(rental => rental.Property)
                    .ThenInclude(property => property.Suburb)
                        .ThenInclude(suburb => suburb.State)
                .SingleOrDefaultAsync(rental => rental.Id == id);
            rental.Property.Owner = await context.Owners.SingleOrDefaultAsync(owner => owner.Id == rental.Property.OwnerId);
            return rental;
        }

        public async Task<Rental> FindRental(RentalResource rentalResource)
        {
            return await context.Rentals.SingleOrDefaultAsync(record =>
                record.PropertyId == rentalResource.PropertyId ||
                record.TenantId == rentalResource.TenantId);
        }

        public void Add(Rental rental)
        {
            context.Rentals.Add(rental);
        }

        public void Remove(Rental rental)
        {
            context.Rentals.Remove(rental);
        }
    }
}