using DezynfectionHelper.Disinfection.Params;
using DisinfectionHelper.Disinfection.Params;
using DisinfectionHelper.Disinfection.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DisinfectionHelper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DisinfectionController : ControllerBase
    {
        private readonly IDisinfectionService service;

        public DisinfectionController(IDisinfectionService service)
        {
            this.service = service;
        }

        [HttpPost]
        [Route("Begin")]
        public void BeginDisinfection(BeginDisinfectionParams param)
        {
            service.BeginDisinfection(param.Id, param.Time);
        }

        [HttpPost]
        [Route("End")]
        public void EndDisinfection(EndDisinfectionParams param)
        {
            service.EndDisinfection(param.Id);
        }
    }
}
