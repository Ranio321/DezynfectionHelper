using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog.Web;

namespace DezynfectionHelper.Extenstions
{
    public static class IHostBuilderExtension
    {
        public static IHostBuilder AddNLogger(this IHostBuilder builder) =>
            builder.ConfigureLogging(logging =>
            {
                logging.ClearProviders();
                logging.SetMinimumLevel(LogLevel.Trace);
            })
            .UseNLog();
    }
}
