using DVK.DataTransfer;
using DVK.Models.Event;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace DVK.Helpers.NotificationHelper
{
    public interface INotificationHelper
    {
        Task<NotificationResult> GetNotifications(string email);
        //Task SendToApprove(int roleId, string identifier, string executorConclusion, string curatorConclusion, string email);
        Task SendToApprove(EventPersonnelCheck eventInfo, string type);
        Task SendToRework(string email, string identifier);
        Task ApproveEvent(string email, string identifier);
        Task ReadNotification(string email, string identifier);
    }
}
