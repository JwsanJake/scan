using Dapper;
using DVK.DataAccess;
using DVK.Helpers.AuthHelper;
using DVK.Models.Auth;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Repositories.Auth
{
    public class AuthRepository : IAuthRepository
    {
        private readonly MainContext _context;
        private readonly IAuthHelper _authHelper;
        
        public AuthRepository(MainContext context, IAuthHelper authHelper)
        {
            _context = context;
            _authHelper = authHelper;
        }

        public async Task<LoginInfo> Login(UserCredentials credentials)
        {
            if (credentials.Login == String.Empty || credentials.Password == String.Empty)
                throw new Exception("Login_or_password_is_empty");

            var reader = await _context.Database.GetDbConnection().QueryAsync("[dbo].[AUTH_login]", new
            {
                login = credentials.Login
            }, commandType: CommandType.StoredProcedure);

            var user = reader.FirstOrDefault() as IDictionary<string, object>;

            if (user["PASSWORD_HASH"] == null)
                //throw new Exception("User_is_not_exist");
                throw new UnauthorizedAccessException("User_is_not_exist");

            string passwordHash = user["PASSWORD_HASH"].ToString();

            bool isPasswordHashed = _authHelper.IsPasswordHashed(credentials.Password, passwordHash);

            if (!isPasswordHashed)
                //throw new Exception("Password not correct");
                throw new UnauthorizedAccessException("Password not correct");

            LoginInfo loginInfo = new(
                user["LOGIN"].ToString(),
                Convert.ToInt32(user["NEED_ACCOUNT_CONFIRM"])
                );

            return loginInfo;
        }

        public async Task<UserRoleCredentials> ChangePassword(PasswordParameter password)
        {
            if (password.NewPassword.Length != 4)
                throw new Exception("Password_length_denied");

            if (!password.NewPassword.Equals(password.NewPasswordConfirm))
                throw new Exception("Password_not_matched");

            var currentPasswordReader = await _context.Database.GetDbConnection().QueryAsync("[dbo].[AUTH_get_current_password]", new
            {
                login = password.Login
            }, commandType: CommandType.StoredProcedure);

            var currentPasswordResult = currentPasswordReader.FirstOrDefault() as IDictionary<string, string>;

            string passwordHash = currentPasswordResult["password_hash"].ToString();

            bool isPasswordHashed = _authHelper.IsPasswordHashed(password.CurrentPassword, passwordHash);

            if (!isPasswordHashed)
                throw new Exception("current_password_not_correct");

            if (password.NewPassword.Equals(password.CurrentPassword))
                throw new Exception("current_and_new_passwords_matched");

            string newPassword = _authHelper.HashPassword(password.NewPassword);

            var passwordChangeReader = await _context.Database.GetDbConnection().QueryAsync("[dbo].[AUTH_change_password]", new
            {
                login = password.Login,
                new_password = newPassword
            },
            commandType: CommandType.StoredProcedure);

            var credentials = passwordChangeReader.First() as IDictionary<string, object>;

            return new UserRoleCredentials()
            {
                Login = credentials["LOGIN"].ToString(),
            };
        }

        public async Task<Dictionary<string, object>> GetAccesses(string userLogin)
        {
            var reader = await _context.Database.GetDbConnection()
                .QueryMultipleAsync("[dbo].[AUTH_get_user_accesses]",
                new { login = userLogin }, commandType: CommandType.StoredProcedure);

            var response = new Dictionary<string, object>();

            var userInfo = await reader.ReadAsync<object>();

            if (userInfo == null || userInfo.Count() == 0)
                throw new Exception("Ошибка при выводе доступов пользователя");

            response.Add("user", userInfo.ToList()[0]);

            return response;
        }

        public async Task<object> GetUserInfo(string login)
        {

            var reader = await _context.Database.GetDbConnection().QueryMultipleAsync("[dbo].[AUTH_get_user_info]", new
            {
                login
            },
            commandType: CommandType.StoredProcedure);

            var userInfo = new Dictionary<string, object>();

            var userName = reader.Read<object>().ToList();

            if (userName.Count > 0)
            {
                userInfo.Add("userName", userName[0]);

                var accesses = reader.Read<dynamic>().ToList();
                userInfo.Add("accesses", accesses);
            }

            return userInfo;
        }

        // Не нужно
        public async Task<object> RegisterUser(RegisterCredentials credentials)
        {
            string hashedPassword = _authHelper.HashPassword(credentials.Password);

            var reader = await _context.Database.GetDbConnection().QueryAsync("[dbo].[REGISTER_NEW_USER]", new
            {
                login = credentials.Login,
                password_hash = hashedPassword,
                email = credentials.Email
            },
            commandType: CommandType.StoredProcedure);

            var registerInfo = reader.First() as IDictionary<string, object>;

            return registerInfo;
        }
    }
}
