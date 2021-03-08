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
                .Include(property => property.Suburb)
                    .ThenInclude(suburb => suburb.State)
                .Include(property => property.PropertyType)
                .ToListAsync();
            // foreach(var property in properties) 
            // {
            //     property.OwnerId
            // }
            return mapper.Map<List<Property>, List<PropertyResource>>(properties);
        }

        // [HttpGet("{id}")]
        // public async Task<IActionResult> GetProperty(int id)
        // {
        //     var property = await context.Properties.FindAsync(id);
        //     if (property == null)
        //     {
        //         return NotFound();
        //     }
        //     var propertyResource = mapper.Map<Property, PropertyResource>(property);
        //     var suburb = await context.Suburbs.SingleOrDefaultAsync(suburb => suburb.Id == propertyResource.Suburb.Id);
        //     var suburb = await context.Suburbs.SingleOrDefaultAsync(suburb => suburb.Id == propertyResource.Suburb.Id);
        //     var suburb = await context.Suburbs.SingleOrDefaultAsync(suburb => suburb.Id == propertyResource.Suburb.Id);
        // }
    }
}
