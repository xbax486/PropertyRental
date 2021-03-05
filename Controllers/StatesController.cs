using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertyRental.Models;
using PropertyRental.Persistence;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using PropertyRental.Controllers.Resources;

namespace PropertyRental.Controllers
{
    [Route("/api/states")]
    public class StatesController : Controller
    {
        private readonly PropertyRentalContext context;
        private readonly IMapper mapper;

        public StatesController(PropertyRentalContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<StateResource>> GetStates()
        {
            var states = await this.context.States.ToListAsync();
            return mapper.Map<List<State>, List<StateResource>>(states);
        }
    }
}