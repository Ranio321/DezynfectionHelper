using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace DisinfectionHelper.Disinfection.SignalRHub
{
    public class DisinfectionHub : Hub
    {
        public Task Send(string message, int time, string name)
        {
            return Clients.All?.SendAsync("DisinfectionTime", time, name);
        }
    }
}
