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
    public class PropertyTypesController
    {
        private readonly PropertyRentalContext context;
        private readonly IMapper mapper;

        public PropertyTypesController(PropertyRentalContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("/api/propertytypes")]
        public async Task<IEnumerable<PropertyTypeResource>> GetPropertyTypes()
        {
            var propertyTypes = await context.PropertyTypes.ToListAsync();
            return mapper.Map<List<PropertyType>, List<PropertyTypeResource>>(propertyTypes);
        }
    }
}