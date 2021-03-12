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
    [Route("/api/properties")]
    public class PropertiesController : Controller
    {
        private readonly PropertyRentalContext context;
        private readonly IMapper mapper;

        public PropertiesController(PropertyRentalContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<PropertyResource>> GetProperties()
        {
            var properties = await context.Properties
                .Include(property => property.Owner)
                .Include(property => property.Suburb)
                    .ThenInclude(suburb => suburb.State)
                .Include(property => property.PropertyType)
                .ToListAsync();
            return mapper.Map<List<Property>, List<PropertyResource>>(properties);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(int id)
        {
            var property = await context.Properties
                .Include(property => property.Owner)
                .Include(property => property.Suburb)
                    .ThenInclude(suburb => suburb.State)
                .Include(property => property.PropertyType)
                .SingleOrDefaultAsync(property => property.Id == id);
            if (property == null)
            {
                return NotFound();
            }
            var propertyResource = mapper.Map<Property, PropertyResource>(property);
            return Ok(propertyResource);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProperty([FromBody] PropertyResource propertyResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var property = mapper.Map<PropertyResource, Property>(propertyResource);
            property.Owner = await context.Owners.SingleOrDefaultAsync(owner => owner.Id == propertyResource.OwnerId);
            property.Suburb = await context.Suburbs.SingleOrDefaultAsync(suburb => suburb.Id == propertyResource.SuburbId);
            property.PropertyType = await context.PropertyTypes.SingleOrDefaultAsync(propertyType => propertyType.Id == propertyResource.PropertyTypeId);
            context.Properties.Add(property);
            await context.SaveChangesAsync();
            return Ok(property);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProperty(int id, [FromBody] PropertyResource propertyResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var property = await context.Properties.FindAsync(id);
            if (property == null)
            {
                return NotFound();
            }
            mapper.Map<PropertyResource, Property>(propertyResource, property);
            property.Owner = await context.Owners.SingleOrDefaultAsync(owner => owner.Id == propertyResource.OwnerId);
            property.Suburb = await context.Suburbs.SingleOrDefaultAsync(suburb => suburb.Id == propertyResource.SuburbId);
            property.PropertyType = await context.PropertyTypes.SingleOrDefaultAsync(propertyType => propertyType.Id == propertyResource.PropertyTypeId);
            await context.SaveChangesAsync();
            return Ok(property);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            var property = await context.Properties.FindAsync(id);
            if (property == null)
            {
                return NotFound();
            }
            context.Properties.Remove(property);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
