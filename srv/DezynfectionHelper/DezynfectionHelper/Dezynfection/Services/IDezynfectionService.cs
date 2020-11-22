namespace DezynfectionHelper.Dezynfection.Services
{
    public interface IDezynfectionService
    {
        void BeginDezynfection(int id, int time);
        void EndDezynfection(int id);
    }
}
