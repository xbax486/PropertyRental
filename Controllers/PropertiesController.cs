using Microsoft.AspNetCore.Mvc;
using PropertyRental.Models;
using System.Threading.Tasks;
using AutoMapper;
using PropertyRental.Core;
using PropertyRental.Core.Interfaces;
using PropertyRental.Controllers.Resources;
using PropertyRental.Controllers.Resources.Query;
using PropertyRental.Models.Query;

namespace PropertyRental.Controllers
{
    [Route("/api/properties")]
    public class PropertiesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IPropertyRepository propertyRepository;
        private readonly IOwnerRepository ownerRepository;
        private readonly ISuburbRepository suburbRepository;
        private readonly IPropertyTypeRepository propertyTypeRepository;
        private readonly IUnitOfWork unitOfWork;

        public PropertiesController(IMapper mapper, IPropertyRepository propertyRepository, IOwnerRepository ownerRepository,
            ISuburbRepository suburbRepository, IPropertyTypeRepository propertyTypeRepository, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.propertyRepository = propertyRepository;
            this.ownerRepository = ownerRepository;
            this.suburbRepository = suburbRepository;
            this.propertyTypeRepository = propertyTypeRepository;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<QueryResultResource<PropertyResource>> GetProperties(PropertyQueryResource propertyQueryResource = null)
        {
            var queryObject = mapper.Map<PropertyQueryResource, PropertyQuery>(propertyQueryResource);
            var queryResult = await propertyRepository.GetProperties(queryObject);
            return mapper.Map<QueryResult<Property>, QueryResultResource<PropertyResource>>(queryResult);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(int id)
        {
            var property = await propertyRepository.GetProperty(id);
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
            var property = await propertyRepository.FindProperty(propertyResource);
            if (property != null)
            {
                ModelState.AddModelError("Message", "Property creation error. Sorry, this property already exists!");
                return BadRequest(ModelState);
            }
            property = mapper.Map<PropertyResource, Property>(propertyResource);
            property = await PopulateRelatedFields(property, propertyResource);
            property.Available = true;
            propertyRepository.Add(property);
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
            var property = await propertyRepository.GetProperty(id, includeRelated: false);
            if (property == null)
            {
                return NotFound();
            }
            var existingProperty = await propertyRepository.FindProperty(propertyResource);
            if (existingProperty != null)
            {
                ModelState.AddModelError("Message", "Property update error. Sorry, this property already exists!");
                return BadRequest(ModelState);
            }
            mapper.Map<PropertyResource, Property>(propertyResource, property);
            property = await PopulateRelatedFields(property, propertyResource);
            await unitOfWork.CompleteAsync();
            return Ok(property);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            var property = await propertyRepository.GetProperty(id, includeRelated: false);
            if (property == null)
            {
                return NotFound();
            }
            propertyRepository.Remove(property);
            await unitOfWork.CompleteAsync();
            return Ok();
        }

        private async Task<Property> PopulateRelatedFields(Property property, PropertyResource propertyResource)
        {
            property.Owner = await ownerRepository.GetOwner((int)propertyResource.OwnerId);
            property.Suburb = await suburbRepository.GetSuburb(propertyResource.SuburbId);
            property.PropertyType = await propertyTypeRepository.GetPropertyType(propertyResource.PropertyTypeId);
            return property;
        }
    }
}
