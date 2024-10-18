using Dapper;
using DVK.DataAccess;
using DVK.Helpers.FileUploader;
using DVK.Models;
using DVK.Models.Person;
using DVK.Repositories.Company;
using DVK.Repositories.Event;
using DVK.Repositories.Person;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PersonController : Controller
    {
        private readonly IPersonRepository _repo;
        private readonly IEventRepository _eventRepo;
        private readonly IFileService _upload;
        

        public PersonController(IPersonRepository repo, IEventRepository eventRepo, IFileService upload)
        {
            _repo = repo;
            _eventRepo = eventRepo;
            _upload = upload;
        }

        [Authorize]
        [HttpGet]
        public async Task<List<object>> GetAllPersons()
        {
            var persons = await _repo.GetAllPersons();

            return persons;
        }

        [Authorize]
        [HttpGet]
        public async Task<List<object>> GetAllCountries()
        {
            var countries = await _repo.GetAllCountries();

            return countries;
        }

        [Authorize]
        [HttpGet]
        public async Task<object> GetAllPersonsData()
        {
            var persons = await _repo.GetAllPersonsData();

            return persons;
        }

        [Authorize]
        [HttpGet]
        public async Task<object> GetPersonById(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var personInfo = await _repo.GetPersonById(id);

            return personInfo;
        }

        [Authorize]
        [HttpPost]
        public async Task<object> GetPersonAllDataById(PersonReportParams parameters)
        {
            if (parameters == null)
            {
                return BadRequest();
            }

            var personInfo = await _repo.GetPersonAllDataById(parameters.identifier, parameters.eventIdentifier);

            return personInfo;
        }

        [Authorize]
        [HttpGet]
        public async Task<object> GetPersonEducation(string id)
        {
            if (id == null || id == " ")
            {
                return BadRequest();
            }
            var personEducation = await _repo.GetPersonEducation(id);

            return Ok(personEducation);
        }
        
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetPersonFamilyMembers(string id)
        {
            if (id == null || id == " ")
            {
                return BadRequest();
            }
            var personFamilyMembers = await _repo.GetPersonFamilyMembers(id);

            return Ok(personFamilyMembers);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetPersonCareer(string id)
        {
            if (id == null || id == " ")
            {
                return BadRequest();
            }
            var personCareer = await _repo.GetPersonCareer(id);

            return Ok(personCareer);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetPersonFinancialSolvency(string id, string eventIdentifier)
        {
            if (id == null || eventIdentifier == null)
            {
                return BadRequest();
            }

            var financial = await _repo.GetPersonFinancialSolvency(id, eventIdentifier);

            return Ok(financial);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetPersonAllFinancialSolvency(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var financial = await _repo.GetPersonAllFinancialSolvency(id);

            return Ok(financial);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetPersonAffiliations(string id)
        {
            if (id == null || id == " ")
            {
                return BadRequest();
            }

            var personAffiliations = await _repo.GetPersonAffiliations(id);

            return Ok(personAffiliations);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetPersonNegativeInfo(string id, string eventIdentifier)
        {
            if (id == null || eventIdentifier == null)
            {
                return BadRequest();
            }

            var negative = await _repo.GetPersonNegativeInfo(id, eventIdentifier);

            return Ok(negative);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetPersonAllNegativeInfo(string id)
        {
            if (id == null)
            {
                return BadRequest();

            }
            var negative = await _repo.GetPersonAllNegativeInfo(id);

            return Ok(negative);

        }


        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddPerson([FromForm]PersonBaseInfo person)
        {
            if (person == null)
            {
                return BadRequest();
            }
            
            try
            {
                var ICF = await _upload.UploadFiles(person.identity_card_files);
                var QF = await _upload.UploadFiles(person.questionary_files);
                var APF = await _upload.UploadFiles(person.application_files);
                var ADF = await _upload.UploadFiles(person.additional_files);

                string id = await _repo.AddPerson(person);

                if (person.event_identifier != null)
                {
                    await _eventRepo.UpdateEventSubject(person.event_identifier, id);
                }

                if (ICF != null)
                {
                    person.identity_card_fileNames = ICF;
                    await _upload.SaveFilePath(id, person.identity_card_fileNames, "identity_card", "");
                }
                if (QF != null)
                {
                    person.questionary_fileNames = QF;
                    await _upload.SaveFilePath(person.identifier, person.questionary_fileNames, "questionary", "");
                }
                if (APF != null)
                {
                    person.application_fileNames = APF;
                    await _upload.SaveFilePath(id, person.application_fileNames, "application", "");
                }
                if (ADF != null)
                {
                    person.additional_fileNames = ADF;
                    await _upload.SaveFilePath(id, person.additional_fileNames, "additional", "");
                }

                return Ok(id);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }

            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddPersonEducation(PersonEducation education)
        {
            if (education == null)
            {
                return BadRequest();
            }

            try
            {
                await _repo.AddPersonEducation(education);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }

            return Ok();
        }
        

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddPersonFamilyMember(PersonFamilyMember personFamilyMember)
        {
            if (personFamilyMember == null)
            {
                return BadRequest();
            }

            try
            {
                await _repo.AddPersonFamilyMember(personFamilyMember);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }

            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddPersonCareer(PersonCareer personCareer)
        {
            if (personCareer == null)
            {
                return BadRequest();
            }

            try
            {
                await _repo.AddPersonCareer(personCareer);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }

            return Ok();
        }


        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddPersonFinancialSolvency([FromForm]PersonFinancialSolvency finSolvency)
        {
            if (finSolvency == null)
            {
                return BadRequest();
            }

            try
            {
                var TDF = await _upload.UploadFiles(finSolvency.tax_debt_files);
                var EPF = await _upload.UploadFiles(finSolvency.enforcement_proceedings_files);
                var LE = await _upload.UploadFiles(finSolvency.legal_entity_files);
                var KZDBF = await _upload.UploadFiles(finSolvency.KZ_departure_ban_files);
                var CCF = await _upload.UploadFiles(finSolvency.court_cases_files);
                var NIF = await _upload.UploadFiles(finSolvency.negative_info_files);

                await _repo.AddPersonFinancialSolvency(finSolvency);

                if (TDF != null)
                {
                    finSolvency.tax_debt_fileNames = TDF;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.tax_debt_fileNames, "tax_debt", finSolvency.event_identifier);
                }
                if (LE != null)
                {
                    finSolvency.legal_entity_fileNames = LE;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.legal_entity_fileNames, "legal_entity", finSolvency.event_identifier);
                }
                if (EPF != null)
                {
                    finSolvency.enforcement_proceedings_fileNames = EPF;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.enforcement_proceedings_fileNames, "enforcement_proceedings", finSolvency.event_identifier);
                }
                if (KZDBF != null)
                {
                    finSolvency.KZ_departure_ban_fileNames = KZDBF;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.KZ_departure_ban_fileNames, "KZ_departure_ban", finSolvency.event_identifier);
                }
                if (CCF != null)
                {
                    finSolvency.court_cases_fileNames = CCF;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.court_cases_fileNames, "court_cases", finSolvency.event_identifier);
                }
                if (NIF != null)
                {
                    finSolvency.negative_info_fileNames = NIF;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.negative_info_fileNames, "negative_info", finSolvency.event_identifier);
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }

            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddPersonAffiliations(PersonAffiliation affiliation)
        {
            if (affiliation.Identifier == null || affiliation.AffIdentifier == null)
            {
                return BadRequest();
            }

            try
            {
                await _repo.AddPersonAffiliations(affiliation);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddPersonNegativeInfo([FromForm]PersonNegativeInfo negativeInfo)
        {
            if (negativeInfo == null)
            {
                return BadRequest();
            }

            try
            {
                var EIF = await _upload.UploadFiles(negativeInfo.erdr_info_files);
                var COF = await _upload.UploadFiles(negativeInfo.criminal_offense_files);
                var ARF = await _upload.UploadFiles(negativeInfo.administrative_responsibility_files);
                var DF = await _upload.UploadFiles(negativeInfo.disengagement_files);
                var UDF = await _upload.UploadFiles(negativeInfo.unreimbursed_damage_files);
                var POFTF = await _upload.UploadFiles(negativeInfo.presense_of_family_ties_files);
                var PODAF = await _upload.UploadFiles(negativeInfo.presence_of_disciplinary_action_files);
                var SFWF = await _upload.UploadFiles(negativeInfo.suspension_from_work_files);
                var TOCF = await _upload.UploadFiles(negativeInfo.termination_of_contract_files);
                var CR = await _upload.UploadFiles(negativeInfo.criminal_record_files);
                var CRR = await _upload.UploadFiles(negativeInfo.criminal_remission_files);
                var PS = await _upload.UploadFiles(negativeInfo.personal_sanctions_files);
                var DDC = await _upload.UploadFiles(negativeInfo.db_data_check_files);
                var PDC = await _upload.UploadFiles(negativeInfo.police_data_check_files);
                var FN = await _upload.UploadFiles(negativeInfo.family_negative_info_files);


                await _repo.AddPersonNegativeInfo(negativeInfo);

                if (EIF != null)
                {
                    negativeInfo.erdr_info_fileNames = EIF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.erdr_info_fileNames, "erdr_info", negativeInfo.event_identifier);
                }
                if (COF != null)
                {
                    negativeInfo.criminal_offense_fileNames = COF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.criminal_offense_fileNames, "criminal_offense", negativeInfo.event_identifier);
                }
                if (ARF != null)
                {
                    negativeInfo.administrative_responsibility_fileNames = ARF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.administrative_responsibility_fileNames, "administrative_responsibility", negativeInfo.event_identifier);
                }
                if (DF != null)
                {
                    negativeInfo.disengagement_fileNames = DF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.disengagement_fileNames, "disengagement", negativeInfo.event_identifier);
                }
                if (UDF != null)
                {
                    negativeInfo.unreimbursed_damage_fileNames = UDF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.unreimbursed_damage_fileNames, "unreimbursed_damage", negativeInfo.event_identifier);
                }
                if (POFTF != null)
                {
                    negativeInfo.presense_of_family_ties_fileNames = POFTF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.presense_of_family_ties_fileNames, "presense_of_family_ties", negativeInfo.event_identifier);
                }
                if (PODAF != null)
                {
                    negativeInfo.presence_of_disciplinary_action_fileNames = PODAF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.presence_of_disciplinary_action_fileNames, "presense_of_disciplinary_action", negativeInfo.event_identifier);
                }
                if (SFWF != null)
                {
                    negativeInfo.suspension_from_work_fileNames = SFWF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.suspension_from_work_fileNames, "suspension_from_work", negativeInfo.event_identifier);
                }
                if (TOCF != null)
                {
                    negativeInfo.termination_of_contract_fileNames = TOCF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.termination_of_contract_fileNames, "termination_of_contract", negativeInfo.event_identifier);
                }
                if (CR != null)
                {
                    negativeInfo.criminal_record_fileNames = CR;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.criminal_record_fileNames, "criminal_record", negativeInfo.event_identifier);
                }
                if (CRR != null)
                {
                    negativeInfo.criminal_remission_fileNames = CRR;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.criminal_record_fileNames, "criminal_remission", negativeInfo.event_identifier);
                }
                if (PS != null)
                {
                    negativeInfo.personal_sanctions_fileNames = PS;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.personal_sanctions_fileNames, "personal_sanctions", negativeInfo.event_identifier);
                }
                if (DDC != null)
                {
                    negativeInfo.db_data_check_fileNames = DDC;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.db_data_check_fileNames, "db_data_check", negativeInfo.event_identifier);
                }
                if (PDC != null)
                {
                    negativeInfo.police_data_check_fileNames = PDC;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.police_data_check_fileNames, "police_data_check", negativeInfo.event_identifier);
                }
                if (FN != null)
                {
                    negativeInfo.family_negative_info_fileNames = FN;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.family_negative_info_fileNames, "family_negative_info", negativeInfo.event_identifier);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return Ok();
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdatePerson([FromForm]PersonBaseInfo person)
        {
            if (person == null)
            {
                return BadRequest();
            }

            try
            {
                var ICF = await _upload.UploadFiles(person.identity_card_files);
                var QF = await _upload.UploadFiles(person.questionary_files);
                var APF = await _upload.UploadFiles(person.application_files);
                var ADF = await _upload.UploadFiles(person.additional_files);

                await _repo.UpdatePerson(person);

                if (ICF != null)
                {
                    person.identity_card_fileNames = ICF;
                    await _upload.SaveFilePath(person.identifier, person.identity_card_fileNames, "identity_card", "");
                }
                if (QF != null)
                {
                    person.questionary_fileNames = QF;
                    await _upload.SaveFilePath(person.identifier, person.questionary_fileNames, "questionary", "");
                }
                if (APF != null)
                {
                    person.application_fileNames = APF;
                    await _upload.SaveFilePath(person.identifier, person.application_fileNames, "application", "");
                }
                if (ADF != null)
                {
                    person.additional_fileNames = ADF;
                    await _upload.SaveFilePath(person.identifier, person.additional_fileNames, "additional", "");
                }
            }
            catch (Exception ex) 
            {
                Console.WriteLine(ex.Message);
            }

            return Ok();
        }


        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdatePersonEducation(PersonEducation education)
        {
            if (education == null)
            {
                return BadRequest();
            }

            await _repo.UpdatePersonEducation(education);

            return Ok();
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdatePersonFamilyMember(PersonFamilyMember member)
        {
            if (member == null)
            {
                return BadRequest();
            }

            await _repo.UpdatePersonFamilyMembers(member);

            return Ok();
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdatePersonCareer(PersonCareer career)
        {
            if (career == null)
            {
                return BadRequest();
            }

            await _repo.UpdatePersonCareer(career);

            return Ok();
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdatePersonFinancialSolvency([FromForm]PersonFinancialSolvency finSolvency)
        {
            if (finSolvency == null)
            {
                return BadRequest();
            }

           
            try
            {
                var TDF = await _upload.UploadFiles(finSolvency.tax_debt_files);
                var EPF = await _upload.UploadFiles(finSolvency.enforcement_proceedings_files);
                var LE = await _upload.UploadFiles(finSolvency.legal_entity_files);
                var KZDBF = await _upload.UploadFiles(finSolvency.KZ_departure_ban_files);
                var CCF = await _upload.UploadFiles(finSolvency.court_cases_files);
                var NIF = await _upload.UploadFiles(finSolvency.negative_info_files);
                
                
                await _repo.UpdatePersonFinancialSolvency(finSolvency);

                if (TDF != null)
                {
                    finSolvency.tax_debt_fileNames = TDF;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.tax_debt_fileNames, "tax_debt", finSolvency.event_identifier);
                }
                if (LE != null)
                {
                    finSolvency.legal_entity_fileNames = LE;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.tax_debt_fileNames, "legal_entity", finSolvency.event_identifier);
                }
                if (EPF != null)
                {
                    finSolvency.enforcement_proceedings_fileNames = EPF;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.enforcement_proceedings_fileNames, "enforcement_proceedings", finSolvency.event_identifier);
                }
                if (KZDBF != null)
                {
                    finSolvency.KZ_departure_ban_fileNames = KZDBF;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.KZ_departure_ban_fileNames, "KZ_departure_ban", finSolvency.event_identifier);
                }
                if (CCF != null)
                {
                    finSolvency.court_cases_fileNames = CCF;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.court_cases_fileNames, "court_cases", finSolvency.event_identifier);
                }
                if (NIF != null)
                {
                    finSolvency.negative_info_fileNames = NIF;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.negative_info_fileNames, "negative_info", finSolvency.event_identifier);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return Ok();
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdatePersonNegativeInfo([FromForm]PersonNegativeInfo negativeInfo)
        {
            if (negativeInfo == null)
            {
                return BadRequest();
            }

            try
            {
                var EIF = await _upload.UploadFiles(negativeInfo.erdr_info_files);
                var COF = await _upload.UploadFiles(negativeInfo.criminal_offense_files);
                var ARF = await _upload.UploadFiles(negativeInfo.administrative_responsibility_files);
                var DF = await _upload.UploadFiles(negativeInfo.disengagement_files);
                var UDF = await _upload.UploadFiles(negativeInfo.unreimbursed_damage_files);
                var POFTF = await _upload.UploadFiles(negativeInfo.presense_of_family_ties_files);
                var PODAF = await _upload.UploadFiles(negativeInfo.presence_of_disciplinary_action_files);
                var SFWF = await _upload.UploadFiles(negativeInfo.suspension_from_work_files);
                var TOCF = await _upload.UploadFiles(negativeInfo.termination_of_contract_files);
                var CR = await _upload.UploadFiles(negativeInfo.criminal_record_files);
                var CRR = await _upload.UploadFiles(negativeInfo.criminal_remission_files);
                var PS = await _upload.UploadFiles(negativeInfo.personal_sanctions_files);
                var DDC = await _upload.UploadFiles(negativeInfo.db_data_check_files);
                var PDC = await _upload.UploadFiles(negativeInfo.police_data_check_files);
                var FN = await _upload.UploadFiles(negativeInfo.family_negative_info_files);


                await _repo.UpdatePersonNegativeInfo(negativeInfo);

                if (EIF != null)
                {
                    negativeInfo.erdr_info_fileNames = EIF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.erdr_info_fileNames, "erdr_info", negativeInfo.event_identifier);
                }
                if (COF != null)
                {
                    negativeInfo.criminal_offense_fileNames = COF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.criminal_offense_fileNames, "criminal_offense", negativeInfo.event_identifier);
                }
                if (ARF != null)
                {
                    negativeInfo.administrative_responsibility_fileNames = ARF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.administrative_responsibility_fileNames, "administrative_responsibility", negativeInfo.event_identifier);
                }
                if (DF != null)
                {
                    negativeInfo.disengagement_fileNames = DF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.disengagement_fileNames, "disengagement", negativeInfo.event_identifier);
                }
                if (UDF != null)
                {
                    negativeInfo.unreimbursed_damage_fileNames = UDF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.unreimbursed_damage_fileNames, "unreimbursed_damage", negativeInfo.event_identifier);
                }
                if (POFTF != null)
                {
                    negativeInfo.presense_of_family_ties_fileNames = POFTF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.presense_of_family_ties_fileNames, "presense_of_family_ties", negativeInfo.event_identifier);
                }
                if (PODAF != null)
                {
                    negativeInfo.presence_of_disciplinary_action_fileNames = PODAF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.presence_of_disciplinary_action_fileNames, "presense_of_disciplinary_action", negativeInfo.event_identifier);
                }
                if (SFWF != null)
                {
                    negativeInfo.suspension_from_work_fileNames = SFWF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.suspension_from_work_fileNames, "suspension_from_work", negativeInfo.event_identifier);
                }
                if (TOCF != null)
                {
                    negativeInfo.termination_of_contract_fileNames = TOCF;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.termination_of_contract_fileNames, "termination_of_contract", negativeInfo.event_identifier);
                }
                if (CR != null)
                {
                    negativeInfo.criminal_record_fileNames = CR;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.criminal_record_fileNames, "criminal_record", negativeInfo.event_identifier);
                }
                if (CRR != null)
                {
                    negativeInfo.criminal_remission_fileNames = CRR;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.criminal_record_fileNames, "criminal_record", negativeInfo.event_identifier);
                }
                if (PS != null)
                {
                    negativeInfo.personal_sanctions_fileNames = PS;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.personal_sanctions_fileNames, "personal_sanctions", negativeInfo.event_identifier);
                }
                if (DDC != null)
                {
                    negativeInfo.db_data_check_fileNames = DDC;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.db_data_check_fileNames, "db_data_check", negativeInfo.event_identifier);
                }
                if (PDC != null)
                {
                    negativeInfo.police_data_check_fileNames = PDC;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.police_data_check_fileNames, "police_data_check", negativeInfo.event_identifier);
                }
                if (FN != null)
                {
                    negativeInfo.family_negative_info_fileNames = FN;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.family_negative_info_fileNames, "family_negative_info", negativeInfo.event_identifier);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            //if (DDC != null)
            //{
            //    negativeInfo.db_data_check_fileNames = DDC;
            //    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.db_data_check_fileNames, "db_data_check", negativeInfo.event_identifier);
            //}
            //if (PDC != null)
            //{
            //    negativeInfo.police_data_check_fileNames = PDC;
            //    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.police_data_check_fileNames, "police_data_check", negativeInfo.event_identifier);
            //}
            //if (FN != null)
            //{
            //    negativeInfo.family_negative_info_fileNames = FN;
            //    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.family_negative_info_fileNames, "family_negative_info", negativeInfo.event_identifier);
            //}

            return Ok();
        }

    }
}
