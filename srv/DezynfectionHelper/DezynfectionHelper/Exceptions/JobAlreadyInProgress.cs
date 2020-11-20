using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Exceptions
{
    public class JobAlreadyInProgress : Exception
    {
        public JobAlreadyInProgress(string name)
            : base($"Job with name {name} is already in progress")
        {

        }
    }
}
