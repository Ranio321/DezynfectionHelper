using System.Collections.Generic;
using DisinfectionHelper.Planer.Models;

namespace DisinfectionHelper.Planer.Params
{
    public class PlanerItemsParams
    {
        public int? Id { get; set; }
        public List<PlanerObject> Objects { get; set; }
        public Room Room { get; set; }
        public string Name { get; set; }
    }
}
