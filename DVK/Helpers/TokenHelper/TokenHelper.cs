using DVK.Models.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DVK.Helpers.TokenHelper
{
    public class TokenHelper : ITokenHelper
    {
        private IConfiguration _configuration;

        public TokenHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Token GenerateToken(TokenCredentials credentials)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("token_secret_key"));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, credentials.Login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, credentials.Role),
                    new Claim("login", credentials.Login),
                    new Claim("emp_no", credentials.Login)
                }),
                Expires = DateTime.UtcNow.AddMinutes(240),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenData = tokenHandler.CreateToken(tokenDescriptor);

            Token newToken = new(tokenHandler.WriteToken(tokenData));

            return newToken;
        }

        public string GetLoginFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(token);

            string login = jwtSecurityToken.Claims.First(c => c.Type == "login").Value;

            return login;
        }
    }
}
