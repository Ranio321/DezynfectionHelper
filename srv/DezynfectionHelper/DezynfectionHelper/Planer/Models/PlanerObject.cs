using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Planer.Models
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
            HasOne(x => x.Position)
                .Cascade.All();
            Map(x => x.Height);
            Map(x => x.Type);

        }
    }
}
