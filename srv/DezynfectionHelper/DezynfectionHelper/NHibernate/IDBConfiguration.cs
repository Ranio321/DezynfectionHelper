using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.NHibernate
{
    public interface IDBConfiguration
    {
        ISessionFactory CreateSessionFactory();
    }
}
