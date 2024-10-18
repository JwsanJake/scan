using DVK.DataAccess;
using DVK.Models.Admin;
using DVK.Repositories.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly IAdminRepository _repo;

        public AdminController(IAdminRepository repo)
        {
            _repo = repo;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetAllAccesses()
        {
            var accesses = await _repo.GetAllAccesses();

            return Ok(accesses);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetAllFactories()
        {
            var factories = await _repo.GetAllFactories();

            return Ok(factories);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetAllDirections()
        {
            var directions = await _repo.GetAllDirections();

            return Ok(directions);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetAllSubdivisions()
        {
            var subdivisions = await _repo.GetAllSubdivisions();

            return Ok(subdivisions);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetAllPositions()
        {
            var positions = await _repo.GetAllPositions();

            return Ok(positions);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetAllEmployees()
        {
            var users = await _repo.GetAllEmployees();

            return Ok(users);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddFactory(Factory factory)
        {
            if (factory == null)
            {
                return BadRequest();
            }

            await _repo.AddFactory(factory);

            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddDirection(Direction direction)
        {
            if (direction == null)
            {
                return BadRequest();
            }

            await _repo.AddDirection(direction);

            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddSubdivision(Subdivision subdivision)
        {
            if (subdivision == null)
            {
                return BadRequest();
            }

            await _repo.AddSubdivision(subdivision);

            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddPosition(Position position)
        {
            if (position == null)
            {
                return BadRequest();
            }

            await _repo.AddPosition(position);

            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddUser(User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            await _repo.AddUser(user);

            return Ok();
        }
    }
}
