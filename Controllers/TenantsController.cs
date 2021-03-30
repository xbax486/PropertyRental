using Microsoft.AspNetCore.Mvc;
using PropertyRental.Models;
using System.Threading.Tasks;
using AutoMapper;
using PropertyRental.Core;
using PropertyRental.Core.Interfaces;
using PropertyRental.Controllers.Resources;
using PropertyRental.Controllers.Resources.Query;
using PropertyRental.Models.Query;

namespace PropertyRental.Controllers
{
    [Route("/api/tenants")]
    public class TenantsController : Controller
    {
        private readonly IMapper mapper;
        private readonly ITenantRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public TenantsController(IMapper mapper, ITenantRepository repository, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<QueryResultResource<TenantResource>> GetTenants(TenantQueryResource tenantQueryResource = null)
        {
            var queryObject = mapper.Map<TenantQueryResource, TenantQuery>(tenantQueryResource);
            var queryResult = await repository.GetTenants(queryObject);
            return mapper.Map<QueryResult<Tenant>, QueryResultResource<TenantResource>>(queryResult);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTenant(int id)
        {
            var tenant = await repository.GetTenant(id);
            if (tenant == null)
            {
                return NotFound();
            }
            var tenantResource = mapper.Map<Tenant, TenantResource>(tenant);
            return Ok(tenantResource);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTenant([FromBody] TenantResource tenantResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var tenant = await repository.FindTenant(tenantResource);
            if (tenant != null)
            {
                ModelState.AddModelError("Message", "Tenant creation error. Sorry, this tenant already exists!");
                return BadRequest(ModelState);
            }
            tenant = mapper.Map<TenantResource, Tenant>(tenantResource);
            repository.Add(tenant);
            await unitOfWork.CompleteAsync();
            return Ok(tenant);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTenant(int id, [FromBody] TenantResource tenantResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var tenant = await repository.GetTenant(id);
            if (tenant == null)
            {
                return NotFound();
            }
            var existingTenant = await repository.FindTenant(tenantResource);
            if (existingTenant != null)
            {
                ModelState.AddModelError("Message", "Tenant update error. Sorry, this tenant already exists!");
                return BadRequest(ModelState);
            }
            mapper.Map<TenantResource, Tenant>(tenantResource, tenant);
            await unitOfWork.CompleteAsync();
            return Ok(tenant);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTenant(int id)
        {
            var tenant = await repository.GetTenant(id);
            if (tenant == null)
            {
                return NotFound();
            }
            repository.Remove(tenant);
            await unitOfWork.CompleteAsync();
            return Ok();
        }
    }
}