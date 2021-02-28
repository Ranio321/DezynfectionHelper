using DezynfectionHelper.Logging;
using DisinfectionHelper.NHibernate.Services;
using DisinfectionHelper.Users.Models;
using DisinfectionHelper.Users.Repositories;
using DisinfectionHelper.Users.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace DisinfectionHelper.Extenstions
{
    public static class ApplicationBuilderExtension
    {
        public static async void AddAdminUser(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var repo = scope.ServiceProvider.GetService<IUsersRepository>();
                var uow = scope.ServiceProvider.GetService<IUnitOfWork>();
                var hashService = scope.ServiceProvider.GetService<IHashService>();
                var rootAccout = await repo.Get("root");

                if (rootAccout == null)
                {
                   await repo.AddAsync(new UserAccount
                    {
                        Nick = "root",
                        Password = hashService.Hash("root"),
                    });
                   await uow.CommitAsync();
                }
            }
        }

        public static IApplicationBuilder UseLoggingMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<LoggingMiddleware>();
        }
    }
}
