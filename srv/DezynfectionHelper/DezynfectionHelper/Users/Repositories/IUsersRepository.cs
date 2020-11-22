using System.Threading.Tasks;
using DezynfectionHelper.Users.Models;

namespace DezynfectionHelper.Users.Repositories
{
    public interface IUsersRepository
    {
        Task<UserAccount> GetByIdAsync(int id);
        Task<UserAccount> ValidateAsync(string login, string password);
        Task AddAsync(UserAccount account);
        Task<UserAccount> Get(string name);
    }
}
