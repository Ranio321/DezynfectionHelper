using DisinfectionHelper.Disinfection.Scheduler;
using DisinfectionHelper.Disinfection.SignalRHub;
using DisinfectionHelper.Disinfection.Symulators;
using Microsoft.AspNetCore.SignalR;

namespace DisinfectionHelper.Disinfection.Services
{
    public class DisinfectionService : IDisinfectionService
    {
        private readonly IDisinfectionScheduler scheduler;
        private readonly IHubContext<DisinfectionHub> context;

        public DisinfectionService(IDisinfectionScheduler scheduler, IHubContext<DisinfectionHub> context)
        {
            this.scheduler = scheduler;
            this.context = context;
        }

        public void BeginDisinfection(int id, int time)
        {
            var job = new DisinfectionSymulator(scheduler, time, id.ToString(), context);
            scheduler.AddJob(() => job.BeginSymulation(), id.ToString());
        }

        public void EndDisinfection(int id)
        {
            scheduler.CancelJob(id.ToString());
        }
    }
}
