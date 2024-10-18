using DVK.Helpers.FileUploader;
using DVK.Models;
using DVK.Models.Company;
using DVK.Repositories.Company;
using DVK.Repositories.Event;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CompanyController : Controller
    {
        private readonly ICompanyRepository _repo;
        private readonly IEventRepository _eventRepo;
        private readonly IFileService _upload;

        public CompanyController(ICompanyRepository repo, IEventRepository eventRepo, IFileService upload)
        {
            _repo = repo;
            _eventRepo = eventRepo; 
            _upload = upload;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetAllCompanies()
        {
            var companies = await _repo.GetAllCompanies();

            return Ok(companies);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetCompanyById(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var company = await _repo.GetCompanyById(id);

            return Ok(company);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetCompanyDirectorById(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var director = await _repo.GetDirectorById(id);

            return Ok(director);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetCompanyOwnersById(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var owners = await _repo.GetCompanyOwnersById(id);

            return Ok(owners);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> GetCompanyAllDataById(CompanyReportParams parameters)
        {
            if (parameters == null)
            {
                return BadRequest();
            }

            var allData = await _repo.GetCompanyAllDataById(parameters.identifier, parameters.eventId);

            return Ok(allData);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetCompanyActivities(string id)
        {
            var activities = await _repo.GetCompanyActivities(id);

            return Ok(activities);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetCompanyLicenses(string id)
        {
            var licenses = await _repo.GetCompanyLicenses(id);

            return Ok(licenses);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetCompanyFinancialSolvency(string id, string eventIdentifier)
        {
        
            if (id == null )
            {
                return BadRequest();
            }

            var financial = await _repo.GetCompanyFinancialSolvency(id, eventIdentifier);

          

            return Ok(financial);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetCompanyAllFinancialSolvency(string id)
        {

            if (id == null)
            {
                return BadRequest();
            }

            var financial = await _repo.GetCompanyAllFinancialSolvency(id);



            return Ok(financial);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetCompanyAffiliationsById(string id)
        {
            var affiliations = await _repo.GetCompanyAffiliationsById(id);

            return Ok(affiliations);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetCompanyNegativeInfo(string id, string eventIdentifier)
        {
            if (id == null || eventIdentifier == null)
            {
                return BadRequest();
            }

            var negative = await _repo.GetCompanyNegativeInfo(id, eventIdentifier);

            return Ok(negative);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetCompanyAllNegativeInfo(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var negative = await _repo.GetCompanyAllNegativeInfo(id);

            return Ok(negative);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetCompanyEvents(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var events = await _repo.GetCompanyEvents(id);

            return Ok(events);
        }

            
        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddCompany([FromForm]CompanyBaseInfo company)
        {
            string id = null;
            try
            {

                //if (company.manufacture_doc_file != null)
                //{
                //    company.manufacture_doc_path = await _upload.UploadFiles(company.manufacture_doc_file);
                //}

                //if (company.dealer_doc_file != null)
                //{
                //    company.dealer_doc_path = await _upload.UploadFiles(company.dealer_doc_file);
                //}
                var MDF = await _upload.UploadFiles(company.manufacture_doc_files);
                var DDF = await _upload.UploadFiles(company.dealer_doc_files);
                var CCF = await _upload.UploadFiles(company.company_form_files);
                var CF = await _upload.UploadFiles(company.constituent_files);
                var RF = await _upload.UploadFiles(company.reference_files);
                var RCF = await _upload.UploadFiles(company.registration_certificate_files);
                var CAF = await _upload.UploadFiles(company.company_additional_files);

                id = await _repo.AddCompany(company);
                company.identifier = id;

                if (MDF != null)
                {
                    company.manufacture_doc_fileNames = MDF;
                    await _upload.SaveFilePath(company.identifier, company.manufacture_doc_fileNames, "manufacture", "");
                }
                if (DDF != null)
                {
                    company.dealer_doc_fileNames = DDF;
                    await _upload.SaveFilePath(company.identifier, company.dealer_doc_fileNames, "dealer", "");
                }
                if (CCF != null)
                {
                    company.company_form_fileNames = CCF;
                    await _upload.SaveFilePath(company.identifier, company.company_form_fileNames, "company_form", "");
                }
                if (CF != null)
                {
                    company.constituent_fileNames = CF;
                    await _upload.SaveFilePath(company.identifier, company.constituent_fileNames, "constituent", "");
                }
                if (RF != null)
                {
                    company.reference_fileNames = RF;
                    await _upload.SaveFilePath(company.identifier, company.reference_fileNames, "reference", "");
                }
                if (RCF != null)
                {
                    company.registration_certificate_fileNames = RCF;
                    await _upload.SaveFilePath(company.identifier, company.registration_certificate_fileNames, "registration_certificate", "");
                }
                if (CAF != null)
                {
                    company.company_additional_fileNames = CAF;
                    await _upload.SaveFilePath(company.identifier, company.company_additional_fileNames, "company_additional", "");
                }

                if (company.event_identifier != null)
                {
                    await _eventRepo.UpdateEventSubject(company.event_identifier, id);
                }

                if (company.KindOfActivities != null)
                {
                    await _repo.AddCompanyActivities(company);
                }
                if (company.Licenses != null)
                {
                    await _repo.AddCompanyLicenses(company);
                }
                
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return Ok(id);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddCompanyOwner(CompanyOwner owner)
        {
            if (owner.identifier == null || owner.parentId == null)
            {
                return BadRequest();
            }

            try
            {
                await _repo.AddCompanyOwner(owner);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            
            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddCompanyDirector(CompanyDirector director)
        {
            if (director.identifier == null || director.parentId == null)
            {
                return BadRequest();
            }

            try
            {
                await _repo.AddCompanyDirector(director);
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddCompanyAffiliations(CompanyAffiliation affiliations)
        {
            if (affiliations.identifier == null || affiliations.parentId == null)
            {
                return BadRequest();
            }

            try
            {
                await _repo.AddCompanyAffiliations(affiliations);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            
            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddCompanyFinancialSolvency([FromForm]CompanyFinancialSolvency finSolvency)
        {
            if (finSolvency == null)
            {
                return BadRequest();
            }

            try
            {
                var TPLY = await _upload.UploadFiles(finSolvency.tax_payment_last_year_files);
                var TDIF = await _upload.UploadFiles(finSolvency.tax_debt_info_files);
                var EPIF = await _upload.UploadFiles(finSolvency.enforcement_proceedings_info_files);
                var CCIF = await _upload.UploadFiles(finSolvency.court_cases_info_files);
                var CACI = await _upload.UploadFiles(finSolvency.criminal_administrative_сases_info_files);
                var UPSP = await _upload.UploadFiles(finSolvency.unscrupulous_participant_of_state_procurements_files);
                var ABB = await _upload.UploadFiles(finSolvency.arrest_of_bank_balance_files);
                var NIF = await _upload.UploadFiles(finSolvency.negative_info_files);

                await _repo.AddCompanyFinancialSolvency(finSolvency);

                if (TPLY != null)
                {
                    finSolvency.tax_payment_last_year_fileNames = TPLY;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.tax_payment_last_year_fileNames, "tax_payment_last_year", finSolvency.event_identifier);

                }

                if (TDIF != null)
                {
                    finSolvency.tax_debt_info_fileNames = TDIF;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.tax_debt_info_fileNames, "tax_debt", finSolvency.event_identifier);
                }

                if (EPIF != null)
                {
                    finSolvency.enforcement_proceedings_info_fileNames = EPIF;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.enforcement_proceedings_info_fileNames, "enforcement_proceedings", finSolvency.event_identifier);
                }
                if (CCIF != null)
                {
                    finSolvency.court_cases_info_fileNames = CCIF;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.court_cases_info_fileNames, "court_cases", finSolvency.event_identifier);
                }
                if (CACI != null)
                {
                    finSolvency.criminal_administrative_сases_info_fileNames = CACI;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.criminal_administrative_сases_info_fileNames, "criminal_administrative", finSolvency.event_identifier);
                }
                if (UPSP != null)
                {
                    finSolvency.unscrupulous_participant_of_state_procurements_fileNames = UPSP;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.unscrupulous_participant_of_state_procurements_fileNames, "unscrupulous_participant", finSolvency.event_identifier);
                }
                if (ABB != null)
                {
                    finSolvency.arrest_of_bank_balance_fileNames = ABB;
                    await _upload.SaveFilePath(finSolvency.identifier, finSolvency.arrest_of_bank_balance_fileNames, "arrest_of_bank_balance", finSolvency.event_identifier);
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
        [HttpPost]
        public async Task<ActionResult> AddCompanyNegativeInfo([FromForm]CompanyNegativeInfo negativeInfo)
        {
            if (negativeInfo == null)
            {
                return BadRequest();
            }

            try
            {
                var MNI = await _upload.UploadFiles(negativeInfo.management_negative_info_files);
                var HCI = await _upload.UploadFiles(negativeInfo.harm_to_companies_interests_files);
                var IS = await _upload.UploadFiles(negativeInfo.international_sanctions_files);
                var JEAS = await _upload.UploadFiles(negativeInfo.judicial_executive_authorities_sanctions_files);
                var M = await _upload.UploadFiles(negativeInfo.misrepresentations_files);
                var AR = await _upload.UploadFiles(negativeInfo.anticorruption_reservation_files);
                var ICC = await _upload.UploadFiles(negativeInfo.inconsistency_of_contract_conditions_files);
                var ICR = await _upload.UploadFiles(negativeInfo.inconsistency_of_corporation_requirements_files);

                await _repo.AddCompanyNegativeInfo(negativeInfo);

                if (MNI != null)
                {
                    negativeInfo.management_negative_info_fileNames = MNI;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.management_negative_info_fileNames, "management_negative_info", negativeInfo.event_identifier);
                }
                if (HCI != null)
                {
                    negativeInfo.harm_to_companies_interests_fileNames = HCI;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.harm_to_companies_interests_fileNames, "harm_to_companies_interests", negativeInfo.event_identifier);
                }
                if (IS != null)
                {
                    negativeInfo.international_sanctions_fileNames = IS;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.international_sanctions_fileNames, "international_sanctions", negativeInfo.event_identifier);
                }
                if (JEAS != null)
                {
                    negativeInfo.judicial_executive_authorities_sanctions_fileNames = JEAS;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.judicial_executive_authorities_sanctions_fileNames, "judicial_executive_authorities_sanctions", negativeInfo.event_identifier);
                }
                if (M != null)
                {
                    negativeInfo.misrepresentations_fileNames = M;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.misrepresentations_fileNames, "misrepresentations", negativeInfo.event_identifier);
                }
                if (AR != null)
                {
                    negativeInfo.anticorruption_reservation_fileNames = AR;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.anticorruption_reservation_fileNames, "anticorruption_reservation", negativeInfo.event_identifier);
                }
                if (ICC != null)
                {
                    negativeInfo.inconsistency_of_contract_conditions_fileNames = ICC;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.inconsistency_of_contract_conditions_fileNames, "inconsistency_of_contract_conditions", negativeInfo.event_identifier);
                }
                if (ICR != null)
                {
                    negativeInfo.inconsistency_of_corporation_requirements_fileNames = ICR;
                    await _upload.SaveFilePath(negativeInfo.identifier, negativeInfo.inconsistency_of_corporation_requirements_fileNames, "inconsistency_of_corporation_requirements", negativeInfo.event_identifier);
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
        public async Task<ActionResult> UpdateCompanyBaseInfo([FromForm]CompanyBaseInfo baseInfo)
        {
            if (baseInfo == null)
            {
                return BadRequest();
            }


            if (baseInfo.KindOfActivities != null)
            {
                await _repo.DeleteCompanyActivities(baseInfo.identifier);
                await _repo.AddCompanyActivities(baseInfo);
            }
            if (baseInfo.Licenses != null)
            {
                await _repo.DeleteCompanyLicense(baseInfo.identifier);
                await _repo.AddCompanyLicenses(baseInfo);
            }

            return Ok();
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateCompanyFinancialSolvency([FromForm]CompanyFinancialSolvency finSolvency)
        {
            if (finSolvency == null)
            {
                return BadRequest();
            }

            await _repo.UpdateCompanyFinancialSolvency(finSolvency);

            return Ok();
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateCompanyNegativeInfo([FromForm]CompanyNegativeInfo negative)
        {
            if (negative == null)
            {
                return BadRequest();
            }

            await _repo.UpdateCompanyNegativeInfo(negative);

            return Ok();
        }

    }
}
