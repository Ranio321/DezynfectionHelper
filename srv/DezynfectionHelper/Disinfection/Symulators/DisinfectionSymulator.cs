using DezynfectionHelper.Disinfection.Symulators;
using DisinfectionHelper.Disinfection.Scheduler;
using DisinfectionHelper.Disinfection.SignalRHub;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json.Bson;

namespace DisinfectionHelper.Disinfection.Symulators
{
    public class DisinfectionSymulator : IDisinfectionSymulator
    {
        private readonly IDisinfectionScheduler scheduler;
        private readonly IHubContext<DisinfectionHub> hub;

        private string roomId;
        private int disinfectionTime;

        private int elapsedTime = 0;

        public DisinfectionSymulator(IDisinfectionScheduler scheduler, IHubContext<DisinfectionHub> hub)
        {
            this.scheduler = scheduler;
            this.hub = hub;
        }

        public async void BeginSymulation(int disinfectionTime, string roomId)
        {
            this.disinfectionTime = disinfectionTime;
            this.roomId = roomId;
            await scheduler.AddJob(() => Notify(), roomId);
        }

        private async void Notify()
        {
            elapsedTime += 5;
            var completed = elapsedTime >= disinfectionTime;

            await hub.Clients.All.SendAsync("elapsedTime", elapsedTime, roomId, completed);

            if (elapsedTime >= disinfectionTime)
            {
                await scheduler.CancelJob(roomId);
            }
        }
    }
}
