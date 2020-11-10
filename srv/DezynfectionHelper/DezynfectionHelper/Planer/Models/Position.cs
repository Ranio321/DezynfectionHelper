using DezynfectionHelper.NHibernate.Models;
using DezynfectionHelper.PLaner.Models;
using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Planer.Models
{
    public class Position
    {
        public virtual int PositionId { get; set; }
        public virtual Coordinates Start { get; set; }
        public virtual Coordinates End { get; set; }
        public virtual int? Width { get; set; }
        public virtual int? Height { get; set; }
    }

    public class PositionMap : ClassMap<Position>
    {
        public PositionMap()
        {
            Id(x => x.PositionId);
            References(x => x.Start)
                .Cascade.All();
            References(x => x.End)
                .Cascade.All();
            Map(x => x.Width);
            Map(x => x.Height);
        }
    }
}
