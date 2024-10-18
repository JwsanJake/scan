using Dapper;
using DVK.DataAccess;
using DVK.Models.Event;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Repositories.Event
{
    public class EventRepository : IEventRepository
    {
        private readonly MainContext _context;

        public EventRepository(MainContext context)
        {
            _context = context;
        }

        public async Task<List<object>> GetAllEvents()
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.EVENT_get_all",
               commandType: CommandType.StoredProcedure);

            var companies = reader.Read<object>();

            return companies.AsList();
        }

        public async Task<object> GetEventById(string id)
        {
            var reader = await _context.Database.GetDbConnection().QueryAsync("dbo.EVENT_get_by_id",
                new { id }, commandType: CommandType.StoredProcedure);

            var eventById = reader.FirstOrDefault<object>();

            return eventById;
        }

        public async Task<List<object>> GetPersonEvents(string id)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.EVENT_get_by_person",
                new { id }, commandType: CommandType.StoredProcedure);

            var events = reader.Read<object>();

            return events.AsList();
        }

        public async Task<List<object>> GetCompanyEvents(string id)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.EVENT_get_by_contractor",
                new { id }, commandType: CommandType.StoredProcedure);

            var events = reader.Read<object>();

            return events.AsList();
        }

        public async Task<string> AddEventPersonnelCheck(EventPersonnelCheck eventInfo)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.EVENT_add_personnel_check",
                new 
                { 
                    eventInfo.event_create_executor,
                    eventInfo.executor_subdivision,
                    //eventInfo.event_start_date,
                    //eventInfo.event_control_date,
                    event_start_date = eventInfo.event_start_date.AddDays(1),
                    event_control_date = eventInfo.event_control_date.AddDays(1),
                    eventInfo.event_status,
                    eventInfo.event_outgoing_doc,
                    eventInfo.event_doc_ground,
                    eventInfo.event_object,
                    eventInfo.event_subject,
                    eventInfo.event_vacant_position,
                    eventInfo.event_transfer_position,
                    eventInfo.event_content,
                    eventInfo.event_result,
                    eventInfo.event_executor_conclusion,
                    eventInfo.event_curator_conclusion,
                    eventInfo.event_conclusion_description
                }, commandType: CommandType.StoredProcedure);

            var id = reader.Read<string>().FirstOrDefault();

            return id;
        }

        public async Task<string> AddEventContractorCheck(EventContractorCheck eventInfo)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.EVENT_add_contractor_check",
                new
                {
                    eventInfo.event_create_executor,
                    eventInfo.executor_subdivision,
                    //eventInfo.event_start_date,
                    //eventInfo.event_control_date,
                    event_start_date = eventInfo.event_start_date.AddDays(1),
                    event_control_date = eventInfo.event_control_date.AddDays(1),
                    eventInfo.event_status,
                    eventInfo.event_outgoing_doc,
                    eventInfo.event_doc_ground,
                    eventInfo.event_object,
                    eventInfo.event_subject,
                    eventInfo.event_subject_of_contract ,
                    eventInfo.event_contract_amount,
                    eventInfo.event_content,
                    eventInfo.event_result,
                    eventInfo.event_executor_conclusion,
                    eventInfo.event_curator_conclusion,
                    eventInfo.event_conclusion_description
                }, commandType: CommandType.StoredProcedure);

            var id = reader.Read<string>().FirstOrDefault();

            return id;
        }

        public async Task<string> AddEventPersonnelMonitoring(EventPersonnelMonitoring eventInfo)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.EVENT_add_personnel_monitoring",
                new
                {
                    eventInfo.event_create_executor,
                    eventInfo.executor_subdivision,
                    //eventInfo.event_start_date,
                    //eventInfo.event_control_date,
                    event_start_date = eventInfo.event_start_date.AddDays(1).ToString(),
                    event_control_date = eventInfo.event_control_date.AddDays(1).ToString(),
                    eventInfo.event_status,
                    eventInfo.event_outgoing_doc,
                    eventInfo.event_doc_ground,
                    eventInfo.event_object,
                    eventInfo.event_subject,
                    eventInfo.event_person_position,
                    eventInfo.event_content,
                    eventInfo.event_result,
                    eventInfo.event_executor_conclusion,
                    eventInfo.event_curator_conclusion,
                    eventInfo.event_conclusion_description
                }, commandType: CommandType.StoredProcedure);

            var id = reader.Read<string>().FirstOrDefault();

            return id;
        }

        public async Task<string> AddEventContractorMonitoring(EventContractorMonitoring eventInfo)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.EVENT_add_contractor_monitoring",
                new
                {
                    eventInfo.event_create_executor,
                    eventInfo.executor_subdivision,
                    //eventInfo.event_start_date,
                    //eventInfo.event_control_date,
                    event_start_date = eventInfo.event_start_date.AddDays(1).ToString(),
                    event_control_date = eventInfo.event_control_date.AddDays(1).ToString(),
                    eventInfo.event_status,
                    eventInfo.event_outgoing_doc,
                    eventInfo.event_doc_ground,
                    eventInfo.event_object,
                    eventInfo.event_subject,
                    eventInfo.event_number_of_contract,
                    eventInfo.event_subject_of_contract,
                    eventInfo.event_contract_amount,
                    eventInfo.event_contract_executor,
                    eventInfo.event_content,
                    eventInfo.event_result,
                    eventInfo.event_executor_conclusion,
                    eventInfo.event_curator_conclusion,
                    eventInfo.event_conclusion_description
                }, commandType: CommandType.StoredProcedure);

            var id = reader.Read<string>().FirstOrDefault();

            return id;
        }

        public async Task<string> AddEventInformationSearchActivity(EventInformationSearchActivity eventInfo)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.EVENT_add_information_search_activity",
                new
                {
                    eventInfo.event_create_executor,
                    eventInfo.executor_subdivision,
                    //eventInfo.event_start_date,
                    //eventInfo.event_control_date,
                    event_start_date = eventInfo.event_start_date.AddDays(1).ToString(),
                    event_control_date = eventInfo.event_control_date.AddDays(1).ToString(),
                    eventInfo.event_status,
                    eventInfo.event_outgoing_doc,
                    eventInfo.event_doc_ground,
                    eventInfo.event_object,
                    eventInfo.event_subject,
                    eventInfo.event_ISA_type,
                    eventInfo.event_content,
                    eventInfo.event_result,
                    eventInfo.event_executor_conclusion,
                    eventInfo.event_curator_conclusion,
                    eventInfo.event_conclusion_description
                }, commandType: CommandType.StoredProcedure);

            var id = reader.Read<string>().FirstOrDefault();

            return id;
        }

        public async Task AddEventExecutors()
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.EVENT_add_executor",
                new
                {

                }, commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateEventPersonnelCheck(EventPersonnelCheck eventInfo)
        {
            var reader = await _context.Database.GetDbConnection().QueryAsync("dbo.EVENT_update_personnel_check",
                new
                {
                    eventInfo.identifier,
                    eventInfo.event_create_executor,
                    eventInfo.executor_subdivision,
                    //eventInfo.event_start_date,
                    //eventInfo.event_control_date,
                    event_start_date = eventInfo.event_start_date.AddDays(1).ToString(),
                    event_control_date = eventInfo.event_control_date.AddDays(1).ToString(),
                    eventInfo.event_status,
                    eventInfo.event_outgoing_doc,
                    eventInfo.event_doc_ground,
                    eventInfo.event_object,
                    eventInfo.event_subject,
                    eventInfo.event_vacant_position,
                    eventInfo.event_transfer_position,
                    eventInfo.event_content,
                    eventInfo.event_result,
                    eventInfo.event_executor_conclusion,
                    eventInfo.event_curator_conclusion,
                    eventInfo.event_conclusion_description,
                    eventInfo.event_supervisor_1_conclusion,
                    eventInfo.event_supervisor_2_conclusion,
                    eventInfo.event_supervisor_description
                }, commandType: CommandType.StoredProcedure);

        }

        public async Task UpdateEventContractorCheck(EventContractorCheck eventInfo)
        {
            var reader = await _context.Database.GetDbConnection().QueryAsync("dbo.EVENT_update_contractor_check",
                new
                {
                    eventInfo.identifier,
                    eventInfo.event_create_executor,
                    eventInfo.executor_subdivision,
                    //eventInfo.event_start_date,
                    //eventInfo.event_control_date,
                    event_start_date = eventInfo.event_start_date.AddDays(1).ToString(),
                    event_control_date = eventInfo.event_control_date.AddDays(1).ToString(),
                    eventInfo.event_status,
                    eventInfo.event_outgoing_doc,
                    eventInfo.event_doc_ground,
                    eventInfo.event_object,
                    eventInfo.event_subject,
                    eventInfo.event_subject_of_contract,
                    eventInfo.event_contract_amount,
                    eventInfo.event_content,
                    eventInfo.event_result,
                    eventInfo.event_executor_conclusion,
                    eventInfo.event_curator_conclusion,
                    eventInfo.event_conclusion_description,
                    eventInfo.event_supervisor_1_conclusion,
                    eventInfo.event_supervisor_2_conclusion,
                    eventInfo.event_supervisor_description
                }, commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateEventPersonnelMonitoring(EventPersonnelMonitoring eventInfo)
        {
            var reader = await _context.Database.GetDbConnection().QueryAsync("dbo.EVENT_update_personnel_monitoring",
                new
                {
                    eventInfo.identifier,
                    eventInfo.event_create_executor,
                    eventInfo.executor_subdivision,
                    //eventInfo.event_start_date,
                    //eventInfo.event_control_date,
                    event_start_date =  eventInfo.event_start_date.AddDays(1).ToString(),
                    event_control_date = eventInfo.event_control_date.AddDays(1).ToString(),
                    eventInfo.event_status,
                    eventInfo.event_outgoing_doc,
                    eventInfo.event_doc_ground,
                    eventInfo.event_object,
                    eventInfo.event_subject,
                    eventInfo.event_person_position,
                    eventInfo.event_content,
                    eventInfo.event_result,
                    eventInfo.event_executor_conclusion,
                    eventInfo.event_curator_conclusion,
                    eventInfo.event_conclusion_description,
                    eventInfo.event_supervisor_1_conclusion,
                    eventInfo.event_supervisor_2_conclusion,
                    eventInfo.event_supervisor_description
                }, commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateEventContractorMonitoring(EventContractorMonitoring eventInfo)
        {
            var reader = await _context.Database.GetDbConnection().QueryAsync("dbo.EVENT_update_contractor_monitoring",
                new
                {
                    eventInfo.identifier,
                    eventInfo.event_create_executor,
                    eventInfo.executor_subdivision,
                    //eventInfo.event_start_date,
                    //eventInfo.event_control_date,
                    event_start_date = eventInfo.event_start_date.AddDays(1).ToString(),
                    event_control_date =  eventInfo.event_control_date.AddDays(1).ToString(),
                    eventInfo.event_status,
                    eventInfo.event_outgoing_doc,
                    eventInfo.event_doc_ground,
                    eventInfo.event_object,
                    eventInfo.event_subject,
                    eventInfo.event_number_of_contract,
                    eventInfo.event_subject_of_contract,
                    eventInfo.event_contract_amount,
                    eventInfo.event_contract_executor,
                    eventInfo.event_content,
                    eventInfo.event_result,
                    eventInfo.event_executor_conclusion,
                    eventInfo.event_curator_conclusion,
                    eventInfo.event_conclusion_description,
                    eventInfo.event_supervisor_1_conclusion,
                    eventInfo.event_supervisor_2_conclusion,
                    eventInfo.event_supervisor_description
                }, commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateEventInformationSearchActivity(EventInformationSearchActivity eventInfo)
        {
            var reader = await _context.Database.GetDbConnection().QueryAsync("dbo.EVENT_update_event_information_search_activity",
                new
                {
                    eventInfo.identifier,
                    eventInfo.event_create_executor,
                    eventInfo.executor_subdivision,
                    //eventInfo.event_start_date,
                    //eventInfo.event_control_date,
                    event_start_date = eventInfo.event_start_date.AddDays(1).ToString(),
                    event_control_date = eventInfo.event_control_date.AddDays(1).ToString(),
                    eventInfo.event_status,
                    eventInfo.event_outgoing_doc,
                    eventInfo.event_doc_ground,
                    eventInfo.event_object,
                    eventInfo.event_subject,
                    eventInfo.event_ISA_type,
                    eventInfo.event_content,
                    eventInfo.event_result,
                    eventInfo.event_executor_conclusion,
                    eventInfo.event_curator_conclusion,
                    eventInfo.event_conclusion_description,
                    eventInfo.event_supervisor_1_conclusion,
                    eventInfo.event_supervisor_2_conclusion,
                    eventInfo.event_supervisor_description
                }, commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateEventSubject(string eventIdentifier, string identifier)
        {
            var reader = await _context.Database.GetDbConnection().QueryAsync("dbo.EVENT_update_event_subject",
                new { eventIdentifier, identifier }, commandType: CommandType.StoredProcedure);
        }
    }
}
