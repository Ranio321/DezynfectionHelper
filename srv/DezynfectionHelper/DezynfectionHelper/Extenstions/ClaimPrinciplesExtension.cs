using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DezynfectionHelper.Extenstions
{
    public static class ClaimPrinciplesExtension
    {
        public static int GetId(this ClaimsPrincipal claimsPrincipal)
        {
            return int.Parse(claimsPrincipal.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        }
    }
}
