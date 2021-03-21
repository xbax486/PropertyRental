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
    [Route("/api/owners")]
    public class OwnersController : Controller
    {
        private readonly IMapper mapper;
        private readonly IOwnerRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public OwnersController(IMapper mapper, IOwnerRepository repository, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IEnumerable<OwnerResource>> GetOwners()
        {
            var owners = await repository.GetOwners();
            return mapper.Map<List<Owner>, List<OwnerResource>>(owners.ToList());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOwner(int id)
        {
            var owner = await repository.GetOwner(id);
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
            var owner = await repository.FindOwner(ownerResource);
            if (owner != null)
            {
                ModelState.AddModelError("Message", "Owner creation error. Sorry, this owner already exists!");
                return BadRequest(ModelState);
            }
            owner = mapper.Map<OwnerResource, Owner>(ownerResource);
            repository.Add(owner);
            await unitOfWork.CompleteAsync();
            return Ok(owner);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOwner(int id, [FromBody] OwnerResource ownerResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var owner = await repository.GetOwner(id);
            if (owner == null)
            {
                return NotFound();
            }
            var existingOwner = await repository.FindOwner(ownerResource);
            if (existingOwner != null)
            {
                ModelState.AddModelError("Message", "Owner update error. Sorry, this owner already exists!");
                return BadRequest(ModelState);
            }
            mapper.Map<OwnerResource, Owner>(ownerResource, owner);
            await unitOfWork.CompleteAsync();
            return Ok(owner);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOwner(int id)
        {
            var owner = await repository.GetOwner(id);
            if (owner == null)
            {
                return NotFound();
            }
            repository.Remove(owner);
            await unitOfWork.CompleteAsync();
            return Ok();
        }
    }
}
