using DezynfectionHelper.Dezynfection.Models;

namespace DezynfectionHelper.Dezynfection.Services
{
    public class DezynfectionService : IDezynfectionService
    {
        private readonly IDezynfectionCalculator calc;

        public DezynfectionService(IDezynfectionCalculator calc)
        {
            this.calc = calc;
        }

        public DezynfectionStats GetDezynfectionStats(DezynfectionRoom room)
        {
            var stats = calc.CalculateOptimalTime(room);
            return new DezynfectionStats();
        }
    }
}
