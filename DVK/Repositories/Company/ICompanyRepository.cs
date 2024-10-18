using DVK.Models;
using DVK.Models.Company;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Repositories.Company
{
    public interface ICompanyRepository
    {
        Task<List<object>> GetAllCompanies();
        Task<object> GetCompanyById(string id);
        Task<object> GetCompanyAllDataById(string id, string eventId);
        Task<List<object>> GetCompanyActivities(string id);
        Task<List<object>> GetCompanyLicenses(string id);
        Task<List<object>> GetDirectorById(string id);
        Task<List<object>> GetCompanyOwnersById(string id);
        Task<object> GetCompanyFinancialSolvency(string id, string eventIdentifier);
        Task<object> GetCompanyAllFinancialSolvency(string id);
        Task<List<object>> GetCompanyAffiliationsById(string id);
        Task<object> GetCompanyNegativeInfo(string id, string eventIdentifier);
        Task<object> GetCompanyAllNegativeInfo(string id);
        Task<List<object>> GetCompanyEvents(string id);
        Task<string> AddCompany(CompanyBaseInfo company);
        Task AddCompanyActivities(CompanyBaseInfo company);
        Task AddCompanyLicenses(CompanyBaseInfo company);
        Task AddCompanyOwner(CompanyOwner owner);
        Task AddCompanyDirector(CompanyDirector director);
        Task AddCompanyFinancialSolvency(CompanyFinancialSolvency finSolvency);
        //Task SaveFinancialDocumentsPath(string identifier, List<string> finSolvency, string inputType, string eventIdentifier);
        Task AddCompanyAffiliations(CompanyAffiliation affiliations);
        Task AddCompanyNegativeInfo(CompanyNegativeInfo negative);
        //Task SaveNegativeDocumentsPath(string identifier, List<string> negative, string inputType, string eventIdentifier);
        Task UpdateCompanyFinancialSolvency(CompanyFinancialSolvency finSolvency);
        Task UpdateCompanyNegativeInfo(CompanyNegativeInfo negative);
        Task DeleteCompanyActivities(string identifier);
        Task DeleteCompanyLicense(string identifier);
    }
}
