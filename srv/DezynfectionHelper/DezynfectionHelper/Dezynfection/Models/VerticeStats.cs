using System.Collections.Generic;
using DezynfectionHelper.Planer.Models;

namespace DezynfectionHelper.Dezynfection.Models
{
    public class VerticeStats
    {
        public Coordinates Vertice { get; set; }
        public Dictionary<Lamp, double> DistanceToLamps { get; set; } = new Dictionary<Lamp, double>();
    }
}
