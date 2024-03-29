﻿using FluentNHibernate.Mapping;

namespace DisinfectionHelper.Planer.Models
{
    public class PlanerObject
    {
        public virtual int Id { get; protected set; }
        public virtual Position Position { get; set; }
        public virtual int Height { get; set; }
        public virtual string Type { get; set; }
    }

    public class PlanerObjectMap : ClassMap<PlanerObject>
    {
        public PlanerObjectMap()
        {
            Id(x => x.Id);
            Map(x => x.Type);
            Map(x => x.Height);
            References(x => x.Position)
                .Cascade.AllDeleteOrphan()
                .Cascade.All();
        }
    }
}
