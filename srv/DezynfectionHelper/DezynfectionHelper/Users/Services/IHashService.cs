using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Users.Services
{
    public interface IHashService
    {
        bool CompareHashes(string password, string hash);
        string Hash(string password);
    }
}
