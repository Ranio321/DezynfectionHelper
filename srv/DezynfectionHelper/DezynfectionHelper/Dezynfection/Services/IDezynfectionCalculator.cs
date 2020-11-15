using DezynfectionHelper.Dezynfection.Models;

namespace DezynfectionHelper.Dezynfection.Services
{
    public interface IDezynfectionCalculator
    {
        DezynfectionStats CalculateOptimalTime(DezynfectionRoom room);
    }
}
