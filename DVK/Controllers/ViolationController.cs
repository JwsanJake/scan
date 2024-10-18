using DVK.Helpers.FileUploader;
using DVK.Models.Violation;
using DVK.Repositories.Violation;
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
    public class ViolationController : Controller
    {
        private readonly IViolationRepository _repo;
        private readonly IFileService _upload;

        public ViolationController(IViolationRepository repo, IFileService upload)
        {
            _repo = repo;
            _upload = upload;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetAllViolations()
        {
            var companies = await _repo.GetAllViolations();

            return Ok(companies);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetViolationById(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var company = await _repo.GetViolationById(id);

            return Ok(company);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetViolationCategories()
        {
            var categories = await _repo.GetViolationCategories();

            return Ok(categories);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetViolationKinds(int id)
        {
            var kinds = await _repo.GetViolationKinds(id);

            return Ok(kinds);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddPersonnelMonitoringViolation(PersonnelMonitoringViolation violationInfo)
        {
            if (violationInfo == null)
            {
                return BadRequest();
            }

            await _repo.AddPersonnelMonitoringViolation(violationInfo);

            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddContractorsMonitoringViolation(ContractorMonitoringViolation violationInfo)
        {
            if (violationInfo == null)
            {
                return BadRequest();
            }

            await _repo.AddContractorMonitoringViolation(violationInfo);

            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddInformationSearchActivityViolation(InformationSearchActivityViolation violationInfo)
        {
            if (violationInfo == null)
            {
                return BadRequest();
            }

            await _repo.AddISAViolation(violationInfo);

            return Ok();
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdatePersonnelMonitoringViolation(PersonnelMonitoringViolation violationInfo)
        {
            if (violationInfo == null)
            {
                return BadRequest();
            }

            await _repo.UpdatePersonnelMonitoringViolation(violationInfo);

            return Ok();
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateContractorsMonitoringViolation(ContractorMonitoringViolation violationInfo)
        {
            if (violationInfo == null)
            {
                return BadRequest();
            }

            await _repo.UpdateContractorMonitoringViolation(violationInfo);

            return Ok();
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateInformationSearchActivityViolation(InformationSearchActivityViolation violationInfo)
        {
            if (violationInfo == null)
            {
                return BadRequest();
            }

            await _repo.UpdateISAViolation(violationInfo);

            return Ok();
        }
    }
}
