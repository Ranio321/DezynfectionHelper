﻿using System.Collections.Generic;
using System.Threading.Tasks;
using DisinfectionHelper.Planer.Models;

namespace DisinfectionHelper.Planer.Repositories
{
    public interface IPlanerRepository
    {
        Task AddAsync(PlanerItems param);
        Task<List<PlanerItems>> GetAllAsync();
        Task<PlanerItems> GetByIdAsync(int id);
        Task DeleteAsync(int id);
        Task UpdateAsync(PlanerItems items);
    }
}
