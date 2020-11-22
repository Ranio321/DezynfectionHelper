using System.Collections.Generic;
using System.Security.Claims;
using DezynfectionHelper.Users.Models;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace DezynfectionHelper.Extenstions
{
    public static class UserAccountExtension
    {
        public static ClaimsPrincipal GenerateClaims(this UserAccount user)
        {
            var indentityClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Nick),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };

            return new ClaimsPrincipal(new ClaimsIdentity(indentityClaims, CookieAuthenticationDefaults.AuthenticationScheme));
        }
    }
}
