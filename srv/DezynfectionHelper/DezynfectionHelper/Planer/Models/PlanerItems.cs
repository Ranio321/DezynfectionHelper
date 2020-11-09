﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Planer.Models
{
    public class PlanerItems
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<PlanerObject> Objects { get; set; }
        public Room Room { get; set; }
    }
}
