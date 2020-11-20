using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
