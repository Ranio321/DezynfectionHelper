using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DezynfectionHelper.Formatters
{
    public class HttpContextFormater : IHttpContextFormater
    {
        public async Task<string> RequestBodyToStringAsync(HttpRequest request)
        {
            request.EnableBuffering();

            return await ReadStreamAsync(request.Body);
        }

        public async Task<string> ResponseBodyToStringAsync(HttpContext context, Action requestDelegat)
        {
            var originalBody = context.Response.Body;
            var responseBody = new MemoryStream();
            context.Response.Body = responseBody;

            requestDelegat.Invoke();

            responseBody.Seek(0, SeekOrigin.Begin);

            var body = await new StreamReader(responseBody).ReadToEndAsync();

            responseBody.Seek(0, SeekOrigin.Begin);
            await responseBody.CopyToAsync(originalBody);

            return body;
        }

        private async Task<string> ReadStreamAsync(Stream stream)
        {
            string body;
            using (var reader = new StreamReader(stream))
            {
                body = await reader.ReadToEndAsync();
                stream.Position = 0;
            }

            return body;
        }
    }
}
