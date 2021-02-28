using System.Collections.Generic;
using DisinfectionHelper.NHibernate.Models;
using DisinfectionHelper.Planer.Models;

namespace DisinfectionHelper.Users.Models
{
    public class UserAccount : Entity<int>
    {
        public virtual string Nick { get; set; }
        public virtual string Password { get; set; }
        public virtual IList<PlanerItems> PlanerItems { get; set; }
    }

    public class UseAccountMap : EntityMap<UserAccount, int>
    {
        public UseAccountMap()
        {
            Map(x => x.Nick);
            Map(x => x.Password);
            HasMany(x => x.PlanerItems)
                .Cascade.All()
                .Inverse();
        }
    }
}
