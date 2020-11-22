using DezynfectionHelper.Dezynfection.Scheduler;
using DezynfectionHelper.Dezynfection.SignalRHub;
using Microsoft.AspNetCore.SignalR;

namespace DezynfectionHelper.Dezynfection.Symulators
{
    public class DezynfectionSymulator
    {
        private readonly IDezynfectionScheduler scheduler;
        private readonly string roomId;
        private readonly int dezynfectionTime;
        private readonly IHubContext<DezynfectionHub> hub;

        private int elapsedTime = 0;

        public DezynfectionSymulator(IDezynfectionScheduler scheduler, int dezynfectionTime, string roomId, IHubContext<DezynfectionHub> hub)
        {
            this.scheduler = scheduler;
            this.dezynfectionTime = dezynfectionTime;
            this.roomId = roomId;
            this.hub = hub;
        }

        public async void BeginSymulation()
        {
            elapsedTime += 5;
            var completed = elapsedTime >= dezynfectionTime;

            await hub.Clients.All.SendAsync("elapsedTime", elapsedTime, roomId, completed);

            if (elapsedTime >= dezynfectionTime)
            {
                await scheduler.CancelJob(roomId);
            }
        }
    }
}
