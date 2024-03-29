﻿using FluentNHibernate.Mapping;

namespace DisinfectionHelper.NHibernate.Models
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
