using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertyRental.Models;
using PropertyRental.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Controllers
{
    [Route("/api/tenants")]
    public class TenantsController : Controller
    {
        private readonly PropertyRentalContext context;
        private readonly IMapper mapper;

        public TenantsController(PropertyRentalContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<TenantResource>> GetTenants(bool available = false)
        {
            if (!available)
            {
                var tenants = await context.Tenants.ToListAsync();
                return mapper.Map<List<Tenant>, List<TenantResource>>(tenants);
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
                var availableTenants = tenants.Where(tenant => !unavailableTenants.Any(unavailableTenantId => unavailableTenantId == tenant.Id)).ToList();
                return mapper.Map<List<Tenant>, List<TenantResource>>(availableTenants);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTenant(int id)
        {
            var tenant = await context.Tenants.SingleOrDefaultAsync(tenant => tenant.Id == id);
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
            var tenant = await context.Tenants.SingleOrDefaultAsync(record =>
                record.Name == tenantResource.Name &&
                record.Email == tenantResource.Email &&
                record.Mobile == tenantResource.Mobile);
            if (tenant != null)
            {
                ModelState.AddModelError("Message", "Tenant creation error. Sorry, this tenant already exists!");
                return BadRequest(ModelState);
            }
            tenant = mapper.Map<TenantResource, Tenant>(tenantResource);
            context.Tenants.Add(tenant);
            await context.SaveChangesAsync();
            return Ok(tenant);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTenant(int id, [FromBody] TenantResource tenantResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var tenant = await context.Tenants.FindAsync(id);
            if (tenant == null)
            {
                return NotFound();
            }
            var existingTenant = await context.Tenants.SingleOrDefaultAsync(record =>
                record.Name == tenantResource.Name &&
                record.Email == tenantResource.Email &&
                record.Mobile == tenantResource.Mobile);
            if (existingTenant != null)
            {
                ModelState.AddModelError("Message", "Tenant update error. Sorry, this tenant already exists!");
                return BadRequest(ModelState);
            }
            mapper.Map<TenantResource, Tenant>(tenantResource, tenant);
            await context.SaveChangesAsync();
            return Ok(tenant);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTenant(int id)
        {
            var tenant = await context.Tenants.FindAsync(id);
            if (tenant == null)
            {
                return NotFound();
            }
            context.Tenants.Remove(tenant);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}