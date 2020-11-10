using DezynfectionHelper.NHibernate.Models;
using DezynfectionHelper.PLaner.Models;
using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Planer.Models
{
    public class Position : Entity<int>
    {
        public virtual Coordinates Start { get; set; }
        public virtual Coordinates End { get; set; }
        public virtual int? Width { get; set; }
        public virtual int? Height { get; set; }
    }

    public class PositionMap : EntityMap<Position, int>
    {
        public PositionMap()
        {
            HasOne(x => x.Start)
                .Cascade.All();
            HasOne(x => x.End)
                .Cascade.All();
            Map(x => x.Width);
            Map(x => x.Height);
        }
    }
}
