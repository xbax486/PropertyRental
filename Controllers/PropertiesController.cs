using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertyRental.Models;
using PropertyRental.Persistence;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
        private readonly IPropertyRepository repository;

        public PropertiesController(PropertyRentalContext context, IMapper mapper, IPropertyRepository repository)
        {
            this.context = context;
            this.mapper = mapper;
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<PropertyResource>> GetProperties(bool available = false)
        {
            var allProperties = await repository.GetProperties(available);
            return mapper.Map<List<Property>, List<PropertyResource>>(allProperties.ToList<Property>());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(int id)
        {
            var property = await repository.GetProperty(id);
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
            var property = await context.Properties.SingleOrDefaultAsync(record =>
                record.OwnerId == propertyResource.OwnerId &&
                record.Unit == propertyResource.Unit &&
                record.Street == propertyResource.Street &&
                record.SuburbId == propertyResource.SuburbId
            );
            if (property != null)
            {
                ModelState.AddModelError("Message", "Property creation error. Sorry, this property already exists!");
                return BadRequest(ModelState);
            }
            property = mapper.Map<PropertyResource, Property>(propertyResource);
            property.Owner = await context.Owners.SingleOrDefaultAsync(owner => owner.Id == propertyResource.OwnerId);
            property.Suburb = await context.Suburbs.SingleOrDefaultAsync(suburb => suburb.Id == propertyResource.SuburbId);
            property.PropertyType = await context.PropertyTypes.SingleOrDefaultAsync(propertyType => propertyType.Id == propertyResource.PropertyTypeId);
            property.Available = true;
            repository.Add(property);
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
            var property = await repository.GetProperty(id, includeRelated: false);
            if (property == null)
            {
                return NotFound();
            }
            var existingProperty = await context.Properties.SingleOrDefaultAsync(record =>
                record.OwnerId == propertyResource.OwnerId &&
                record.Unit == propertyResource.Unit &&
                record.Street == propertyResource.Street &&
                record.SuburbId == propertyResource.SuburbId
            );
            if (existingProperty != null)
            {
                ModelState.AddModelError("Message", "Property creation error. Sorry, this property already exists!");
                return BadRequest(ModelState);
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
            var property = await repository.GetProperty(id, includeRelated: false);
            if (property == null)
            {
                return NotFound();
            }
            repository.Remove(property);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
