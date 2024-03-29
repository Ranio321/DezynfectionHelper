﻿using System.Threading.Tasks;
using DisinfectionHelper.Users.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;

namespace DisinfectionHelper.Extenstions
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
