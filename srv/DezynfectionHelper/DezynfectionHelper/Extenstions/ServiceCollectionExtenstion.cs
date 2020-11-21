using DezynfectionHelper.Dezynfection.Scheduler;
using DezynfectionHelper.Dezynfection.Services;
using DezynfectionHelper.NHibernate.Configurations;
using DezynfectionHelper.NHibernate.Services;
using DezynfectionHelper.Planer.Repositories;
using DezynfectionHelper.Users.Repositories;
using DezynfectionHelper.Users.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DezynfectionHelper.Extenstions
{
    public static class ServiceCollectionExtenstion
    {
        public static void AddNHibernate(this IServiceCollection services)
        {
            services.AddTransient<IDBConfiguration, DBConfiguration>()
                    .AddScoped<IUnitOfWork, UnitOfWork>()
                    .AddScoped(x => x.GetService<IDBConfiguration>().CreateSession());
        }

        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IPlanerRepository, PlanerRepository>()
                    .AddTransient<IUsersRepository, UserRepository>()
                    .AddTransient<IHashService, HashService>();
        }

        public static void AddDezynfection(this IServiceCollection services)
        {
            services.AddSingleton<IDezynfectionScheduler, DezynfectionScheduler>()
                    .AddTransient<IDezynfectionService ,DezynfectionService>();
        }

        public static void AddCookieAuthentication(this IServiceCollection services, CookieSecurePolicy cookieSecurePolicy)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
               .AddCookie(cfg =>
               {
                   cfg.Cookie.SecurePolicy = cookieSecurePolicy;

                   cfg.Events = new CookieAuthenticationEvents
                   {
                       OnValidatePrincipal = async context =>
                       {
                           var repo = context.HttpContext.RequestServices.GetRequiredService<IUsersRepository>();

                           var userId = context.Principal.GetId();
                           var user = await repo.GetByIdAsync(userId);
                           //var claimRoles = context.Principal.Claims.Where(c => c.Type == ClaimTypes.Role)
                           //    .Select(c => c.Value);

                           //if (!(claimRoles.Except(user.Roles).Count() == 0 && user.Roles.Except(claimRoles).Count() == 0))
                           //{
                           //    await context.HttpContext.SignOutAsync();
                           //    context.RejectPrincipal();
                           //}
                       },
                       OnRedirectToAccessDenied = context =>
                       {
                           context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                           return Task.CompletedTask;
                       },
                       OnRedirectToLogin = context =>
                       {
                           context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                           return Task.CompletedTask;
                       },
                   };
               });
        }
    }
}
