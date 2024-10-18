using Dapper;
using DVK.DataAccess;
using DVK.DataTransfer;
using DVK.Models.Event;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace DVK.Helpers.NotificationHelper
{
    public class NotificationHelper : INotificationHelper
    {
        private readonly MainContext _context;

        public NotificationHelper(MainContext context)
        {
            _context = context;
        }

        public async Task<NotificationResult> GetNotifications(string email)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_get_by_user",
                new { email }, commandType: CommandType.StoredProcedure);

            var notifications = reader.Read<Notification>().AsList();

            return new NotificationResult()
            {
                Notifications = notifications,
            };
        }
        public async Task SendToApprove(EventPersonnelCheck eventInfo, string type)
        {
            if (eventInfo.role_id == 1)
            {
                if (type == "person")
                {
                    var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_add_to_approve",
                    new { roleId = 2, eventIdentifier = eventInfo.identifier, conclusion = eventInfo.event_executor_conclusion, email = "Galina.Sidorchuk@kazakhmys.kz" },
                    commandType: CommandType.StoredProcedure);

                    reader.Dispose();
                }

                else if (type == "company")
                {
                    var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_add_to_approve",
                    new { roleId = 2, eventIdentifier = eventInfo.identifier, conclusion = eventInfo.event_executor_conclusion, email = "Sergey.Khlebopashets@kazakhmys.kz" },
                    commandType: CommandType.StoredProcedure);

                    reader.Dispose();
                }
            }
            else if (eventInfo.role_id == 2)
            {
                if (eventInfo.event_curator_conclusion == "Согласовано" && eventInfo.is_supervisor == false)
                {
                    var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_add_to_approve",
                    new { roleId = eventInfo.role_id, eventIdentifier = eventInfo.identifier, conclusion = eventInfo.event_curator_conclusion, email = "Bekzhan.Zhorabek@kazakhmys.kz" }, 
                    commandType: CommandType.StoredProcedure);
                    reader.Dispose();

                    var reader2 = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_send_email",
                    new { eventIdentifier = eventInfo.identifier, email = "Bekzhan.Zhorabek@kazakhmys.kz" },
                    commandType: CommandType.StoredProcedure);
                }
                if (eventInfo.event_curator_conclusion == "Согласовано" && eventInfo.is_supervisor == true)
                {
                    var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_add_to_approve",
                    new { roleId = eventInfo.role_id, eventIdentifier = eventInfo.identifier, conclusion = eventInfo.event_curator_conclusion, email = "Ruslan.Nevmatulin@kazakhmys.kz" }, 
                    commandType: CommandType.StoredProcedure);
                    reader.Dispose();

                    var reader2 = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_send_email",
                    new { eventIdentifier = eventInfo.identifier, email = "Ruslan.Nevmatulin@kazakhmys.kz" },
                    commandType: CommandType.StoredProcedure);
                }
                else if (eventInfo.event_curator_conclusion == "Не согласовано")
                {
                    var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_add_to_approve",
                    new { roleId = eventInfo.role_id, eventIdentifier = eventInfo.identifier, conclusion = eventInfo.event_curator_conclusion, email = "Ruslan.Nevmatulin@kazakhmys.kz" }, 
                    commandType: CommandType.StoredProcedure);
                    reader.Dispose();

                    var reader2 = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_send_email",
                    new { eventIdentifier = eventInfo.identifier, email = "Ruslan.Nevmatulin@kazakhmys.kz" },
                    commandType: CommandType.StoredProcedure);
                }
                else if (eventInfo.event_curator_conclusion == "На доработку")
                {
                    var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_update_approve",
                    new { roleId = eventInfo.role_id, eventIdentifier = eventInfo.identifier, conclusion = eventInfo.event_curator_conclusion, email = "Veronika.Yatmaskina@kazakhmys.kz" }, 
                    commandType: CommandType.StoredProcedure);

                    reader.Dispose();
                }
            }
            else if (eventInfo.role_id == 3)
            {
                if (eventInfo.event_supervisor_1_conclusion == "Согласовано")
                {
                    var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_update_approve",
                    new { roleId = 4, eventIdentifier = eventInfo.identifier, conclusion = eventInfo.event_curator_conclusion, email = "Bekzhan.Zhorabek@kazakhmys.kz" }, commandType: CommandType.StoredProcedure);
                    reader.Dispose();

                    var reader2 = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_send_email",
                    new { eventIdentifier = eventInfo.identifier, email = "Ruslan.Nevmatulin@kazakhmys.kz" },
                    commandType: CommandType.StoredProcedure);
                }
                else if (eventInfo.event_supervisor_1_conclusion == "Не согласован")
                {
                    var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_update_approve",
                    new { roleId = eventInfo.role_id, eventIdentifier = eventInfo.identifier, conclusion = eventInfo.event_curator_conclusion, email = "Bekzhan.Zhorabek@kazakhmys.kz" }, commandType: CommandType.StoredProcedure);
                }
                else if (eventInfo.event_supervisor_1_conclusion == "На доработку")
                {
                    var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_update_approve",
                    new { roleId = eventInfo.role_id, eventIdentifier = eventInfo.identifier, conclusion = eventInfo.event_curator_conclusion, email = "Galina.Sidorchuk@kazakhmys.kz" }, commandType: CommandType.StoredProcedure);
                }
            }
            else if (eventInfo.role_id == 4)
            {
                if (eventInfo.event_supervisor_2_conclusion == "Согласовано")
                {
                    var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_update_approve",
                    new { roleId = 6, eventIdentifier = eventInfo.identifier, conclusion = eventInfo.event_curator_conclusion, email = "" }, commandType: CommandType.StoredProcedure);
                }
            }
        }

        

        //public async Task SendToApprove(ApprovementStatus app)
        //{
        //    var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.APPROVEMENT_send_forward",
        //        new { }, commandType: CommandType.StoredProcedure);

        //    var 

        //}

        public async Task SendToRework(string email, string identifier)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_update_to_rework",
                new { email, identifier }, commandType: CommandType.StoredProcedure);
        }




        public async Task ApproveEvent(string email, string identifier)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_update_to_rework",
                new { email, identifier }, commandType: CommandType.StoredProcedure);
        }

        public async Task ReadNotification(string email, string identifier)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.NOTIFICATION_read_notification",
                new { email, identifier }, commandType: CommandType.StoredProcedure);
        }
    }
}
