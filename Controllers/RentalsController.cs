using Microsoft.AspNetCore.Mvc;
using PropertyRental.Models;
using System.Threading.Tasks;
using AutoMapper;
using PropertyRental.Core;
using PropertyRental.Core.Interfaces;
using PropertyRental.Controllers.Resources;
using PropertyRental.Controllers.Resources.Query;
using PropertyRental.Models.Query;

namespace RentalRental.Controllers
{
    [Route("/api/rentals")]
    public class RentalsController : Controller
    {
        private readonly IMapper mapper;
        private readonly IRentalRepository rentalRepository;
        private readonly IPropertyRepository propertyRepository;
        private readonly ITenantRepository tenantRepository;
        private readonly IUnitOfWork unitOfWork;

        public RentalsController(
            IMapper mapper,
            IRentalRepository rentalRepository,
            IPropertyRepository propertyRepository,
            ITenantRepository tenantRepository,
            IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.rentalRepository = rentalRepository;
            this.propertyRepository = propertyRepository;
            this.tenantRepository = tenantRepository;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<QueryResultResource<RentalResource>> GetRentals(RentalQueryResource rentalQueryResource = null)
        {
            var queryObject = mapper.Map<RentalQueryResource, RentalQuery>(rentalQueryResource);
            var queryResult = await rentalRepository.GetRentals(queryObject);
            return mapper.Map<QueryResult<Rental>, QueryResultResource<RentalResource>>(queryResult);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRental(int id)
        {
            var rental = await rentalRepository.GetRental(id);
            if (rental == null)
            {
                return NotFound();
            }
            var rentalResource = mapper.Map<Rental, RentalResource>(rental);
            return Ok(rentalResource);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRental([FromBody] RentalResource rentalResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var rental = await rentalRepository.FindRental(rentalResource);
            if (rental != null)
            {
                ModelState.AddModelError("Message", "Rental creation error. Sorry, this rental record already exists!");
                return BadRequest(ModelState);
            }
            var property = await propertyRepository.GetProperty(rentalResource.PropertyId);
            property.Available = false;
            if (rentalResource.StartDate >= rentalResource.EndDate)
            {
                ModelState.AddModelError("Message", "Rental creation error. Sorry, start date must be eailier than end date!");
                return BadRequest(ModelState);
            }
            rental = mapper.Map<RentalResource, Rental>(rentalResource);
            rental.Property = await propertyRepository.GetProperty(rentalResource.PropertyId);
            rental.Tenant = await tenantRepository.GetTenant(rentalResource.TenantId);
            rentalRepository.Add(rental);
            await unitOfWork.CompleteAsync();
            return Ok(rental);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRental(int id, [FromBody] RentalResource rentalResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var rental = await rentalRepository.GetRental(id);
            if (rental == null)
            {
                return NotFound();
            }
            var existingRental = await rentalRepository.FindRental(rentalResource);
            if (existingRental != null)
            {
                ModelState.AddModelError("Message", "Rental update error. Sorry, this rental record already exists!");
                return BadRequest(ModelState);
            }
            if (rentalResource.StartDate >= rentalResource.EndDate)
            {
                ModelState.AddModelError("Message", "Rental creation error. Sorry, start date must be eailier than end date!");
                return BadRequest(ModelState);
            }
            mapper.Map<RentalResource, Rental>(rentalResource, rental);
            rental.Property = await propertyRepository.GetProperty(rentalResource.PropertyId);
            rental.Tenant = await tenantRepository.GetTenant(rentalResource.TenantId);
            await unitOfWork.CompleteAsync();
            return Ok(rental);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRental(int id)
        {
            var rental = await rentalRepository.GetRental(id, includeRelated: false);
            if (rental == null)
            {
                return NotFound();
            }
            rentalRepository.Remove(rental);
            var property = await propertyRepository.GetProperty(rental.PropertyId, includeRelated: false);
            if (property == null)
            {
                ModelState.AddModelError("Message", "Rental deletion error. Sorry, this property does not exist!");
                return BadRequest(ModelState);
            }
            property.Available = true;
            await unitOfWork.CompleteAsync();
            return Ok();
        }
    }
}