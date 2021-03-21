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

        public async Task<IEnumerable<Tenant>> GetTenants(bool available = false)
        {
            if (!available)
            {
                return await context.Tenants.ToListAsync();
            }
            else
            {
                var unavailableTenants = new List<int>();
                var rentals = await context.Rentals
                    .Include(rental => rental.Tenant)
                    .ToListAsync();
                foreach (var rental in rentals)
                {
                    unavailableTenants.Add(rental.Tenant.Id);
                }
                var tenants = await context.Tenants.ToListAsync();
                return tenants.Where(tenant => !unavailableTenants.Any(unavailableTenantId => unavailableTenantId == tenant.Id));
            }
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