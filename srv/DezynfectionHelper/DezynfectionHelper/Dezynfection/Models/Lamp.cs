using DezynfectionHelper.Planer.Models;
using System;

namespace DezynfectionHelper.Dezynfection.Models
{
    public class Lamp
    {
        private double irradiation;

        public Coordinates Position { get; set; }
        public string Type { get; set; }
        public int Height { get; set; }
        public double? Irradiation { get => irradiation; }

        private void CalculateIrradiation()
        {
            var ratio = Math.Cos(40 / 180);
            irradiation = Height / ratio;
        }

    }
}
