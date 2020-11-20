using DezynfectionHelper.Dezynfection.Scheduler;
using DezynfectionHelper.Dezynfection.SignalRHub;
using DezynfectionHelper.Dezynfection.Symulators;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Dezynfection.Services
{
    public class DezynfectionService : IDezynfectionService
    {
        private readonly IDezynfectionScheduler scheduler;
        private readonly IHubContext<DezynfectionHub> context;

        public DezynfectionService(IDezynfectionScheduler scheduler, IHubContext<DezynfectionHub> context)
        {
            this.scheduler = scheduler;
            this.context = context;
        }

        public void BeginDezynfection(int id, int time)
        {
            var job = new DezynfectionSymulator(scheduler, time, id.ToString(), context);
            scheduler.AddJob(() => job.BeginSymulation(), id.ToString());
        }

        public void EndDezynfection(int id)
        {
            scheduler.CancelJob(id.ToString());
        }
    }
}
