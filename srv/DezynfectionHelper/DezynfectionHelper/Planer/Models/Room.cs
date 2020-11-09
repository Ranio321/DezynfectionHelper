using DezynfectionHelper.PLaner.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Planer.Models
{
    public class Room
    {
        public string Name { get; set; }
        public float? Area { get; set; }
        public List<Coordinates> Vertices { get; set; }
    }
}
