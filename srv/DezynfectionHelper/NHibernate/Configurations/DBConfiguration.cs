using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using Microsoft.Extensions.Configuration;
using NHibernate;
using NHibernate.Tool.hbm2ddl;

namespace DisinfectionHelper.NHibernate.Configurations
{
    public class DBConfiguration : IDBConfiguration
    {
        private IConfiguration configuration;

        public DBConfiguration(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public ISession CreateSession()
        {
            var connectionString = configuration.GetSection("Database").GetSection("ConnectionString").Value;
            return Fluently.Configure()
                .Database(PostgreSQLConfiguration.Standard.ConnectionString(connectionString))
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<Program>())
                .ExposeConfiguration(cfg => new SchemaUpdate(cfg).Execute(false, true))
                .BuildSessionFactory()
                .OpenSession();
        }
    }
}
