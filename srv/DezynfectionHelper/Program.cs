using DezynfectionHelper.Extenstions;
using DezynfectionHelper.Logging;
using DisinfectionHelper.Disinfection.Scheduler;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog.Web;
using System;

namespace DisinfectionHelper
{
    public class Program
    {

        public static void Main(string[] args)
        {
            var logger = LoggerConfiguration.ConfigureLogger().GetCurrentClassLogger();
            try
            {
                logger.Info("Initializing server");
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception e)
            {
                logger.Fatal(e, "Error occured while trying to start server");
                throw;
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .ConfigureServices(services =>
                {
                    services.AddHostedService<DisinfectionScheduler>();
                })
                .AddNLogger();
    }
}
