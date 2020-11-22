using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace DezynfectionHelper.Dezynfection.SignalRHub
{
    public class DezynfectionHub : Hub
    {
        public Task Send(string message, int time, string name)
        {
            return Clients.All?.SendAsync("DezynfectionTime", time, name);
        }
    }
}
