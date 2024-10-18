using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Helpers.AuthHelper
{
    public interface IAuthHelper
    {
        string HashPassword(string password);
        bool IsPasswordHashed(string password, string passwordHash);
    }
}
