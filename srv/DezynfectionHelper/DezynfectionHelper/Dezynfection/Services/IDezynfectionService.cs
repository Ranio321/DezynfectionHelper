using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Dezynfection.Services
{
    public interface IDezynfectionService
    {
        void BeginDezynfection(int id, int time);
        void EndDezynfection(int id);
    }
}
