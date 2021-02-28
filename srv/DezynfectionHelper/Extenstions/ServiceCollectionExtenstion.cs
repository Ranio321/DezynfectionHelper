using System.Net;
using System.Threading.Tasks;
using DezynfectionHelper.Disinfection.Symulators;
using DezynfectionHelper.Formatters;
using DisinfectionHelper.Disinfection.Scheduler;
using DisinfectionHelper.Disinfection.Services;
using DisinfectionHelper.Disinfection.Symulators;
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
        public static IServiceCollection AddNHibernate(this IServiceCollection services)
        {
            return services.AddTransient<IDBConfiguration, DBConfiguration>()
                    .AddScoped<IUnitOfWork, UnitOfWork>()
                    .AddScoped(x => x.GetService<IDBConfiguration>().CreateSession());
        }

        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            return services.AddTransient<IPlanerRepository, PlanerRepository>()
                    .AddTransient<IUsersRepository, UserRepository>()
                    .AddTransient<IHashService, HashService>();
        }

        public static IServiceCollection AddDisinfection(this IServiceCollection services)
        {
            return services.AddSingleton<IDisinfectionScheduler, DisinfectionScheduler>()
                    .AddTransient<IDisinfectionService, DisinfectionService>()
                    .AddTransient<IDisinfectionSymulator, DisinfectionSymulator>();
        }

        public static IServiceCollection AddFormaters(this IServiceCollection services)
        {
            return services.AddTransient<IHttpContextFormater, HttpContextFormater>();
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
