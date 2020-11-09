using DezynfectionHelper.NHibernate;
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
            services.AddTransient<IDBConfiguration, DBConfiguration>();
            services.AddTransient<ISessionFactory>(x => x.GetService<IDBConfiguration>().CreateSessionFactory());
        }

        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IPlanerRepository, PlanerRepository>();
        }

    }
}
