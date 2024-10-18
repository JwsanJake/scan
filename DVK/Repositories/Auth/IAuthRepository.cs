using DVK.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Repositories.Auth
{
    public interface IAuthRepository
    {
        Task<LoginInfo> Login(UserCredentials credentials);
        Task<UserRoleCredentials> ChangePassword(PasswordParameter password);
        Task<Dictionary<string, object>> GetAccesses(string userLogin);
        Task<object> RegisterUser(RegisterCredentials credentials);
        Task<object> GetUserInfo(string login);
    }
}
