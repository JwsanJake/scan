using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Company
{
    public class CompanyFinancialSolvency
    {
        public string identifier { get; set; }
        public string event_identifier { get; set; }
        public string tax_payment_last_year { get; set; }
        public string tax_debt_info { get; set; }
        public string enforcement_proceedings_info { get; set; }
        public string court_cases_info { get; set; }
        public string criminal_administrative_cases_info { get; set; }
        public string unscrupulous_participant_of_state_procurements { get; set; }
        public string arrest_of_bank_balance { get; set; }
        public string negative_info { get; set; }

        public List<IFormFile> tax_payment_last_year_files { get; set; }
        public List<string> tax_payment_last_year_fileNames { get; set; }
        public List<IFormFile> tax_debt_info_files { get; set; }
        public List<string> tax_debt_info_fileNames { get; set; }
        public List<IFormFile> enforcement_proceedings_info_files { get; set; }
        public List<string> enforcement_proceedings_info_fileNames { get; set; }
        public List<IFormFile> court_cases_info_files { get; set; }
        public List<string> court_cases_info_fileNames { get; set; }
        public List<IFormFile> criminal_administrative_сases_info_files { get; set; }
        public List<string> criminal_administrative_сases_info_fileNames { get; set; }
        public List<IFormFile> unscrupulous_participant_of_state_procurements_files { get; set; }
        public List<string> unscrupulous_participant_of_state_procurements_fileNames { get; set; }
        public List<IFormFile> arrest_of_bank_balance_files { get; set; }
        public List<string> arrest_of_bank_balance_fileNames { get; set; }
        public List<IFormFile> negative_info_files { get; set; }
        public List<string> negative_info_fileNames { get; set; }

    }
}