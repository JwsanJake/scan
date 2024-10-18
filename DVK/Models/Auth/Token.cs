using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Auth
{
    public class Token
    {
        public Token(string authToken)
        {
            AuthToken = authToken;
        }

        public string AuthToken { get; set; }
    }
}
