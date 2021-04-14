using NLog;
using NLog.Web;

namespace DezynfectionHelper.Logging
{
    public static class LoggerConfiguration
    {
        public static LogFactory ConfigureLogger()
        {
            return NLogBuilder.ConfigureNLog("nlog.config");
        }
    }
}
