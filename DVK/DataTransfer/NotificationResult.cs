using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.DataTransfer
{
    public class NotificationResult
    {
        public List<Notification> Notifications { get; set; } = new List<Notification>();
        public string ErrorMessage { get; set; } = string.Empty;
    }


    public class Notification
    {
        public string Event_Identifier { get; set; }
        public string Notification_Status { get; set; }
    }
}
