using DVK.Models;
using DVK.Models.Person;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace DVK.Repositories.Person
{
    public interface IPersonRepository
    {
        Task<List<object>> GetAllPersons();
        Task<List<object>> GetAllCountries();
        Task<object> GetPersonById(string id);
        Task<Dictionary<String, Object>> GetPersonAllDataById(string id, string eventId);
        Task<object> GetAllPersonsData();
        Task<object> GetPersonEducation(string id);
        Task<List<PersonFamilyMember>> GetPersonFamilyMembers(string id);
        Task<object> GetPersonCareer(string id);
        Task<object> GetPersonFinancialSolvency(string id, string eventIdentifier);
        Task<object> GetPersonAllFinancialSolvency(string id);
        Task<List<object>> GetPersonAffiliations(string id);
        
        Task<object> GetPersonNegativeInfo(string id, string eventIdentifier);
        Task<object> GetPersonAllNegativeInfo(string id);
        Task<string> AddPerson(PersonBaseInfo person);
        Task AddPersonEducation(PersonEducation education);
        Task AddPersonFamilyMember(PersonFamilyMember familyMember);
        Task AddPersonCareer(PersonCareer personCareer);
        Task AddPersonFinancialSolvency(PersonFinancialSolvency financialSolvency);
        Task SaveFinancialDocumentsPath(string identifier, List<string> finSolvency, string inputType, string eventIdentifier);
        Task AddPersonAffiliations(PersonAffiliation affiliation);
        Task AddPersonNegativeInfo(PersonNegativeInfo negativeInfo);
        Task SaveNegativeDocumentsPath(string identifier, List<string> negative, string inputType, string eventIdentifier);
        Task UpdatePerson(PersonBaseInfo person);
        Task UpdatePersonEducation(PersonEducation education);
        Task UpdatePersonFamilyMembers(PersonFamilyMember familyMember);
        Task UpdatePersonCareer(PersonCareer career);
        Task UpdatePersonFinancialSolvency(PersonFinancialSolvency finSolvency);
        Task UpdatePersonNegativeInfo(PersonNegativeInfo negative);
    }
}
