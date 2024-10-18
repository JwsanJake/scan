using DVK.Helpers.NotificationHelper;
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
    public class NotificationController : Controller
    {
        private readonly INotificationHelper _notification;

        public NotificationController(INotificationHelper notification)
        {
            _notification = notification;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetNotifications()
        {
            var notifications =  await _notification.GetNotifications(User.Identity.Name);

            return Ok(notifications);
        }
    }
}
