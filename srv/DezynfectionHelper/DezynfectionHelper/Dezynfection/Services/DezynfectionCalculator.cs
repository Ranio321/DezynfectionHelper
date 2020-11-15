using System;
using System.Collections.Generic;
using System.Linq;
using DezynfectionHelper.Dezynfection.Models;
using DezynfectionHelper.Extenstions;

namespace DezynfectionHelper.Dezynfection.Services
{
    public class DezynfectionCalculator : IDezynfectionCalculator
    {
        public DezynfectionStats CalculateOptimalTime(DezynfectionRoom room)
        {
            if (room.Lamps.Count < 1)
            {
                return null;
            }

            var verticesStats = GetVerticesStats(room);
            verticesStats = verticesStats.GetSmallestDistances();

            return new DezynfectionStats();
        }

        private List<VerticeStats> GetVerticesStats(DezynfectionRoom param)
        {
            var verticesStats = new List<VerticeStats>();

            foreach (var item in param.Room.Vertices)
            {
                var distanceToLamps = new Dictionary<Lamp, double>();
                foreach (var lamp in param.Lamps)
                {
                    var distance = Math.Sqrt(Math.Pow(item.X - lamp.Position.X, 2) + Math.Pow(item.Y - lamp.Position.Y, 2));
                    distanceToLamps.Add(lamp, distance);
                }

                var verticeStats = new VerticeStats
                {
                    DistanceToLamps = distanceToLamps,
                    Vertice = item,
                };

                verticesStats.Add(verticeStats);
            }

            return verticesStats;
        }
    }
}
