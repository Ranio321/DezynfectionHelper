using System.Collections.Generic;
using DisinfectionHelper.NHibernate.Models;

namespace DisinfectionHelper.Planer.Models
{
    public class Room : Entity<int>
    {
        public virtual string Name { get; set; }
        public virtual float? Area { get; set; }
        public virtual IList<Coordinates> Vertices { get; set; }
    }

    public class RoomMap : EntityMap<Room, int>
    {
        public RoomMap()
        {
            Map(x => x.Name);
            Map(x => x.Area);
            HasMany(x => x.Vertices)
                .Cascade.AllDeleteOrphan()
                .Cascade.All();
        }
    }
}
