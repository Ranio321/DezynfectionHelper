namespace DezynfectionHelper.Users.Services
{
    public interface IHashService
    {
        bool CompareHashes(string password, string hash);
        string Hash(string password);
    }
}
