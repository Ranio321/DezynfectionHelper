using System;
using System.Threading.Tasks;

namespace DisinfectionHelper.Disinfection.Scheduler
{
    public interface IDisinfectionScheduler
    {
        Task AddJob(Action action, string name);
        Task CancelJob(string name);
    }
}
