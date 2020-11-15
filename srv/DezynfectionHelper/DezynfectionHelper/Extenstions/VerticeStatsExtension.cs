using DezynfectionHelper.Dezynfection.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Extenstions
{
    public static class VerticeStatsExtension
    {
        public static List<VerticeStats> GetSmallestDistances(this List<VerticeStats> stats)
        {
            var closestLamp = new List<VerticeStats>();
            foreach (var vert in stats)
            {
                var minValue = vert.DistanceToLamps.Aggregate((l, r) => l.Value < r.Value ? l : r);
                closestLamp.Add(new VerticeStats
                {
                    DistanceToLamps = new Dictionary<Lamp, double>
                    {
                        {minValue.Key, minValue.Value },
                    },
                    Vertice = vert.Vertice,
                });
            }

            return closestLamp;
        }
    }
}
