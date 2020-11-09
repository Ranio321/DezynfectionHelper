using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Planer.Models
{
    public class Position
    {
        public Position Start { get; set; }
        public Position End { get; set; }
        public int? Width { get; set; }
        public int? Height { get; set; }
    }
}
