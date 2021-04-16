using System.Threading.Tasks;
using DisinfectionHelper.Users.Models;

namespace DisinfectionHelper.Users.Repositories
{
    public interface IUsersRepository
    {
        Task<UserAccount> GetByIdAsync(int id);
        Task<UserAccount> ValidateAsync(string login, string password);
        Task AddAsync(UserAccount account);
        Task<UserAccount> GetAsync(string name);
    }
}
