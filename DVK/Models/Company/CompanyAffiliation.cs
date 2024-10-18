using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Company
{
    public class CompanyAffiliation
    {
        public string identifier { get; set; }
        public string parentId { get; set; }
        public int AffType { get; set; }
    }
}
