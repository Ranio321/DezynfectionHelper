using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Planer.Models
{
    public class PlanerItems
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual IList<PlanerObject> Objects { get; set; }
        public virtual Room Room { get; set; }
    }

    public class PlanerItemsMap : ClassMap<PlanerItems>
    {
        public PlanerItemsMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);
            HasOne(x => x.Room)
                .Cascade.All();
            HasMany(x => x.Objects)
                .Cascade.All();
        }
    }
}
