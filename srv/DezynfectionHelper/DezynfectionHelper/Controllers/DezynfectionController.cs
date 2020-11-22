using DezynfectionHelper.Dezynfection.Params;
using DezynfectionHelper.Dezynfection.Services;
using Microsoft.AspNetCore.Mvc;

namespace DezynfectionHelper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DezynfectionController : ControllerBase
    {
        private readonly IDezynfectionService service;
        public DezynfectionController(IDezynfectionService service)
        {
            this.service = service;
        }

        [HttpPost]
        [Route("Begin")]
        public void BeginDezynfection([FromQuery]BeginDezynfectionParams param)
        {
            service.BeginDezynfection(param.Id, param.Time);
        }

        [HttpPost]
        [Route("End")]
        public void EndDezynfection([FromQuery]int id)
        {
            service.EndDezynfection(id);
        }
    }
}
