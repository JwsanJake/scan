using DVK.DataAccess;
using Dapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using DVK.Models;
using System;
using DVK.Models.Company;
using System.Linq;
using DVK.Models.Event;

namespace DVK.Repositories.Company
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly MainContext _context;

        public CompanyRepository(MainContext context)
        {
            _context = context;
        }

        public async Task<List<object>> GetAllCompanies()
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_get_all",
                commandType: CommandType.StoredProcedure);

            var companies = reader.Read<object>();

            return companies.AsList();
        }

        public async Task<object> GetCompanyById(string id)
        {
            var reader = _context.Database.GetDbConnection().QueryMultiple("dbo.COMPANY_get_by_id",
                new { id }, commandType: CommandType.StoredProcedure);

            var allData = new Dictionary<string, object>();

            var mainInfo = reader.Read<CompanyBaseInfo>().ToList();

            if (mainInfo.Count > 0)
            {
                allData.Add("mainInfo", mainInfo[0]);

                var activities = reader.Read<dynamic>().ToList();
                allData.Add("activities", activities);

                var licenses = reader.Read<dynamic>().ToList();
                allData.Add("licenses", licenses);

                var files = reader.Read<dynamic>().ToList();
                allData.Add("files", files);
            }

            return allData;
        }

        public async Task<object> GetCompanyAllDataById(string id, string eventId)
        {
            var reader = _context.Database.GetDbConnection().QueryMultiple("dbo.COMPANY_get_all_data_by_id",
                new { id, eventId }, commandType: CommandType.StoredProcedure);

            var allData = new Dictionary<string, object>();

            var mainInfo = reader.Read<CompanyBaseInfo>().ToList();

            if (mainInfo.Count > 0)
            {
                allData.Add("mainInfo", mainInfo[0]);

                var activities = reader.Read<dynamic>().ToList();
                allData.Add("activities", activities);

                var owners = reader.Read<dynamic>().ToList();
                allData.Add("owners", owners);

                var director = reader.Read<dynamic>().ToList();
                allData.Add("director", director);

                var financial = reader.Read<dynamic>().ToList();
                if (financial.Count > 0)
                {
                    allData.Add("financial", financial[0]);
                }

                var licenses = reader.Read<dynamic>().ToList();
                allData.Add("licenses", licenses);

                var negative = reader.Read<dynamic>().ToList();
                if (negative.Count > 0)
                {
                    allData.Add("negative", negative[0]);
                }

                var events = reader.Read<EventContractorCheck>().ToList();
                if (events.Count > 0)
                {
                    allData.Add("events", events[0]);
                }
            }

            return allData;
        }

        public async Task<List<object>> GetCompanyActivities(string id)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_get_activities",
                new { id }, commandType: CommandType.StoredProcedure);

            var activities = await reader.ReadAsync<object>();

            return activities.AsList();
        }

        public async Task<List<object>> GetCompanyLicenses(string id)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_get_licenses",
                new { id }, commandType: CommandType.StoredProcedure);

            var licenses = await reader.ReadAsync<object>();

            return licenses.AsList();
        }

        public async Task<List<object>> GetDirectorById(string id)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_get_affiliations",
                new { id, affType = 3 }, commandType: CommandType.StoredProcedure);

            var director = await reader.ReadAsync<object>();

            return director.AsList();
        }

        public async Task<List<object>> GetCompanyOwnersById(string id)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_get_affiliations",
                new { id, affType = 1 }, commandType: CommandType.StoredProcedure);

            var companies = await reader.ReadAsync<object>();

            return companies.AsList();
        }

        public async Task<object> GetCompanyFinancialSolvency(string id, string eventIdentifier)
        {
            //var reader = await _context.Database.GetDbConnection().QueryAsync("dbo.COMPANY_get_financial_solvency",
            //    new { id, eventIdentifier }, commandType: CommandType.StoredProcedure);

            //var finSolvency = reader.FirstOrDefault<object>();

            //return finSolvency;

            var reader = _context.Database.GetDbConnection().QueryMultiple("dbo.COMPANY_get_financial_solvency",
                new { id, eventIdentifier }, commandType: CommandType.StoredProcedure);

            var negative = new Dictionary<string, object>();

            var mainInfo = reader.Read<CompanyFinancialSolvency>().ToList();

            if (mainInfo.Count > 0)
            {
                negative.Add("mainInfo", mainInfo[0]);

                var files = reader.Read<dynamic>().ToList();
                negative.Add("files", files);
            }

            return negative;
        }

        public async Task<object> GetCompanyAllFinancialSolvency(string id)
        {
            //var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_get_all_financial_solvency",
            //    new { id }, commandType: CommandType.StoredProcedure);

            //var finSolvencys = await reader.ReadAsync<object>();

            //return finSolvencys.AsList();

            var reader = _context.Database.GetDbConnection().QueryMultiple("dbo.COMPANY_get_all_financial_solvency",
                new { id }, commandType: CommandType.StoredProcedure);

            var negative = new Dictionary<string, object>();

            var mainInfo = reader.Read<CompanyFinancialSolvency>().ToList();

            if (mainInfo.Count > 0)
            {
                negative.Add("mainInfo", mainInfo);

                var files = reader.Read<dynamic>().ToList();
                negative.Add("files", files);
            }

            return negative;
        }

        public async Task<List<object>> GetCompanyAffiliationsById(string id)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_get_affiliations",
                new { id }, commandType: CommandType.StoredProcedure);

            var companies = await reader.ReadAsync<object>();

            return companies.AsList();
        }

        public async Task<object> GetCompanyNegativeInfo(string id, string eventIdentifier)
        {
            //var reader = await _context.Database.GetDbConnection().QueryAsync("dbo.COMPANY_get_negative_info",
            //    new { id, eventIdentifier }, commandType: CommandType.StoredProcedure);

            //var negative = reader.FirstOrDefault<object>();

            //return negative;

            var reader = _context.Database.GetDbConnection().QueryMultiple("dbo.COMPANY_get_negative_info",
               new { id, eventIdentifier }, commandType: CommandType.StoredProcedure);

            var negative = new Dictionary<string, object>();

            var mainInfo = reader.Read<CompanyNegativeInfo>().ToList();

            if (mainInfo.Count > 0)
            {
                negative.Add("mainInfo", mainInfo[0]);

                var files = reader.Read<dynamic>().ToList();
                negative.Add("files", files);
            }

            return negative;
        }

        public async Task<object> GetCompanyAllNegativeInfo(string id)
        {
            //var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_get_all_negative_info",
            //    new { id }, commandType: CommandType.StoredProcedure);

            //var negative = await reader.ReadAsync<object>();

            //return negative.AsList();

            var reader = _context.Database.GetDbConnection().QueryMultiple("dbo.COMPANY_get_all_negative_info",
                new { id }, commandType: CommandType.StoredProcedure);

            var negative = new Dictionary<string, object>();

            var mainInfo = reader.Read<CompanyNegativeInfo>().ToList();

            if (mainInfo.Count > 0)
            {
                negative.Add("mainInfo", mainInfo);

                var files = reader.Read<dynamic>().ToList();
                negative.Add("files", files);
            }

            return negative;
        }

        public async Task<List<object>> GetCompanyEvents(string id)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.EVENT_get_by_contractor",
                new { id }, commandType: CommandType.StoredProcedure);

            var negative = await reader.ReadAsync<object>();

            return negative.AsList();
        }

        public async Task<string> AddCompany(CompanyBaseInfo company)
        {
            company.last_registration_date = company.last_registration_date.HasValue ? company.last_registration_date.Value.AddDays(1) : null;

            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_add_new",
                new { 
                    company.company_title, 
                    company.doc_number,
                    company.bin,
                    company.legal_address,
                    company.actual_address,
                    first_registration_date = company.first_registration_date.AddDays(1), //!= DateTime.MinValue ? company.first_registration_date.AddDays(1).ToString() : null,
                    //company.last_registration_date,
                    last_registration_date = company.last_registration_date //!= DateTime.MinValue ? company.last_registration_date.AddDays(1).ToString() : null
                }, commandType: CommandType.StoredProcedure);

            var id = reader.Read<string>();

            return id.FirstOrDefault();
        }

        public async Task AddCompanyActivities(CompanyBaseInfo company)
        {
            foreach (var activity in company.KindOfActivities)
            {
                var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_add_activity",
                    new {company.identifier, activity.activity_name }, commandType: CommandType.StoredProcedure);

                reader.Dispose();
            }
        }

        public async Task AddCompanyLicenses(CompanyBaseInfo company)
        {
            foreach(var license in company.Licenses)
            {
                var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_add_license",
                    new { company.identifier, license.license_name }, commandType: CommandType.StoredProcedure);

                reader.Dispose();
            }
        }

        public async Task AddCompanyOwner(CompanyOwner owner)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_add_affiliations", 
                new { owner.identifier, owner.parentId, affType = 1 }, commandType: CommandType.StoredProcedure);
        }

        public async Task AddCompanyDirector(CompanyDirector director)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_add_affiliations",
                new { director.identifier, director.parentId, affType = 3 }, commandType: CommandType.StoredProcedure);
        }

        public async Task AddCompanyFinancialSolvency(CompanyFinancialSolvency finSolvency)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_add_financial_solvency",
                new  
                {
                    finSolvency.identifier,
                    finSolvency.event_identifier,
                    tax_payment_last_year = finSolvency.tax_payment_last_year != "null" ? finSolvency.tax_payment_last_year : "нет данных",
                    tax_debt_info = finSolvency.tax_debt_info != "null" ? finSolvency.tax_debt_info : "нет данных",
                    enforcement_proceedings_info = finSolvency.enforcement_proceedings_info != "null" ? finSolvency.enforcement_proceedings_info : "нет данных",
                    court_cases_info = finSolvency.court_cases_info != "null" ? finSolvency.court_cases_info : "нет данных",
                    criminal_administrative_сases_info = finSolvency.criminal_administrative_cases_info != "null" ? finSolvency.criminal_administrative_cases_info : "нет данных",
                    unscrupulous_participant_of_state_procurements = finSolvency.unscrupulous_participant_of_state_procurements != "null" ? finSolvency.unscrupulous_participant_of_state_procurements : "нет данных",
                    arrest_of_bank_balance = finSolvency.arrest_of_bank_balance != "null" ? finSolvency.arrest_of_bank_balance : "нет данных",
                    negative_info = finSolvency.negative_info != "null" ? finSolvency.negative_info : "нет данных"
                }, commandType: CommandType.StoredProcedure);
            reader.Dispose();
        }

        //public async Task SaveFinancialDocumentsPath(string identifier, List<string> finSolvency, string inputType, string eventIdentifier)
        //{
        //    foreach (var filePath in finSolvency)
        //    {
        //        var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_save_financial_documents_path",
        //        new
        //        {
        //            identifier,
        //            eventIdentifier,
        //            inputType,
        //            filePath
        //        }, commandType: CommandType.StoredProcedure);

        //        reader.Dispose();
        //    }
        //}

        public async Task AddCompanyAffiliations(CompanyAffiliation affiliation)
        {
            var reader = await  _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_add_affiliations",
                new
                { 
                    affiliation.identifier,
                    affiliation.parentId,
                    affiliation.AffType
                }, commandType: CommandType.StoredProcedure);
        }

        public async Task AddCompanyNegativeInfo(CompanyNegativeInfo negative)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_add_negative_info", new
            {
                negative.identifier,
                negative.event_identifier,

                management_negative_info = negative.management_negative_info != "null" ? negative.management_negative_info : "нет данных",
                harm_to_companies_interests = negative.harm_to_companies_interests != "null" ? negative.harm_to_companies_interests : "нет данных",
                international_sanctions = negative.international_sanctions != "null" ? negative.international_sanctions : "нет данных",
                judicial_executive_authorities_sanctions = negative.judicial_executive_authorities_sanctions != "null" ? negative.judicial_executive_authorities_sanctions : "нет данных",
                misrepresentations = negative.misrepresentations != "null" ? negative.misrepresentations : "нет данных",
                anticorruption_reservation = negative.anticorruption_reservation != "null" ? negative.anticorruption_reservation : "нет данных",
                inconsistency_of_contract_conditions = negative.inconsistency_of_contract_conditions != "null" ? negative.inconsistency_of_contract_conditions : "нет данных",
                inconsistency_of_corporation_requirements = negative.inconsistency_of_corporation_requirements != "null" ? negative.inconsistency_of_corporation_requirements : "нет данных"
            }, commandType: CommandType.StoredProcedure);

            reader.Dispose();
        }

        //public async Task SaveNegativeDocumentsPath(string identifier, List<string> negative, string inputType, string eventIdentifier)
        //{
        //    foreach (var filePath in negative)
        //    {
        //        var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_save_negative_files_path",
        //        new
        //        {
        //            identifier,
        //            eventIdentifier,
        //            inputType,
        //            filePath
        //        }, commandType: CommandType.StoredProcedure);

        //        reader.Dispose();
        //    }
        //}

        public async Task UpdateCompanyFinancialSolvency(CompanyFinancialSolvency finSolvency)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_update_financial_solvency",
                new
                {
                    finSolvency.identifier,
                    finSolvency.event_identifier,
                    finSolvency.tax_payment_last_year,
                    finSolvency.tax_debt_info,
                    finSolvency.enforcement_proceedings_info,
                    finSolvency.court_cases_info,
                    finSolvency.criminal_administrative_cases_info,
                    finSolvency.unscrupulous_participant_of_state_procurements,
                    finSolvency.arrest_of_bank_balance,
                    finSolvency.negative_info
                }, commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateCompanyNegativeInfo(CompanyNegativeInfo negative)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_update_negative_info",
                new
                {
                    negative.identifier,
                    negative.event_identifier,
                    negative.management_negative_info,
                    negative.harm_to_companies_interests,
                    negative.international_sanctions,
                    negative.judicial_executive_authorities_sanctions,
                    negative.misrepresentations,
                    negative.anticorruption_reservation,
                    negative.inconsistency_of_contract_conditions,
                    negative.inconsistency_of_corporation_requirements
                }, commandType: CommandType.StoredProcedure);
        }

        public async Task DeleteCompanyActivities(string identifier)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_delete_activities",
                new
                {
                    identifier
                }, commandType: CommandType.StoredProcedure);

            reader.Dispose();
        }

        public async Task DeleteCompanyLicense(string identifier)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_delete_licenses",
                new
                {
                    identifier
                }, commandType: CommandType.StoredProcedure);

            reader.Dispose();
        }
    }
}

