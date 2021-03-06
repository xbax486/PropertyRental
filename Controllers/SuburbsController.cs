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
    [Route("/api/suburbs")]
    public class SuburbsController : Controller
    {
        private readonly PropertyRentalContext context;
        private readonly IMapper mapper;

        public SuburbsController(PropertyRentalContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<SuburbResource>> GetSuburbs()
        {
            var suburbs = await context.Suburbs
                .Include(suburb => suburb.State)
                .ToListAsync();
            return mapper.Map<List<Suburb>, List<SuburbResource>>(suburbs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSuburb(int id)
        {
            var suburb = await context.Suburbs.FindAsync(id);
            if (suburb == null)
            {
                return NotFound();
            }
            var suburbResource = mapper.Map<Suburb, SuburbResource>(suburb);
            var state = await context.States.SingleOrDefaultAsync(state => state.Id == suburbResource.StateId);
            suburbResource.State = mapper.Map<State, StateResource>(state);
            return Ok(suburbResource);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSuburb([FromBody] SuburbResource suburbResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var suburb = await context.Suburbs.SingleOrDefaultAsync(record => record.Postcode == suburbResource.Postcode);
            if (suburb != null)
            {
                ModelState.AddModelError("Message", "Sorry, this suburb already exists!");
                return BadRequest(ModelState);
            }
            suburb = mapper.Map<SuburbResource, Suburb>(suburbResource);
            suburb.State = await context.States.SingleOrDefaultAsync(state => state.Id == suburbResource.StateId);
            context.Suburbs.Add(suburb);
            await context.SaveChangesAsync();
            return Ok(suburb);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSuburb(int id, [FromBody] SuburbResource suburbResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var suburb = await context.Suburbs.FindAsync(id);
            if (suburb == null)
            {
                return NotFound();
            }
            suburb = mapper.Map<SuburbResource, Suburb>(suburbResource);
            suburb.State = await context.States.SingleOrDefaultAsync(state => state.Id == suburb.StateId);
            await context.SaveChangesAsync();
            return Ok(suburb);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSuburb(int id)
        {
            var suburb = await context.Suburbs.FindAsync(id);
            if (suburb == null)
            {
                return NotFound();
            }
            context.Suburbs.Remove(suburb);
            await context.SaveChangesAsync();
            return Ok(suburb);
        }
    }
}