using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Person
{
    public class PersonNegativeInfo
    {
        public string identifier { get; set; }
        public string event_identifier { get; set; }
        public string erdr_info { get; set; }
        public string criminal_offense { get; set; }
        public string administrative_responsibility { get; set; }
        public string disengagement { get; set; }
        public string unreimbursed_damage { get; set; }
        public string presense_of_family_ties {get;set;}
        public string presence_of_disciplinary_action { get;set;}
        public string suspension_from_work { get; set; }
        public string termination_of_contract { get; set; }
        public string criminal_record { get; set; }
        public string criminal_remission { get; set; }
        public string personal_sanctions { get; set; }
        public string db_data_check { get; set; }
        public string police_data_check { get; set; }
        public string family_negative_info { get; set; }


        public List<IFormFile> erdr_info_files { get; set; }
        public List<string> erdr_info_fileNames { get; set; } = new List<string>();
        public List<IFormFile> criminal_offense_files { get; set; }
        public List<string> criminal_offense_fileNames { get; set; }
        public List<IFormFile> administrative_responsibility_files { get; set; }
        public List<string> administrative_responsibility_fileNames { get; set; }
        public List<IFormFile> disengagement_files { get; set; }
        public List<string> disengagement_fileNames { get; set; }
        public List<IFormFile> unreimbursed_damage_files { get; set; }
        public List<string> unreimbursed_damage_fileNames { get; set; }
        public List<IFormFile> presense_of_family_ties_files { get; set; }
        public List<string> presense_of_family_ties_fileNames { get; set; }
        public List<IFormFile> presence_of_disciplinary_action_files { get; set; }
        public List<string> presence_of_disciplinary_action_fileNames { get; set; }
        public List<IFormFile> suspension_from_work_files { get; set; }
        public List<string> suspension_from_work_fileNames { get; set; }
        public List<IFormFile> termination_of_contract_files { get; set; }
        public List<string> termination_of_contract_fileNames { get; set; }
        public List<IFormFile> criminal_record_files { get; set; }
        public List<string> criminal_record_fileNames { get; set; }
        public List<IFormFile> criminal_remission_files { get; set; }
        public List<string> criminal_remission_fileNames { get; set; }
        public List<IFormFile> personal_sanctions_files { get; set; }
        public List<string> personal_sanctions_fileNames { get; set; }
        public List<IFormFile> db_data_check_files { get; set; }
        public List<string> db_data_check_fileNames { get; set; }
        public List<IFormFile> police_data_check_files { get; set; }
        public List<string> police_data_check_fileNames { get; set; }
        public List<IFormFile> family_negative_info_files { get; set; }
        public List<string> family_negative_info_fileNames { get; set; }

    }
}
