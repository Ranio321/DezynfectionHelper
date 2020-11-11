using DezynfectionHelper.Planer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Planer.Params
{
    public class PlanerItemsParams
    { 
        public List<PlanerObject> Objects { get; set; }
        public Room Room { get; set; }
    }
}
