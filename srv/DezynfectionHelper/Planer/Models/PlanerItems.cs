using System.Collections.Generic;
using DisinfectionHelper.Users.Models;
using FluentNHibernate.Mapping;

namespace DisinfectionHelper.Planer.Models
{
    public class PlanerItems
    {
        public virtual int Id { get;  set; }
        public virtual string Name { get; set; }
        public virtual IList<PlanerObject> Objects { get; set; }
        public virtual Room Room { get; set; }
        public virtual UserAccount UserAccount { get; set; }
    }

    public class PlanerItemsMap : ClassMap<PlanerItems>
    {
        public PlanerItemsMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);
            References(x => x.UserAccount);
            References(x => x.Room)
                .Cascade.AllDeleteOrphan()
                .Cascade.All();
            HasMany(x => x.Objects)
                .Cascade.AllDeleteOrphan()
                .Cascade.All();
        }
    }
}
