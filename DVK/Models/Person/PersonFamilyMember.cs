using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Person
{
    public class PersonFamilyMember
    {
        public int id { get; set; }
        public string identifier { get; set; }
        public string last_name { get; set; }
        public string first_name { get; set; }
        public string middle_name { get; set; }
        public DateTime? birthdate { get; set; }
        public string iin { get; set; }
        public string work_place { get; set; }
        public string family_status { get; set; }
    }
}
