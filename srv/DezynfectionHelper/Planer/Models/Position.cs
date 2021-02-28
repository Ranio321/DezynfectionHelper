using FluentNHibernate.Mapping;

namespace DisinfectionHelper.Planer.Models
{
    public class Position
    {
        public virtual int Id { get; protected set; }
        public virtual Coordinates Start { get; set; }
        public virtual Coordinates End { get; set; }
        public virtual int? Width { get; set; }
        public virtual int? Height { get; set; }
    }

    public class PositionMap : ClassMap<Position>
    {
        public PositionMap()
        {
            Id(x => x.Id);
            References(x => x.Start)
                .Cascade.AllDeleteOrphan()
                .Cascade.All();
            References(x => x.End)
                .Cascade.AllDeleteOrphan()
                .Cascade.All();
            Map(x => x.Width);
            Map(x => x.Height);
        }
    }
}
