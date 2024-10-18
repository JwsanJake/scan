using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models
{
    public class CompanyBaseInfo
    {
        public string identifier { get; set; }
        public string event_identifier { get; set; }
        public string company_title { get; set; }
        public string doc_number { get; set; }
        public string bin { get; set; }
        public string legal_address { get; set; }
        public string actual_address { get; set; }
        public string director { get; set; }
        public DateTime first_registration_date { get; set; }
        public DateTime? last_registration_date { get; set; }
        public List<Activity> KindOfActivities { get; set; }
        public List<License> Licenses { get; set; }
        public int is_manufacture { get; set; }
        public int is_dealer { get; set; }
        public List<IFormFile> manufacture_doc_files { get; set; }
        public List<string> manufacture_doc_fileNames { get; set; }
        public List<IFormFile> dealer_doc_files { get; set; }
        public List<string> dealer_doc_fileNames { get; set; }

        public List<IFormFile> company_form_files { get; set; }
        public List<string> company_form_fileNames { get; set; }
        public List<IFormFile> constituent_files { get; set; }
        public List<string> constituent_fileNames { get; set; }
        public List<IFormFile> reference_files { get; set; }
        public List<string> reference_fileNames { get; set; }
        public List<IFormFile> registration_certificate_files { get; set; }
        public List<string> registration_certificate_fileNames { get; set; }
        public List<IFormFile> company_additional_files { get; set; }
        public List<string> company_additional_fileNames { get; set; }
    }

    public class Activity
    {
        public string activity_name { get; set; }
    }

    public class License
    {
        public string license_name { get; set; }
    }
}
