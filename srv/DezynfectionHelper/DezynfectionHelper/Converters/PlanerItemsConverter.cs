using System.Linq;
using DezynfectionHelper.Dezynfection.Models;
using DezynfectionHelper.Planer.Models;

namespace DezynfectionHelper.Mappers
{
    public static class PlanerItemsConverter
    {
        public static DezynfectionRoom ToDezynfectionRoom(this PlanerItems items)
        {
            var lamps = items.Objects
                .Where(x => x.Type.ToLower() == "lamp")
                .Select(s => new Lamp()
                {
                 Position = s.Position.Start,
                 Type = s.Type,
                 Height = s.Height,
                }).ToList();

            var dezynfectionRoom = new DezynfectionRoom
            {
                Lamps = lamps,
                Room = items.Room,
            };

            return dezynfectionRoom;
        }
    }
}
