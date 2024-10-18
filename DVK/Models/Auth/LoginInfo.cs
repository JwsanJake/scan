using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Models.Auth
{
    public class LoginInfo
    {
        public LoginInfo(string login, int needAccountConfirm)
        {
            Login = login;
            NeedAccountConfirm = needAccountConfirm;
        }

        public string Login { get; set; }
        public int NeedAccountConfirm { get; set; }
    }
}
