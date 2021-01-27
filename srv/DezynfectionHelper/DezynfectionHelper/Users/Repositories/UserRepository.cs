using System.Linq;
using System.Threading.Tasks;
using DisinfectionHelper.Users.Models;
using DisinfectionHelper.Users.Services;
using NHibernate;
using NHibernate.Linq;

namespace DisinfectionHelper.Users.Repositories
{
    public class UserRepository : IUsersRepository
    {
        private readonly ISession session;
        private readonly IHashService hashService;

        public UserRepository(ISession session, IHashService hashService)
        {
            this.session = session;
            this.hashService = hashService;
        }

        public async Task<UserAccount> GetByIdAsync(int id)
        {
            return await session.Query<UserAccount>()
                .Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<UserAccount> Get(string name)
        {
            return await session.Query<UserAccount>()
               .Where(x => x.Nick == name).FirstOrDefaultAsync();
        }

        public async Task<UserAccount> ValidateAsync(string login, string password)
        {
            var acc = await session.Query<UserAccount>()
                .Where(x => x.Nick == login)
                .FirstOrDefaultAsync();

            return acc == null ? null : hashService.CompareHashes(password, acc.Password) ? acc : null;
        }

        public async Task AddAsync(UserAccount account)
        {
            await session.SaveOrUpdateAsync(account);
        }
    }
}
