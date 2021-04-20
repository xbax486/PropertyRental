using Microsoft.AspNetCore.Mvc;
using PropertyRental.Models;
using System.Threading.Tasks;
using AutoMapper;
using PropertyRental.Core;
using PropertyRental.Core.Interfaces;
using PropertyRental.Controllers.Resources;
using PropertyRental.Controllers.Resources.Query;
using PropertyRental.Models.Query;
using PropertyRental.Core.Auth;
using Microsoft.AspNetCore.Authorization;

namespace PropertyRental.Controllers
{
    [Route("/api/owners")]
    public class OwnersController : Controller
    {
        private readonly IMapper mapper;
        private readonly IOwnerRepository ownerRepository;
        private readonly IPropertyRepository propertyRepository;
        private readonly IUnitOfWork unitOfWork;

        public OwnersController(IMapper mapper, IOwnerRepository ownerRepository, IPropertyRepository propertyRepository, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.ownerRepository = ownerRepository;
            this.propertyRepository = propertyRepository;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Authorize(Policy = "NormalUser")]
        public async Task<QueryResultResource<OwnerResource>> GetOwners(OwnerQueryResource ownerQueryResource = null)
        {
            var queryObject = mapper.Map<OwnerQueryResource, OwnerQuery>(ownerQueryResource);
            var queryResult = await ownerRepository.GetOwners(queryObject);
            return mapper.Map<QueryResult<Owner>, QueryResultResource<OwnerResource>>(queryResult);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOwner(int id)
        {
            var owner = await ownerRepository.GetOwner(id);
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
            var owner = await ownerRepository.FindOwner(ownerResource);
            if (owner != null)
            {
                ModelState.AddModelError("Message", "Owner creation error. Sorry, this owner already exists!");
                return BadRequest(ModelState);
            }
            owner = mapper.Map<OwnerResource, Owner>(ownerResource);
            ownerRepository.Add(owner);
            await unitOfWork.CompleteAsync();
            return Ok(owner);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "Administrator")]
        public async Task<IActionResult> UpdateOwner(int id, [FromBody] OwnerResource ownerResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var owner = await ownerRepository.GetOwner(id);
            if (owner == null)
            {
                return NotFound();
            }
            var existingOwner = await ownerRepository.FindOwner(ownerResource);
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
            var owner = await ownerRepository.GetOwner(id);
            if (owner == null)
            {
                return NotFound();
            }
            var properties = await propertyRepository.GetProperties(null);
            foreach (var property in properties.Items)
            {
                if (property.Owner.Id == id)
                {
                    ModelState.AddModelError("Message", "Owner update error. Sorry, this owner still has at least one property!");
                    return BadRequest(ModelState);
                }
            }
            ownerRepository.Remove(owner);
            await unitOfWork.CompleteAsync();
            return Ok();
        }
    }
}
