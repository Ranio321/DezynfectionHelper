using DezynfectionHelper.NHibernate;
using DezynfectionHelper.NHibernate.Configurations;
using DezynfectionHelper.NHibernate.Services;
using DezynfectionHelper.Planer.Repositories;
using Microsoft.Extensions.DependencyInjection;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
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
            services.AddTransient<IPlanerRepository, PlanerRepository>();
        }
    }
}
