using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;
using PropertyRental.Persistence.Interfaces;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Persistence.Repositories
{
    public class SuburbRepository : ISuburbRepository
    {
        private readonly PropertyRentalContext context;

        public SuburbRepository(PropertyRentalContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Suburb>> GetSuburbs()
        {
            return await context.Suburbs.Include(suburb => suburb.State).ToListAsync();
        }

        public async Task<Suburb> GetSuburb(int id, bool includeRelated = true)
        {
            if (!includeRelated)
            {
                return await context.Suburbs.SingleOrDefaultAsync(suburb => suburb.Id == id);
            }
            return await context.Suburbs.Include(suburb => suburb.State).SingleOrDefaultAsync(suburb => suburb.Id == id);
        }

        public async Task<Suburb> FindSuburb(SuburbResource suburbResource)
        {
            return await context.Suburbs.SingleOrDefaultAsync(record =>
                record.Postcode == suburbResource.Postcode &&
                record.Name == suburbResource.Name &&
                record.StateId == suburbResource.StateId);
        }

        public async Task<Suburb> PopulateSuburbWithRelatedFields(Suburb suburb, SuburbResource suburbResource)
        {
            suburb.State = await context.States.SingleOrDefaultAsync(state => state.Id == suburbResource.StateId);
            return suburb;
        }

        public void Add(Suburb suburb)
        {
            context.Suburbs.Add(suburb);
        }

        public void Remove(Suburb suburb)
        {
            context.Suburbs.Remove(suburb);
        }
    }
}