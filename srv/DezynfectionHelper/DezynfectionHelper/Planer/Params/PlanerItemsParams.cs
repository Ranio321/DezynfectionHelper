using System.Collections.Generic;
using DezynfectionHelper.Planer.Models;

namespace DezynfectionHelper.Planer.Params
{
    public class PlanerItemsParams
    {
        public int? Id { get; set; }
        public List<PlanerObject> Objects { get; set; }
        public Room Room { get; set; }
        public string Name { get; set; }
    }
}
