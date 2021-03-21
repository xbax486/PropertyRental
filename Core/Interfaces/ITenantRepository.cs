using System.Threading.Tasks;
using System.Collections.Generic;
using PropertyRental.Models;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Core.Interfaces
{
    public interface ITenantRepository
    {
        Task<IEnumerable<Tenant>> GetTenants(bool available = false);
        Task<Tenant> GetTenant(int id);
        Task<Tenant> FindTenant(TenantResource tenantResource);
        void Add(Tenant tenant);
        void Remove(Tenant tenant);
    }
}