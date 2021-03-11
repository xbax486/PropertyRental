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

namespace RentalRental.Controllers
{
    [Route("/api/rentals")]
    public class RentalsController : Controller
    {
        private readonly PropertyRentalContext context;
        private readonly IMapper mapper;

        public RentalsController(PropertyRentalContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<RentalResource>> GetRentals()
        {
            var rentals = await context.Rentals
                .Include(rental => rental.Owner)
                .Include(rental => rental.Tenant)
                .Include(rental => rental.Property)
                .ToListAsync();
            return mapper.Map<List<Rental>, List<RentalResource>>(rentals);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRental(int id)
        {
            var rental = await context.Rentals
                .Include(rental => rental.Owner)
                .Include(rental => rental.Tenant)
                .Include(rental => rental.Property)
                .SingleOrDefaultAsync(rental => rental.Id == id);
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
            var rental = await context.Rentals.SingleOrDefaultAsync(record =>
                record.PropertyId == rentalResource.PropertyId ||
                record.TenantId == rentalResource.TenantId);
            if (rental != null)
            {
                ModelState.AddModelError("Message", "Rental creation error. Sorry, this rental record already exists!");
                return BadRequest(ModelState);
            }
            rental = mapper.Map<RentalResource, Rental>(rentalResource);
            rental.Owner = await context.Owners.SingleOrDefaultAsync(owner => owner.Id == rentalResource.OwnerId);
            rental.Property = await context.Properties.SingleOrDefaultAsync(property => property.Id == rentalResource.PropertyId);
            context.Rentals.Add(rental);
            await context.SaveChangesAsync();
            return Ok(rental);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRental(int id, [FromBody] RentalResource rentalResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var rental = await context.Rentals.FindAsync(id);
            if (rental == null)
            {
                return NotFound();
            }
            var existingRental = await context.Rentals.SingleOrDefaultAsync(record =>
                record.PropertyId == rentalResource.PropertyId &&
                record.TenantId == rentalResource.TenantId);
            if (existingRental != null)
            {
                ModelState.AddModelError("Message", "Rental update error. Sorry, this rental already exists!");
                return BadRequest(ModelState);
            }
            mapper.Map<RentalResource, Rental>(rentalResource, rental);
            await context.SaveChangesAsync();
            return Ok(rental);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRental(int id)
        {
            var rental = await context.Rentals.FindAsync(id);
            if (rental == null)
            {
                return NotFound();
            }
            context.Rentals.Remove(rental);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}