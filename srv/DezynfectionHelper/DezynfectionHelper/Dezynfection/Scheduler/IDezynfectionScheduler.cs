using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Dezynfection.Scheduler
{
    public interface IDezynfectionScheduler
    {
        Task AddJob(Action action, string name);
        Task CancelJob(string name);
    }
}
