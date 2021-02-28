using System;

namespace DisinfectionHelper.Exceptions
{
    public class JobAlreadyInProgress : Exception
    {
        public JobAlreadyInProgress(string name)
            : base($"Job with name {name} is already in progress")
        {
        }
    }
}
