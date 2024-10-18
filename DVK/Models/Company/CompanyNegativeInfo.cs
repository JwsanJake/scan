using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Company
{
    public class CompanyNegativeInfo
    {
        public string identifier { get; set; }
        public string event_identifier { get; set; }
        public string management_negative_info { get; set; }
        public string harm_to_companies_interests { get; set; }
        public string international_sanctions { get; set; }
        public string judicial_executive_authorities_sanctions { get; set; }
        public string misrepresentations { get; set; }
        public string anticorruption_reservation { get; set; }
        public string inconsistency_of_contract_conditions { get; set; }
        public string inconsistency_of_corporation_requirements { get; set; }


        public List<IFormFile> management_negative_info_files { get; set; }
        public List<string> management_negative_info_fileNames { get; set; } 
        public List<IFormFile> harm_to_companies_interests_files { get; set; }
        public List<string> harm_to_companies_interests_fileNames { get; set; }
        public List<IFormFile> international_sanctions_files { get; set; }
        public List<string> international_sanctions_fileNames { get; set; }
        public List<IFormFile> judicial_executive_authorities_sanctions_files { get; set; }
        public List<string> judicial_executive_authorities_sanctions_fileNames { get; set; }
        public List<IFormFile> misrepresentations_files { get; set; }
        public List<string> misrepresentations_fileNames { get; set; }
        public List<IFormFile> anticorruption_reservation_files { get; set; }
        public List<string> anticorruption_reservation_fileNames { get; set; }
        public List<IFormFile> inconsistency_of_contract_conditions_files { get; set; }
        public List<string> inconsistency_of_contract_conditions_fileNames { get; set; }
        public List<IFormFile> inconsistency_of_corporation_requirements_files { get; set; }
        public List<string> inconsistency_of_corporation_requirements_fileNames { get; set; }

    }
}
