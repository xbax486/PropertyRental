using System.Threading.Tasks;
using PropertyRental.Models;
using PropertyRental.Models.Query;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Core.Interfaces
{
    public interface ITenantRepository
    {
        Task<QueryResult<Tenant>> GetTenants(TenantQuery queryObject);
        Task<Tenant> GetTenant(int id);
        Task<Tenant> FindTenant(TenantResource tenantResource);
        void Add(Tenant tenant);
        void Remove(Tenant tenant);
    }
}