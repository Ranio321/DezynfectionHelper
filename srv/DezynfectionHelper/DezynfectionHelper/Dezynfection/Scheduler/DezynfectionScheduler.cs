using DezynfectionHelper.Dezynfection.Symulators;
using DezynfectionHelper.Exceptions;
using FluentScheduler;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

namespace DezynfectionHelper.Dezynfection.Scheduler
{
    public class DezynfectionScheduler : IHostedService, IDezynfectionScheduler
    {
        public Task AddJob(Action action, string name)
        {
            if (JobManager.AllSchedules.Where(x => x.Name == name).FirstOrDefault() != null)
            {
                throw new JobAlreadyInProgress(name);
            }

            JobManager.AddJob(action, s => s.WithName(name).ToRunNow().AndEvery(1).Seconds());
            return Task.CompletedTask;
        }

        public Task CancelJob(string name)
        {
            JobManager.RemoveJob(name);
            return Task.CompletedTask;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            var registry = new Registry();

            JobManager.Initialize(registry);

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            JobManager.StopAndBlock();

            return Task.CompletedTask;
        }
    }
}
