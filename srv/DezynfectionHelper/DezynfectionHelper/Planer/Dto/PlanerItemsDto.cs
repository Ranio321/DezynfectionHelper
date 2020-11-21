using DezynfectionHelper.Planer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Planer.Dto
{
    public class PlanerItemsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<PlanerObject> Objects { get; set; }
        public Room Room { get; set; }
    }
}
