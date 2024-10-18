using DVK.Helpers.TokenHelper;
using DVK.Models.Auth;
using DVK.Repositories.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVK.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthRepository _repo;
        private readonly ITokenHelper _tokenHelper;

        public AuthController(IAuthRepository repo, ITokenHelper tokenHelper)
        {
            _repo = repo;
            _tokenHelper = tokenHelper;
        }


        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUserInfo()
        {
            string login = User.Identity.Name;

            if (login == null)
            {
                return Unauthorized();
            }

            var userInfo = await _repo.GetUserInfo(login);

            return Ok(userInfo);
        }


        [HttpPost]
        public async Task<IActionResult> Login(UserCredentials credentials)
        {
            int notNeededToConfirm = 0;

            LoginInfo loginInfo = await _repo.Login(credentials);

            if (loginInfo.NeedAccountConfirm.Equals(notNeededToConfirm))
            {
                TokenCredentials credentialsForToken = new(credentials.Login);

                return Ok(_tokenHelper.GenerateToken(credentialsForToken));
            }
            return Ok(loginInfo);
        }

        [HttpPost]
        public async Task<ActionResult> ChangePassword(PasswordParameter password)
        {
            UserRoleCredentials credentials = await _repo.ChangePassword(password);

            TokenCredentials credentialsForToken = new(credentials.Login);

            return Ok(_tokenHelper.GenerateToken(credentialsForToken));
        }


        [HttpGet]
        [Authorize]
        public async Task<ActionResult> UserAccesses(string login)
        {
            if (login == null)
            {
                return NotFound("User not found");
            }

            var userAccesses = await _repo.GetAccesses(login);

            return Ok(userAccesses);
        }
    }
}
