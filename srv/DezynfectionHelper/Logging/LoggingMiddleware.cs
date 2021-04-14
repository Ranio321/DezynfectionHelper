using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NLog;

namespace DezynfectionHelper.Logging
{
    public class LoggingMiddleware
    {
        private static readonly Logger logger = LoggerConfiguration.ConfigureLogger().GetCurrentClassLogger();

        private readonly RequestDelegate next;

        public LoggingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            await LogRequest(context);
            await LogResponse(context);
        }

        private async Task LogRequest(HttpContext context)
        {
            var request = context.Request;
            request.EnableBuffering();

            var bodyStr = await new StreamReader(request.Body, Encoding.UTF8, true, 1024, true).ReadToEndAsync();
            request.Body.Position = 0;

            logger.Info("Request \n Host: {0} \n Body: {1} \n Path: {2} \n QueryString: {3}\n Method: {4}", request.Host.Value, bodyStr, request.Path.Value, request.QueryString.ToString(), request.Method);
        }

        private async Task LogResponse(HttpContext context)
        {
            var request = context.Request;
            var response = context.Response;

            var responseBody = string.Empty;
            var originalBody = response.Body;

            try
            {
                using var memStream = new MemoryStream();
                response.Body = memStream;

                await next(context);

                memStream.Position = 0;
                responseBody = await new StreamReader(memStream).ReadToEndAsync();

                memStream.Position = 0;
                await memStream.CopyToAsync(originalBody);
            }
            finally
            {
                response.Body = originalBody;
            }

            logger.Info("Response \n Host: {0} \n Body: {1} \n Path: {2} \n QueryString: {3} \n Status: {4}", request.Host.Value, responseBody, request.Path, request.QueryString.ToString(), response.StatusCode);
        }
    }
}
