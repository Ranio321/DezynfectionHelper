using DezynfectionHelper.Users.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Extenstions
{
    public static class HttpContextExtension
    {
        public static async Task SignInAsync(this HttpContext httpContext, UserAccount account, bool rememberMe)
        {
             await httpContext.SignInAsync(
                 CookieAuthenticationDefaults.AuthenticationScheme,
                 account.GenerateClaims(),
                 new AuthenticationProperties
                 {
                    AllowRefresh = true,
                    IsPersistent = rememberMe,
                 });
        }
    }
}
