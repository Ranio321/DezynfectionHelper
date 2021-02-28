using DezynfectionHelper.Disinfection.Symulators;
using DisinfectionHelper.Disinfection.Scheduler;
using DisinfectionHelper.Disinfection.SignalRHub;
using DisinfectionHelper.Disinfection.Symulators;
using Microsoft.AspNetCore.SignalR;

namespace DisinfectionHelper.Disinfection.Services
{
    public class DisinfectionService : IDisinfectionService
    {
        private readonly IDisinfectionScheduler scheduler;
        private readonly IDisinfectionSymulator symulator;

        public DisinfectionService(IDisinfectionScheduler scheduler, IDisinfectionSymulator symulator)
        {
            this.scheduler = scheduler;
            this.symulator = symulator;
        }

        public void BeginDisinfection(int id, int time)
        {
            symulator.BeginSymulation(time, id.ToString());
        }

        public void EndDisinfection(int id)
        {
            scheduler.CancelJob(id.ToString());
        }
    }
}
