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
using PropertyRental.Core.Interfaces;
using PropertyRental.Core;

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
        public async Task<IEnumerable<TenantResource>> GetTenants(bool available = false)
        {
            var availableTenants = await repository.GetTenants(available);
            return mapper.Map<List<Tenant>, List<TenantResource>>(availableTenants.ToList());
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