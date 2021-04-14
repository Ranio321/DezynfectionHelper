namespace DezynfectionHelper.Disinfection.Symulators
{
    public interface IDisinfectionSymulator
    {
        void BeginSymulation(int disinfectionTime, string roomId);
    }
}
