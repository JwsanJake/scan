using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Violation
{
    public class ViolationInfo
    {
        public string identifier { get; set; }
        public string registration_number { get; set; }
        public string violation_create_executor { get; set; }
        public string executor_subdivision { get; set; }
        
        public string event_identifier { get; set; }

        //public DateTime violation_create_date { get; set; }
        //public DateTime event_start_date { get; set; }
        //public DateTime event_control_date { get; set; }
        //public DateTime event_end_date { get; set; }
        //public string event_status { get; set; }
        //public List<EventExecutor> executors { get; set; }
        //public string event_content { get; set; }
        //public string event_ground { get; set; }
        //public string event_response_measures { get; set; }
        //public string event_object { get; set; }
        //public string event_result { get; set; }

        public DateTime violation_register_date { get; set; }
        public string violation_description { get; set; }
        public string violation_index { get; set; }
        public string violation_category { get; set; }
        public string violation_kind { get; set; }
        public string violation_object { get; set; }
        public string violation_subject { get; set; }
        public string violation_sum { get; set; }
        public string violation_damage { get; set; }
        public string violation_damage_sum { get; set; }
        public string violation_short_measure_sum { get; set; }
        public string violation_compensation_for_damage { get; set; }
        public string violation_penalties { get; set; }
        public string violation_penalties_sum { get; set; }
        public string violation_compensation_for_penalties { get; set; }
        public string violation_response_measures { get; set; }
        public string relation_for_law_enforcement_agencies { get; set; }
    }

    public class EventExecutor
    {
        public string FIO { get; set; }
    }
}
