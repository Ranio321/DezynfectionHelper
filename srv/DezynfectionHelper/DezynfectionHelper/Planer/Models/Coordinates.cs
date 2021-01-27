using DisinfectionHelper.NHibernate.Models;

namespace DisinfectionHelper.Planer.Models
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
