using System.Collections.Generic;
using DisinfectionHelper.Planer.Models;

namespace DisinfectionHelper.Planer.Dto
{
    public class PlanerItemsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<PlanerObject> Objects { get; set; }
        public Room Room { get; set; }
    }
}
