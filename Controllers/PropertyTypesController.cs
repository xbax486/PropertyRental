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
using PropertyRental.Persistence.Interfaces;

namespace PropertyRental.Controllers
{
    public class PropertyTypesController
    {
        private readonly IMapper mapper;
        private readonly IPropertyTypeRepository repository;

        public PropertyTypesController(IMapper mapper, IPropertyTypeRepository repository)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet("/api/propertytypes")]
        public async Task<IEnumerable<PropertyTypeResource>> GetPropertyTypes()
        {
            var propertyTypes = await repository.GetPropertyTypes();
            return mapper.Map<List<PropertyType>, List<PropertyTypeResource>>(propertyTypes.ToList());
        }
    }
}