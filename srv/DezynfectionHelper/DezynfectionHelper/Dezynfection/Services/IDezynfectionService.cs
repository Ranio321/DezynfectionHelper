using DezynfectionHelper.Dezynfection.Models;

namespace DezynfectionHelper.Dezynfection.Services
{
    public interface IDezynfectionService
    {
        DezynfectionStats GetDezynfectionStats(DezynfectionRoom param);
    }
}
