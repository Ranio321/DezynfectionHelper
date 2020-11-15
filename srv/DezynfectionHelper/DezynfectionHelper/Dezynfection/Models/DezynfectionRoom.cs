using System.Collections.Generic;
using DezynfectionHelper.Planer.Models;

namespace DezynfectionHelper.Dezynfection.Models
{
    public class DezynfectionRoom
    {
        public Room Room { get; set; }
        public List<Lamp> Lamps { get; set; }
    }
}
