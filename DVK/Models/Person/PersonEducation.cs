using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models
{
    public class PersonEducation
    {
        public int id { get; set; }
        public string identifier { get; set; }
        public string education_type { get; set; }
        public string edu_institution_name { get; set; }
        public DateTime start_date { get; set; }
        public DateTime? end_date { get; set; }
        public string specialization { get; set; }
        public string qualification { get; set; }

        public List<IFormFile> education_files { get; set; }
        public List<string> education_fileNames { get; set; }
    }
}
