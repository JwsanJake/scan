using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Person
{
    public class PersonConclusion
    {
        public string identifier { get; set; }
        public string vacant_position { get; set; }
        public string transfer_from_position { get; set; }
        public string conclusion { get; set; }
        public string conclusion_description { get; set; }
        public DateTime check_start_date { get; set; }
        //public DateTime check_end_date { get; set; }
    }
}
