using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Auth
{
    public class TokenCredentials
    {
        public TokenCredentials(string login, string role = "")
        {
            Login = login;
            Role = role;
        }
        public string Login { get; set; }
        public string Role { get; set; }
    }
}
