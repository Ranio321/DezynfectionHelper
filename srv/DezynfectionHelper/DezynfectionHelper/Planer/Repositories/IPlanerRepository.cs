using DezynfectionHelper.Planer.Params;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezynfectionHelper.Planer.Repositories
{
    public interface IPlanerRepository
    {
        Task AddAsync(PlanerItemsParams param);
    }
}
