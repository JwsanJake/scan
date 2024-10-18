using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models
{
    public class PersonBaseInfo
    {
        public string identifier { get; set; }
        public string event_identifier { get; set; }
        public string parentId { get; set; }
        public string last_name { get; set; }
        public string first_name { get; set; }
        public string middle_name { get; set; }
        public string birthplace { get; set; }
        public DateTime? birthdate { get; set; }
        public string identification { get; set; }
        public string iin { get; set; }
        public string citizenship { get; set; }
        public string family_status { get; set; }
        public string phone_number { get; set; }
        public string legal_address { get; set; }
        public string actual_address { get; set; }

        public List<IFormFile> identity_card_files { get; set; }
        public List<string> identity_card_fileNames { get; set; }
        public List<IFormFile> questionary_files { get; set; }
        public List<string> questionary_fileNames { get; set; }     
        public List<IFormFile> application_files { get; set; }
        public List<string> application_fileNames { get; set; }
        public List<IFormFile> additional_files { get; set; }
        public List<string> additional_fileNames { get; set; }
    }
}
