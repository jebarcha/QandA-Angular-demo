using BackEnd.Domain.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BackEnd.Utils
{
    public class JwtConfigurator
    {
        public static string GetToken(User userInfo, IConfiguration config) 
        {
            string SecretKey = config["Jwt:SecretKey"];
            string Issuer = config["Jwt:Issuer"];
            string Audience = config["Jwt:Audience"];

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                new Claim("userId", userInfo.Id.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: Issuer,
                audience: Audience,
                claims,
                expires: DateTime.Now.AddMinutes(120),
                //expires: DateTime.Now.AddSeconds(10),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public static int GetTokenUserId(ClaimsIdentity identity) 
        {
            int UserId = 0;
            if (identity != null) 
            {
                IEnumerable<Claim> claims = identity.Claims;
                var ClaimUserId = claims.Where(x => x.Type == "userId").FirstOrDefault();
                UserId = ClaimUserId == null ? 0 : int.Parse(ClaimUserId.Value);
            }
            return UserId;
        }
    }
}
