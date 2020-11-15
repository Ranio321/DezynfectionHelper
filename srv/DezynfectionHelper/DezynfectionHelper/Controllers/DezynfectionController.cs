using System.Threading.Tasks;
using DezynfectionHelper.Dezynfection.Services;
using DezynfectionHelper.Mappers;
using DezynfectionHelper.Planer.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace DezynfectionHelper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DezynfectionController : ControllerBase
    {
        private readonly IDezynfectionService dezynfection;
        private readonly IPlanerRepository repo;

        public DezynfectionController(IDezynfectionService dezynfection, IPlanerRepository repo)
        {
            this.dezynfection = dezynfection;
            this.repo = repo;
        }

        [HttpGet]
        public async Task GetStats([FromQuery]int id)
        {
            var data = await repo.GetByIdAsync(id);
            dezynfection.GetDezynfectionStats(data.ToDezynfectionRoom());
        }
    }
}
