using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Person
{
    public class PersonCareer
    {
        public int id { get; set; }
        public string identifier { get; set; }
        public string company_name { get; set; }
        public DateTime start_date { get; set; }
        public DateTime? end_date { get; set; }
        public string job_position { get; set; }

        public List<IFormFile> career_files { get; set; }
        public List<string> career_fileNames { get; set; }
    }
}
