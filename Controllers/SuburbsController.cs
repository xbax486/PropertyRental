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
    [Route("/api/suburbs")]
    public class SuburbsController : Controller
    {
        private readonly IMapper mapper;
        private readonly ISuburbRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public SuburbsController(IMapper mapper, ISuburbRepository repository, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<QueryResultResource<SuburbResource>> GetSuburbs(SuburbQueryResource suburbQueryResource = null)
        {
            var queryObject = mapper.Map<SuburbQueryResource, SuburbQuery>(suburbQueryResource);
            var queryResult = await repository.GetSuburbs(queryObject);
            return mapper.Map<QueryResult<Suburb>, QueryResultResource<SuburbResource>>(queryResult);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSuburb(int id)
        {
            var suburb = await repository.GetSuburb(id);
            if (suburb == null)
            {
                return NotFound();
            }
            var suburbResource = mapper.Map<Suburb, SuburbResource>(suburb);
            return Ok(suburbResource);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSuburb([FromBody] SuburbResource suburbResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var suburb = await repository.FindSuburb(suburbResource);
            if (suburb != null)
            {
                ModelState.AddModelError("Message", "Suburb creation error. Sorry, this suburb already exists!");
                return BadRequest(ModelState);
            }
            suburb = mapper.Map<SuburbResource, Suburb>(suburbResource);
            suburb = await repository.PopulateSuburbWithRelatedFields(suburb, suburbResource);
            repository.Add(suburb);
            await unitOfWork.CompleteAsync();
            return Ok(suburb);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSuburb(int id, [FromBody] SuburbResource suburbResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var suburb = await repository.GetSuburb(id, includeRelated: false);
            if (suburb == null)
            {
                return NotFound();
            }
            var existingSuburb = await repository.FindSuburb(suburbResource);
            if (existingSuburb != null)
            {
                ModelState.AddModelError("Message", "Suburb update error. Sorry, this suburb already exists!");
                return BadRequest(ModelState);
            }
            mapper.Map<SuburbResource, Suburb>(suburbResource, suburb);
            suburb = await repository.PopulateSuburbWithRelatedFields(suburb, suburbResource);
            await unitOfWork.CompleteAsync();
            return Ok(suburb);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSuburb(int id)
        {
            var suburb = await repository.GetSuburb(id, includeRelated: false);
            if (suburb == null)
            {
                return NotFound();
            }
            repository.Remove(suburb);
            await unitOfWork.CompleteAsync();
            return Ok();
        }
    }
}