using System.Linq;
using System.Security.Claims;

namespace DisinfectionHelper.Extenstions
{
    public static class ClaimPrinciplesExtension
    {
        public static int GetId(this ClaimsPrincipal claimsPrincipal)
        {
            return int.Parse(claimsPrincipal.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        }
    }
}
