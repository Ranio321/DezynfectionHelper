using NLog;
using NLog.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
