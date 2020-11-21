using DezynfectionHelper.Users.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
