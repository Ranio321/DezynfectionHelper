using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.NHibernate.Models
{
    public class Entity<TId>
    {
        public virtual TId Id { get; protected set; }
    }

    public class EntityMap<TEntity, TId> : ClassMap<TEntity> where TEntity : Entity<TId>
    {
        public EntityMap()
        {
            Id(x => x.Id);
        }
    }
}
