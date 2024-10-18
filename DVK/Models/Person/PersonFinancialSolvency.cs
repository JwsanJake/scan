using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Person
{
    public class PersonFinancialSolvency
    {
        public string identifier { get; set; }
        public string event_identifier{ get; set; }
        public string tax_debt { get; set; }
        public string legal_entity { get; set; }
        public string enforcement_proceedings { get; set; } 
        public string KZ_departure_ban { get; set; } 
        public string court_cases { get;  set;} 
        //public string criminal_liability_info { get; set; } 
        //public string administrative_responsibility_info { get; set; } 
        public string negative_info { get; set; } 

        public List<IFormFile> tax_debt_files { get; set; }
        public List<string> tax_debt_fileNames { get; set; }
        public List<IFormFile> legal_entity_files { get; set; }
        public List<string> legal_entity_fileNames { get; set; }
        public List<IFormFile> enforcement_proceedings_files { get; set; }
        public List<string> enforcement_proceedings_fileNames { get; set; }
        public List<IFormFile> KZ_departure_ban_files { get; set; }
        public List<string> KZ_departure_ban_fileNames { get; set; }
        public List<IFormFile> court_cases_files { get; set; }
        public List<string> court_cases_fileNames { get; set; }
        //public List<IFormFile> criminal_liability_info_files { get; set; }
        //public List<string> criminal_liability_info_fileNames { get; set; }
        //public List<IFormFile> administrative_responsibility_info_files { get; set; }
        //public List<string> administrative_responsibility_info_fileNames { get; set; }
        public List<IFormFile> negative_info_files { get; set; }
        public List<string> negative_info_fileNames { get; set; }
    }
}
