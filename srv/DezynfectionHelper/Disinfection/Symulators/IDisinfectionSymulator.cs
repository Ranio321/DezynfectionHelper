using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Disinfection.Symulators
{
    public interface IDisinfectionSymulator
    {
        void BeginSymulation(int disinfectionTime, string roomId);
    }
}
