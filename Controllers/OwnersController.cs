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
    public class OwnersController : Controller
    {
        private readonly PropertyRentalContext context;
        private readonly IMapper mapper;

        public OwnersController(PropertyRentalContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        // [HttpGet("/api/owners")]
        // public async Task<IEnumerable<OwnerResource>> GetOwners()
        // {
        //     var owners = await context.Owners.ToListAsync();
        //     return mapper.Map<List<Owner>, List<OwnerResource>>(owners);
        // }
    }
}
