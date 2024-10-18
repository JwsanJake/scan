using Dapper;
using DVK.DataAccess;
using DVK.Models;
using DVK.Models.Event;
using DVK.Models.Person;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Repositories.Person
{
    public class PersonRepository : IPersonRepository
    {
        private readonly MainContext _context;

        public PersonRepository(MainContext context)
        {
            _context = context;
        }

        public async Task<List<object>> GetAllPersons()
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_get_all",
                commandType: CommandType.StoredProcedure);

            var persons = reader.Read<object>();

            return persons.AsList();
        }

        public async Task<List<object>> GetAllCountries()
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_get_citizenship",
                commandType: CommandType.StoredProcedure);

            var countries = reader.Read<object>();

            return countries.AsList();
        }

        public async Task<object> GetPersonById(string id)
        {
            //var reader =  await _context.Database.GetDbConnection().QueryAsync("dbo.PERSON_get_by_id",
            //    new { id }, commandType: CommandType.StoredProcedure);

            //var person = reader.FirstOrDefault<object>();

            //return person;

            var reader = _context.Database.GetDbConnection().QueryMultiple("dbo.PERSON_get_by_id",
                new { id }, commandType: CommandType.StoredProcedure);

            var allData = new Dictionary<string, object>();

            var mainInfo = reader.Read<PersonBaseInfo>().ToList();

            if (mainInfo.Count > 0)
            {
                allData.Add("mainInfo", mainInfo[0]);

                var files = reader.Read<dynamic>().ToList();
                allData.Add("files", files);
            }

            return allData;
        }

        public async Task<Dictionary<String, Object>> GetPersonAllDataById(string id, string eventId)
        {
            var reader = _context.Database.GetDbConnection().QueryMultiple("dbo.PERSON_get_all_data_by_id",
                new { id, eventId }, commandType: CommandType.StoredProcedure);

            var allData = new Dictionary<string, object>();

            var mainInfo = reader.Read<PersonBaseInfo>().ToList();

            if (mainInfo.Count > 0)
            {
                allData.Add("mainInfo", mainInfo[0]);

                var education = reader.Read<dynamic>().ToList();
                allData.Add("education", education);

                var career = reader.Read<dynamic>().ToList();
                allData.Add("career", career);

                var family = reader.Read<dynamic>().ToList();
                allData.Add("family", family);

                var financial = reader.Read<dynamic>().ToList();
                if (financial.Count > 0)
                {
                    allData.Add("financial", financial[0]);
                }

                var negative = reader.Read<dynamic>().ToList();
                if (negative.Count > 0)
                {
                    allData.Add("negative", negative[0]);
                }

                var events = reader.Read<EventPersonnelCheck>().ToList();
                
                if (events.Count > 0)
                {
                    allData.Add("events", events[0]);
                }
            }

            return allData;
        }

        public async Task<object> GetAllPersonsData()
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_get_all_data",
               commandType: CommandType.StoredProcedure);

            var data = reader.Read<object>();

            return data;
        }

        public async Task<object> GetPersonEducation(string id)
        {
            //var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_get_education",
            //    new { id }, commandType: CommandType.StoredProcedure);

            //var personEducation = reader.Read<PersonEducation>().AsList();

            //return personEducation;

            var reader = _context.Database.GetDbConnection().QueryMultiple("dbo.PERSON_get_education",
               new { id }, commandType: CommandType.StoredProcedure);

            var allData = new Dictionary<string, object>();

            var mainInfo = reader.Read<PersonEducation>().ToList();

            if (mainInfo.Count > 0)
            {
                allData.Add("mainInfo", mainInfo);

                var files = reader.Read<dynamic>().ToList();
                allData.Add("files", files);
            }

            return allData;
        }

        public async Task<List<PersonFamilyMember>> GetPersonFamilyMembers(string id)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_get_family_members",
                new { id }, commandType: CommandType.StoredProcedure);

            var personFamilyMembers = reader.Read<PersonFamilyMember>().AsList();

            return personFamilyMembers;
        }

        public async Task<object> GetPersonCareer(string id)
        {
            //var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_get_career",
            //    new { id }, commandType: CommandType.StoredProcedure);

            //var personCareer = reader.Read<object>().AsList();

            //return personCareer;

            var reader = _context.Database.GetDbConnection().QueryMultiple("dbo.PERSON_get_career",
               new { id }, commandType: CommandType.StoredProcedure);

            var allData = new Dictionary<string, object>();

            var mainInfo = reader.Read<PersonCareer>().ToList();

            if (mainInfo.Count > 0)
            {
                allData.Add("mainInfo", mainInfo);

                var files = reader.Read<dynamic>().ToList();
                allData.Add("files", files);
            }

            return allData;
        }

        public async Task<object> GetPersonFinancialSolvency(string id, string eventIdentifier)
        {
            //var reader = await _context.Database.GetDbConnection().QueryAsync("dbo.PERSON_get_financial_solvency",
            //    new { id, eventIdentifier }, commandType: CommandType.StoredProcedure);

            //var financial = reader.FirstOrDefault<object>();

            //return financial;


            var reader = _context.Database.GetDbConnection().QueryMultiple("dbo.PERSON_get_financial_solvency",
                new { id, eventIdentifier }, commandType: CommandType.StoredProcedure);

            var allData = new Dictionary<string, object>();

            var mainInfo = reader.Read<PersonFinancialSolvency>().ToList();

            if (mainInfo.Count > 0)
            {
                allData.Add("mainInfo", mainInfo[0]);

                var files = reader.Read<dynamic>().ToList();
                allData.Add("files", files);
            }

            return allData;
        }

        public async Task<object> GetPersonAllFinancialSolvency(string id)
        {
            //var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_get_all_financial_solvency",
            //    new { id }, commandType: CommandType.StoredProcedure);

            //var financial = reader.Read<object>().AsList();

            //return financial;

            var reader = _context.Database.GetDbConnection().QueryMultiple("dbo.PERSON_get_all_financial_solvency",
                new { id }, commandType: CommandType.StoredProcedure);

            var allData = new Dictionary<string, object>();

            var mainInfo = reader.Read<PersonFinancialSolvency>().ToList();

            if (mainInfo.Count > 0)
            {
                allData.Add("mainInfo", mainInfo);

                var files = reader.Read<dynamic>().ToList();
                allData.Add("files", files);
            }

            return allData;
        }

        public async Task<List<object>> GetPersonAffiliations(string id)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.COMPANY_get_affiliations",
                new { id }, commandType: CommandType.StoredProcedure);

            var personAffiliations = reader.Read<object>().AsList();

            return personAffiliations;
        }

        public async Task<object> GetPersonNegativeInfo(string id, string eventIdentifier)
        {
            //var reader = await _context.Database.GetDbConnection().QueryAsync("dbo.PERSON_get_negative_info",
            //    new { id, eventIdentifier }, commandType: CommandType.StoredProcedure);

            //var negative = reader.FirstOrDefault<object>();

            //return negative;


            var reader = _context.Database.GetDbConnection().QueryMultiple("dbo.PERSON_get_negative_info",
                new { id, eventIdentifier }, commandType: CommandType.StoredProcedure);

            var negative = new Dictionary<string, object>();

            var mainInfo = reader.Read<PersonNegativeInfo>().ToList();

            if (mainInfo.Count > 0)
            {
                negative.Add("mainInfo", mainInfo[0]);

                var files = reader.Read<dynamic>().ToList();
                negative.Add("files", files);
            }

            return negative;
        }

        public async Task<object> GetPersonAllNegativeInfo(string id)
        {
            //var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_get_all_negative_info",
            //    new { id }, commandType: CommandType.StoredProcedure);

            //var negative = reader.Read<object>().AsList();

            //return negative;

            var reader = _context.Database.GetDbConnection().QueryMultiple("dbo.PERSON_get_all_negative_info",
                new { id }, commandType: CommandType.StoredProcedure);

            var allData = new Dictionary<string, object>();

            var mainInfo = reader.Read<PersonNegativeInfo>().ToList();

            if (mainInfo.Count > 0)
            {
                allData.Add("mainInfo", mainInfo);

                var files = reader.Read<dynamic>().ToList();
                allData.Add("files", files);
            }

            return allData;
        }


        public async Task<string> AddPerson(PersonBaseInfo person)
        {
            person.birthdate = person.birthdate.HasValue ? person.birthdate.Value.AddDays(1) : null;

            var reader = await _context.Database.GetDbConnection().QueryAsync<Identifier>("dbo.PERSON_add_new",
                new { 
                    person.last_name,
                    person.first_name, 
                    person.middle_name, 
                    birthdate = person.birthdate,
                    birthplace = person.birthplace != null ? person.birthplace : "нет сведений",
                    identification = person.identification != null ? person.identification : "нет сведений",
                    person.iin, 
                    person.citizenship,
                    person.family_status,
                    phone_number = person.phone_number != null ? person.phone_number : "нет сведений",
                    person.legal_address,
                    person.actual_address
                }, commandType: CommandType.StoredProcedure);

            var id = reader.FirstOrDefault<Identifier>().identifier;

            return id;
        }

        public async Task AddPersonEducation(PersonEducation education)
        {
            education.end_date = education.end_date.HasValue ? education.end_date.Value.AddDays(1) : null;

            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_add_education",
                    new
                    {
                        education.identifier,
                        edu_type = education.education_type,
                        edu_name = education.edu_institution_name,
                        start_date = education.start_date.AddDays(1),
                        end_date = education.end_date,
                        education.specialization,
                        education.qualification
                    }, commandType: CommandType.StoredProcedure);
        }

        public async Task AddPersonFamilyMember(PersonFamilyMember familyMember)
        {
            familyMember.birthdate = familyMember.birthdate.HasValue ? familyMember.birthdate.Value.AddDays(1) : null;

            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_add_family_member",
                new 
                {
                    familyMember.identifier,
                    familyMember.last_name,
                    familyMember.first_name,
                    familyMember.middle_name,
                    birthdate = familyMember.birthdate,
                    familyMember.iin,
                    familyMember.work_place,
                    familyMember.family_status,
                }, commandType: CommandType.StoredProcedure);
        }

        public async Task AddPersonCareer(PersonCareer personCareer)
        {
            personCareer.end_date = personCareer.end_date.HasValue ? personCareer.end_date.Value.AddDays(1) : null;
           
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_add_career",
                new
                {
                    personCareer.identifier,
                    personCareer.company_name,
                    start_date = personCareer.start_date.AddDays(1),
                    end_date = personCareer.end_date,
                    personCareer.job_position,
                }, commandType: CommandType.StoredProcedure);
        }

        public async Task AddPersonFinancialSolvency(PersonFinancialSolvency finSolvency)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_add_financial_solvency",
                new
                {
                    finSolvency.identifier,
                    finSolvency.event_identifier,
                    tax_debt = finSolvency.tax_debt != "null" ? finSolvency.tax_debt : "нет данных",
                    enforcement_proceedings = finSolvency.enforcement_proceedings != "null" ? finSolvency.enforcement_proceedings : "нет данных",
                    KZ_departure_ban = finSolvency.KZ_departure_ban != "null" ? finSolvency.KZ_departure_ban : "нет данных",
                    legal_entity = finSolvency.legal_entity != "null" ? finSolvency.legal_entity : "нет данных",
                    court_cases = finSolvency.court_cases != "null" ? finSolvency.court_cases : "нет данных",
                    negative_info = finSolvency.negative_info != "null" ? finSolvency.negative_info : "нет данных"
                }, commandType: CommandType.StoredProcedure);

            reader.Dispose();
        }

        public async Task SaveFinancialDocumentsPath(string identifier, List<string> finSolvency, string inputType, string eventIdentifier)
        {
            foreach (var filePath in finSolvency)
            {
                var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_save_financial_documents_path",
                new
                {
                    identifier,
                    eventIdentifier,
                    inputType,
                    filePath
                }, commandType: CommandType.StoredProcedure);

                reader.Dispose();
            }
        }

        public async Task AddPersonAffiliations(PersonAffiliation affiliation)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_add_affiliations",
               new
               {
                   affiliation.Identifier,
                   affiliation.AffIdentifier,
                   affiliation.AffType
               }, commandType: CommandType.StoredProcedure);
        }

        public async Task AddPersonNegativeInfo(PersonNegativeInfo negative)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_add_negative_info",
                new
                {
                    negative.identifier,
                    negative.event_identifier,
                    erdr_info = negative.erdr_info != "null" ? negative.erdr_info : "нет данных",
                    criminal_offense = negative.criminal_offense != "null" ? negative.criminal_offense : "нет данных",
                    disengagement = negative.disengagement != "null" ? negative.disengagement : "нет данных",
                    administrative_responsibility = negative.administrative_responsibility != "null" ? negative.administrative_responsibility : "нет данных",
                    unreimbursed_damage = negative.unreimbursed_damage != "null" ? negative.unreimbursed_damage : "нет данных",
                    presense_of_family_ties = negative.presense_of_family_ties != "null" ? negative.presense_of_family_ties : "нет данных",
                    presence_of_disciplinary_action = negative.presence_of_disciplinary_action != "null" ? negative.presence_of_disciplinary_action : "нет данных",
                    suspension_from_work = negative.suspension_from_work != "null" ? negative.suspension_from_work : "нет данных",
                    termination_of_contract = negative.termination_of_contract != "null" ? negative.termination_of_contract : "нет данных",
                    criminal_record = negative.criminal_record != "null" ? negative.criminal_record : "нет данных",
                    criminal_remission = negative.criminal_remission != "null" ? negative.criminal_remission : "нет данных",
                    personal_sanctions = negative.personal_sanctions != "null" ? negative.personal_sanctions : "нет данных",
                    db_data_check = negative.db_data_check != "null" ? negative.db_data_check : "нет данных",
                    police_data_check = negative.police_data_check != "null" ? negative.police_data_check : "нет данных",
                    family_negative_info = negative.family_negative_info != "null" ? negative.family_negative_info : "нет данных"
                }, commandType: CommandType.StoredProcedure);

            reader.Dispose();
        }

        public async Task SaveNegativeDocumentsPath(string identifier, List<string> negative, string inputType, string eventIdentifier)
        {
            foreach (var filePath in negative)
            {
                var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_save_negative_files_path",
                new
                {
                    identifier,
                    eventIdentifier,
                    inputType,
                    filePath
                }, commandType: CommandType.StoredProcedure);

                reader.Dispose();
            }
        }

        public async Task UpdatePerson(PersonBaseInfo person)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_update_info",
                new
                {
                    person.identifier,
                    person.last_name,
                    person.first_name,
                    person.middle_name,
                    person.birthdate,
                    person.birthplace,
                    person.identification,
                    person.iin,
                    person.citizenship,
                    person.family_status,
                    person.phone_number,
                    person.legal_address,
                    person.actual_address,
                }, commandType: CommandType.StoredProcedure);

            reader.Dispose();
        }

        public async Task UpdatePersonEducation(PersonEducation education)
        {
            education.end_date = education.end_date.HasValue ? education.end_date.Value.AddDays(1) : null;

            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_update_education",
                new
                {
                    education.id,
                    education.identifier,
                    edu_type = education.education_type,
                    edu_name = education.edu_institution_name,
                    start_date = education.start_date.AddDays(1),
                    end_date = education.end_date,
                    education.specialization,
                    education.qualification
                }, commandType: CommandType.StoredProcedure);
        }

        public async Task UpdatePersonFamilyMembers(PersonFamilyMember familyMember)
        {
            familyMember.birthdate = familyMember.birthdate.HasValue ? familyMember.birthdate.Value.AddDays(1) : null;

            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_update_family_member",
                new
                {
                    familyMember.id,
                    familyMember.identifier,
                    familyMember.last_name,
                    familyMember.first_name,
                    familyMember.middle_name,
                    birthdate = familyMember.birthdate,
                    familyMember.iin,
                    familyMember.work_place,
                    familyMember.family_status,
                }, commandType: CommandType.StoredProcedure);
        }

        public async Task UpdatePersonCareer(PersonCareer career)
        {
            career.end_date = career.end_date.HasValue ? career.end_date.Value.AddDays(1) : null;

            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_update_career",
                new
                {
                    career.id,
                    career.identifier,
                    career.company_name,
                    start_date = career.start_date.AddDays(1),
                    end_date = career.end_date,
                    career.job_position,
                }, commandType: CommandType.StoredProcedure);
        }

        public async Task UpdatePersonFinancialSolvency(PersonFinancialSolvency finSolvency)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_update_financial_solvency",
                new
                {
                    finSolvency.identifier,
                    finSolvency.event_identifier,
                    finSolvency.tax_debt,
                    finSolvency.enforcement_proceedings,
                    finSolvency.KZ_departure_ban,
                    finSolvency.legal_entity,
                    finSolvency.court_cases,
                    finSolvency.negative_info
                }, commandType: CommandType.StoredProcedure);

            reader.Dispose();
        }

        public async Task UpdatePersonNegativeInfo(PersonNegativeInfo negative)
        {
            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("dbo.PERSON_update_negative_info",
                new
                {
                    negative.identifier,
                    negative.event_identifier,
                    negative.erdr_info,
                    negative.criminal_offense,
                    negative.disengagement,
                    negative.administrative_responsibility,
                    negative.unreimbursed_damage,
                    negative.presense_of_family_ties,
                    negative.presence_of_disciplinary_action,
                    negative.suspension_from_work,
                    negative.termination_of_contract,
                    negative.criminal_record,
                    negative.criminal_remission,
                    negative.personal_sanctions,
                    negative.db_data_check,
                    negative.police_data_check,
                    negative.family_negative_info,
                }, commandType: CommandType.StoredProcedure);

            reader.Dispose();
        }
    }
}
