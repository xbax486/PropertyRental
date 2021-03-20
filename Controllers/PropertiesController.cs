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
using PropertyRental.Persistence.Interfaces;

namespace PropertyRental.Controllers
{
    [Route("/api/properties")]
    public class PropertiesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IPropertyRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public PropertiesController(IMapper mapper, IPropertyRepository repository, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IEnumerable<PropertyResource>> GetProperties(bool available = false)
        {
            var allProperties = await repository.GetProperties(available);
            return mapper.Map<List<Property>, List<PropertyResource>>(allProperties.ToList());
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
            var property = await repository.FindProperty(propertyResource);
            if (property != null)
            {
                ModelState.AddModelError("Message", "Property creation error. Sorry, this property already exists!");
                return BadRequest(ModelState);
            }
            property = mapper.Map<PropertyResource, Property>(propertyResource);
            property = await repository.PopulatePropertyWithRelatedFields(property, propertyResource);
            property.Available = true;
            repository.Add(property);
            await unitOfWork.CompleteAsync();
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
            var existingProperty = await repository.FindProperty(propertyResource);
            if (existingProperty != null)
            {
                ModelState.AddModelError("Message", "Property creation error. Sorry, this property already exists!");
                return BadRequest(ModelState);
            }
            mapper.Map<PropertyResource, Property>(propertyResource, property);
            property = await repository.PopulatePropertyWithRelatedFields(property, propertyResource);
            await unitOfWork.CompleteAsync();
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
            await unitOfWork.CompleteAsync();
            return Ok();
        }
    }
}
