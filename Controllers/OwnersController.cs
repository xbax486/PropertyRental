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
    [Route("/api/owners")]
    public class OwnersController : Controller
    {
        private readonly PropertyRentalContext context;
        private readonly IMapper mapper;

        public OwnersController(PropertyRentalContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<OwnerResource>> GetOwners()
        {
            var owners = await context.Owners.ToListAsync();
            return mapper.Map<List<Owner>, List<OwnerResource>>(owners);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOwner(int id)
        {
            var owner = await context.Owners.SingleOrDefaultAsync(owner => owner.Id == id);
            if (owner == null)
            {
                return NotFound();
            }
            var ownerResource = mapper.Map<Owner, OwnerResource>(owner);
            return Ok(ownerResource);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOwner([FromBody] OwnerResource ownerResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var owner = mapper.Map<OwnerResource, Owner>(ownerResource);
            context.Owners.Add(owner);
            await context.SaveChangesAsync();
            return Ok(owner);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOwner(int id, [FromBody] OwnerResource ownerResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var owner = await context.Owners.FindAsync(id);
            if (owner == null)
            {
                return NotFound();
            }
            mapper.Map<OwnerResource, Owner>(ownerResource, owner);
            await context.SaveChangesAsync();
            return Ok(owner);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOwner(int id)
        {
            var owner = await context.Owners.FindAsync(id);
            if (owner == null)
            {
                return NotFound();
            }
            context.Owners.Remove(owner);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
