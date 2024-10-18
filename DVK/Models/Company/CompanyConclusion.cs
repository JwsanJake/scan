using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Company
{
    public class CompanyConclusion
    {
        public string identifier { get; set; }
        public string isRisky { get; set; }
        public string conclusion { get; set; }
        public string conclusion_description { get; set; }

        public string subject_of_agreement { get; set; }
        public string amount_of_agreement { get; set; }
        public string agreement_executor { get; set; }
        public string customer_service { get; set; }
        public string company_selection_method { get; set; }
        public string compliance_the_requirements_of_acts { get; set; }
        public string compliance_the_contract_with_conclusion { get; set; }
    }
}
