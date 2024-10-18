using DVK.Helpers.FileUploader;
using DVK.Helpers.NotificationHelper;
using DVK.Helpers.RoleHelper;
using DVK.Models.Event;
using DVK.Repositories.Event;
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
    public class EventController : Controller
    {
        private readonly IEventRepository _repo;
        private readonly IFileService _upload;
        private readonly INotificationHelper _notification;
        private readonly IRoleHelper _role;
        
        public EventController(IEventRepository repo, IFileService upload, INotificationHelper notification, IRoleHelper role)
        {
            _repo = repo;
            _upload = upload;
            _notification = notification;
            _role = role;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetAllEvents()
        {
            //var role = await _role.CheckRoles(User.Identity.Name);

            var events = await _repo.GetAllEvents();

            return Ok(events);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetEventById(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var eventById = await _repo.GetEventById(id);

            return Ok(eventById);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetPersonEvents(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var events = await _repo.GetPersonEvents(id);

            return Ok(events);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetCompanyEvents(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var events = await _repo.GetCompanyEvents(id);

            return Ok(events);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddEventPersonnelCheck(EventPersonnelCheck eventInfo)
        {
            if (eventInfo == null)
            {
                return BadRequest();
            }

            string id = null;

            id = await _repo.AddEventPersonnelCheck(eventInfo);

            return Ok(id);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddEventContractorCheck(EventContractorCheck eventInfo)
        {
            if (eventInfo == null)
            {
                return BadRequest();
            }

            string id = null;

            id = await _repo.AddEventContractorCheck(eventInfo);

            return Ok(id);
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateEventPersonnelCheck(EventPersonnelCheck eventInfo)
        {
            if (eventInfo == null)
            {
                return BadRequest();
            }

            switch(eventInfo.role_id)
            {
                case 1:
                    eventInfo.event_step = "На согласовании у куратора";
                    break;
                case 2:
                    eventInfo.event_step = "На согласовании у начальника";
                    break;
                case 3:
                    eventInfo.event_step = "На согласовании у начальника";
                    break;
                case 4:
                    eventInfo.event_step = "";
                    break;
            }


            await _repo.UpdateEventPersonnelCheck(eventInfo);
            await _notification.SendToApprove(eventInfo, "person");
            return Ok();
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateEventContractorCheck(EventContractorCheck eventInfo)
        {
            if (eventInfo == null)
            {
                return BadRequest();
            }

            switch (eventInfo.role_id)
            {
                case 1:
                    eventInfo.event_step = "На согласовании у куратора";
                    break;
                case 2:
                    eventInfo.event_step = "На согласовании у начальника";
                    break;
                case 3:
                    eventInfo.event_step = "На согласовании у начальника";
                    break;
                case 4:
                    eventInfo.event_step = "";
                    break;
            }
            await _repo.UpdateEventContractorCheck(eventInfo);

            EventPersonnelCheck info = new EventPersonnelCheck();
            info.role_id = eventInfo.role_id;
            info.identifier = eventInfo.identifier;
            info.event_executor_conclusion = eventInfo.event_executor_conclusion;
            info.event_curator_conclusion = eventInfo.event_curator_conclusion;
            info.event_supervisor_1_conclusion = eventInfo.event_supervisor_1_conclusion;
            info.event_supervisor_2_conclusion = eventInfo.event_supervisor_2_conclusion;
            await _notification.SendToApprove(info, "company");

            return Ok();
        }

    }
}
