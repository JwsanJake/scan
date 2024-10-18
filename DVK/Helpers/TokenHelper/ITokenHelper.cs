using DVK.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Helpers.TokenHelper
{
    public interface ITokenHelper
    {
        Token GenerateToken(TokenCredentials credentials);
        string GetLoginFromToken(string token);
    }
}
