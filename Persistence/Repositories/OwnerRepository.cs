using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;
using PropertyRental.Persistence.Interfaces;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Persistence.Repositories
{
    public class OwnerRepository : IOwnerRepository
    {
        private readonly PropertyRentalContext context;

        public OwnerRepository(PropertyRentalContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Owner>> GetOwners()
        {
            return await context.Owners.ToListAsync();
        }

        public async Task<Owner> GetOwner(int id)
        {
            return await context.Owners.FindAsync(id);
        }

        public async Task<Owner> FindOwner(OwnerResource ownerResource)
        {
            return await context.Owners.SingleOrDefaultAsync(record =>
                record.Name == ownerResource.Name &&
                record.Email == ownerResource.Email &&
                record.Mobile == ownerResource.Mobile);
        }

        public void Add(Owner owner)
        {
            context.Owners.Add(owner);
        }

        public void Remove(Owner owner)
        {
            context.Owners.Remove(owner);
        }
    }
}