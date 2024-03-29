﻿using System.Net;
using System.Threading.Tasks;
using DisinfectionHelper.Extenstions;
using DisinfectionHelper.NHibernate.Services;
using DisinfectionHelper.Users.Dto;
using DisinfectionHelper.Users.Models;
using DisinfectionHelper.Users.Params;
using DisinfectionHelper.Users.Repositories;
using DisinfectionHelper.Users.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DisinfectionHelper.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository users;
        private readonly IUnitOfWork uow;
        private readonly IHashService hashService;

        public UsersController(IUsersRepository users, IUnitOfWork uow, IHashService hashService)
        {
            this.users = users;
            this.uow = uow;
            this.hashService = hashService;
        }

        [HttpPost]
        public async Task<UserAccountDto> Login(LoginParams param)
        {
            var user = await users.ValidateAsync(param.Login, param.Password);
            if (user == null)
            {
                HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                return null;
            }

            await HttpContext.SignInAsync(user, param.RememberMe);

            return new UserAccountDto() { Id = user.Id, Nick = user.Nick };
        }

        [HttpGet]
        [Authorize]
        public async Task Logout()
        {
            await HttpContext.SignOutAsync();
        }

        [HttpPost]
        public async Task Register(RegisterParams param)
        {
            var account = new UserAccount()
            {
                Nick = param.Nick,
                Password = hashService.Hash(param.Password),
            };
            await users.AddAsync(account);
            await uow.CommitAsync();
        }

        [HttpGet]
        [Authorize]
        public async Task<UserAccountDto> CurrentUser()
        {
           var account = await users.GetByIdAsync(HttpContext.User.GetId());
           if (account == null)
           {
                HttpContext.Response.StatusCode = 404;
                return null;
           }

           return new UserAccountDto() { Id = account.Id, Nick = account.Nick };
        }
    }
}
