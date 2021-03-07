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
    public class PropertiesController : Controller
    {
        private readonly PropertyRentalContext context;
        private readonly IMapper mapper;

        public PropertiesController(PropertyRentalContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("/api/properties")]
        public async Task<IEnumerable<PropertyResource>> GetProperties()
        {
            var properties = await context.Properties
                .Include(property => property.Suburb)
                    .ThenInclude(suburb => suburb.State)
                .Include(property => property.PropertyType)
                .ToListAsync();
            return mapper.Map<List<Property>, List<PropertyResource>>(properties);
        }
    }
}
