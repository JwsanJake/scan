using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Violation
{
    public class PersonnelMonitoringViolation
    {
        public string identifier { get; set; }
        public string event_identifier { get; set; }
        public DateTime violation_register_date { get; set; }
        public string violation_description { get; set; }
        public string violation_marker { get; set; }
        public string violation_category { get; set; }
        public string kind_of_violation { get; set; }
        public string violation_object { get; set; }
        public string violation_subject { get; set; }


        public string violation_amount { get; set; }
        public string violation_damage { get; set; }
        public string violation_damage_sum { get; set; }
        public string violation_shortage { get; set; }
        public string violation_surplus { get; set; }
        public string violation_damage_compensation { get; set; }
        public string violation_penalty_sanctions { get; set; }
        public string violation_penalty_sanctions_sum { get; set; }
        public string violation_penalty_sanctions_compensation { get; set; }
        public string violation_response_measures { get; set; }

    }
}
