using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using PropertyRental.Models;
using PropertyRental.Core.Interfaces;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Persistence.Repositories
{
    public class TenantRepository : ITenantRepository
    {
        private readonly PropertyRentalContext context;

        public TenantRepository(PropertyRentalContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Tenant>> GetTenants(TenantFilter filter = null)
        {
            var query = context.Tenants.AsQueryable();
            if (filter.Available.HasValue && filter.Available == true)
            {
                var unavailableTenants = new List<int>();
                var rentals = await context.Rentals.Include(rental => rental.Tenant).ToListAsync();
                foreach (var rental in rentals)
                {
                    unavailableTenants.Add(rental.Tenant.Id);
                }
                query = query.Where(tenant => !unavailableTenants.Any(unavailableTenantId => unavailableTenantId == tenant.Id));
            }
            return await query.ToListAsync();
        }
        public async Task<Tenant> GetTenant(int id)
        {
            return await context.Tenants.FindAsync(id);
        }

        public async Task<Tenant> FindTenant(TenantResource tenantResource)
        {
            return await context.Tenants.SingleOrDefaultAsync(record =>
                record.Name == tenantResource.Name &&
                record.Email == tenantResource.Email &&
                record.Mobile == tenantResource.Mobile);
        }

        public void Add(Tenant tenant)
        {
            context.Tenants.Add(tenant);
        }

        public void Remove(Tenant tenant)
        {
            context.Tenants.Remove(tenant);
        }
    }
}