using DisinfectionHelper.Disinfection.Scheduler;
using DisinfectionHelper.Disinfection.SignalRHub;
using Microsoft.AspNetCore.SignalR;

namespace DisinfectionHelper.Disinfection.Symulators
{
    public class DisinfectionSymulator
    {
        private readonly IDisinfectionScheduler scheduler;
        private readonly string roomId;
        private readonly int disinfectionTime;
        private readonly IHubContext<DisinfectionHub> hub;

        private int elapsedTime = 0;

        public DisinfectionSymulator(IDisinfectionScheduler scheduler, int disinfectionTime, string roomId, IHubContext<DisinfectionHub> hub)
        {
            this.scheduler = scheduler;
            this.disinfectionTime = disinfectionTime;
            this.roomId = roomId;
            this.hub = hub;
        }

        public async void BeginSymulation()
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
