using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace DezynfectionHelper.Formatters
{
    public interface IHttpContextFormater
    {
        Task<string> RequestBodyToStringAsync(HttpRequest request);
        Task<string> ResponseBodyToStringAsync(HttpContext response, Action requestDelegat);
    }
}
