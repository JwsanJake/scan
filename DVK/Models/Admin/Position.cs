using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Admin
{
    public class Position
    {
        public List<int> AccessIds { get; set; }
        public List<int> subdivisionId { get; set; }
        public string PositionName { get; set; }
    }
}
