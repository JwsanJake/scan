using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Event
{
    public class EventContractorCheck
    {
        public string identifier { get; set; }
        public string event_create_executor { get; set; }
        public string executor_subdivision { get; set; }
        public DateTime event_start_date { get; set; }
        public DateTime event_control_date { get; set; }
        public string event_status { get; set; }
        public string event_outgoing_doc { get; set; }
        public string event_doc_ground { get; set; }
        public string event_object { get; set; }
        public string event_subject { get; set; }
        public string event_subject_of_contract { get; set; }
        public string event_contract_amount { get; set; }
        public string event_content { get; set; }
        public List<EventExecutor> executors { get; set; }
        public string event_result { get; set; }
        public string event_executor_conclusion { get; set; }
        public string event_curator_conclusion { get; set; }
        public string event_conclusion_description { get; set; }
        public string event_supervisor_1_conclusion { get; set; }
        public string event_supervisor_2_conclusion { get; set; }
        public string event_supervisor_description { get; set; }

        public int role_id { get; set; }
        public string event_step { get; set; }
    }

}
