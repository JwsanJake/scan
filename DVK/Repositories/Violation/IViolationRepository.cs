using DVK.Models.Violation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Repositories.Violation
{
    public interface IViolationRepository
    {
        Task<List<object>> GetAllViolations();
        Task<object> GetViolationById(string id);
        Task<List<object>> GetPersonViolations(string id);
        Task<List<object>> GetCompanyViolations(string id);
        Task<List<object>> GetViolationCategories();
        Task<List<object>> GetViolationKinds(int id);
        Task<string> AddPersonnelMonitoringViolation(PersonnelMonitoringViolation violation);
        Task<string> AddContractorMonitoringViolation(ContractorMonitoringViolation violation);
        Task<string> AddISAViolation(InformationSearchActivityViolation violation);
        Task UpdatePersonnelMonitoringViolation(PersonnelMonitoringViolation violation);
        Task UpdateContractorMonitoringViolation(ContractorMonitoringViolation violation);
        Task UpdateISAViolation(InformationSearchActivityViolation violation);



        
        Task<List<object>> GetViolationResponseMeasures();

    }
}
