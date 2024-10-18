using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Admin
{
    public class Subdivision
    {
        public int FactoryId { get; set; }
        public int ParentId { get; set; }
        public string SubdivisionName { get; set; }
    }
}
