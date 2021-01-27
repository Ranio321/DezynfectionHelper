using System.Net;
using System.Threading.Tasks;
using DisinfectionHelper.Disinfection.Scheduler;
using DisinfectionHelper.Disinfection.Services;
using DisinfectionHelper.NHibernate.Configurations;
using DisinfectionHelper.NHibernate.Services;
using DisinfectionHelper.Planer.Repositories;
using DisinfectionHelper.Users.Repositories;
using DisinfectionHelper.Users.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace DisinfectionHelper.Extenstions
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

        public static void AddDisinfection(this IServiceCollection services)
        {
            services.AddSingleton<IDisinfectionScheduler, DisinfectionScheduler>()
                    .AddTransient<IDisinfectionService, DisinfectionService>();
        }

        public static void AddCookieAuthentication(this IServiceCollection services, CookieSecurePolicy cookieSecurePolicy)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
               .AddCookie(cfg =>
               {
                   cfg.Cookie.SecurePolicy = cookieSecurePolicy;

                   cfg.Events = new CookieAuthenticationEvents
                   {
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
