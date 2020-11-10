using DezynfectionHelper.NHibernate.Models;
using DezynfectionHelper.PLaner.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Planer.Models
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
                .Cascade.All();
        }
    }
}
