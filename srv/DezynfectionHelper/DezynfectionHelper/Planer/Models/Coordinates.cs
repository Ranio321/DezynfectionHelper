using DezynfectionHelper.NHibernate.Models;
using DezynfectionHelper.Planer.Models;
using FluentNHibernate.Data;
using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.PLaner.Models
{
    public class Coordinates : Entity<int>
    {
        public virtual float X { get; set; }
        public virtual float Y { get; set; }
    }

    public class CoordinatesMap : EntityMap<Coordinates, int>
    {
        public CoordinatesMap()
        {
            Map(x => x.X);
            Map(x => x.Y);
        }
    }
}
