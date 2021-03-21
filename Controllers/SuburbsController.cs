using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertyRental.Models;
using PropertyRental.Persistence;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using PropertyRental.Controllers.Resources;
using PropertyRental.Core.Interfaces;
using PropertyRental.Core;

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
        public async Task<IEnumerable<SuburbResource>> GetSuburbs()
        {
            var suburbs = await repository.GetSuburbs();
            return mapper.Map<List<Suburb>, List<SuburbResource>>(suburbs.ToList());
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