using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DezynfectionHelper.Logging;
using DezynfectionHelper.Formatters;

namespace DezynfectionHelper.Logging
{
    public class LoggingMiddleware
    {
        private static readonly Logger logger = LoggerConfiguration.ConfigureLogger().GetCurrentClassLogger();

        private readonly IHttpContextFormater contextFormater;
        private readonly RequestDelegate next;

        public LoggingMiddleware(RequestDelegate next, IHttpContextFormater contextFormater)
        {
            this.next = next;
            this.contextFormater = contextFormater;
        }

        public async Task Invoke(HttpContext context)
        {
            await LogRequest(context);
            await LogResponse(context);
        }

        private async Task LogRequest(HttpContext context)
        {
            var request = context.Request;
            var body = await contextFormater.RequestBodyToStringAsync(request);

            logger.Info("Request \n Host: {0} \n Body: {1} \n Path: {2} \n QueryString: {3}\n Method: {4}", request.Host.Value, body, request.Path.Value, request.QueryString.ToString(), request.Method);
        }

        private async Task LogResponse(HttpContext context)
        {
            var request = context.Request;
            var response = context.Response;
            var body = await contextFormater.ResponseBodyToStringAsync(context, async () =>
            {
                    await next(context);
            });

            logger.Info("Response \n Host: {0} \n Body: {1} \n Path: {2} \n QueryString: {3} \n Status: {4}", request.Host.Value, body, request.Path, request.QueryString.ToString(), response.StatusCode);
        }
    }
}
