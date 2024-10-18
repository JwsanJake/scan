using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Files
{
    public class FileFormat
    {
        public string identifier { get; set; }
        public string event_identifier { get; set; }
        public List<IFormFile> education_files { get; set; }
        public List<string> education_fileNames { get; set; }

        public List<IFormFile> career_files { get; set; }
        public List<string> career_fileNames { get; set; }
    }
}
