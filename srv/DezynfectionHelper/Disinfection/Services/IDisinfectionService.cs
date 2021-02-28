namespace DisinfectionHelper.Disinfection.Services
{
    public interface IDisinfectionService
    {
        void BeginDisinfection(int id, int time);
        void EndDisinfection(int id);
    }
}
