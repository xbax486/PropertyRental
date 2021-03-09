﻿using Microsoft.AspNetCore.Mvc;
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
    [Route("/api/owners")]
    public class OwnersController : Controller
    {
        private readonly PropertyRentalContext context;
        private readonly IMapper mapper;

        public OwnersController(PropertyRentalContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<OwnerResource>> GetOwners()
        {
            var owners = await context.Owners.ToListAsync();
            return mapper.Map<List<Owner>, List<OwnerResource>>(owners);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOwner(int id)
        {
            var owner = await context.Owners.SingleOrDefaultAsync(owner => owner.Id == id);
            if (owner == null)
            {
                return NotFound();
            }
            owner.Properties = await context.Properties.Where(property => property.OwnerId == owner.Id).ToListAsync();
            var ownerResource = mapper.Map<Owner, OwnerResource>(owner);
            return Ok(ownerResource);
        }
    }
}
