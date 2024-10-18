using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Person
{
    public class PersonAffiliation
    {
        public string Identifier { get; set; }
        public string AffIdentifier { get; set; }
        public int AffType { get; set; }
    }
}
