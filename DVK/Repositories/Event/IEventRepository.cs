using DVK.Models.Event;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Repositories.Event
{
    public interface IEventRepository
    {
        public Task<List<object>> GetAllEvents();
        public Task<object> GetEventById(string id);
        Task<List<object>> GetPersonEvents(string id);
        Task<List<object>> GetCompanyEvents(string id);
        public Task<string> AddEventPersonnelCheck(EventPersonnelCheck eventInfo);
        public Task<string> AddEventContractorCheck(EventContractorCheck eventInfo);
        Task UpdateEventSubject(string eventIdentifier, string personIdentifier);
        public Task UpdateEventPersonnelCheck(EventPersonnelCheck eventInfo);
        public Task UpdateEventContractorCheck(EventContractorCheck eventInfo);
    }
}
