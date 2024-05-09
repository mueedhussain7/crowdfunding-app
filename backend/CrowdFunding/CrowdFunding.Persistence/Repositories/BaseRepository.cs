using CrowdFunding.Domain.Entities;
using CrowdFunding.Persistence.Context;
using CrowdFunding.Application.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CrowdFunding.Persistence.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        protected readonly MySqlDbContext Context;

        public BaseRepository(MySqlDbContext context)
        {
            Context = context;
        }

        public void Create(T entity)
        {
            Context.Add(entity);
        }

        public void Update(T entity)
        {
            Context.Update(entity);
        }

        public void Delete(T entity)
        {
            Context.Remove(entity);
        }

        public Task<T> Get(Guid id, CancellationToken cancellationToken)
        {
            return Context.Set<T>().FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        }

        public Task<List<T>> GetAll(CancellationToken cancellationToken)
        {
            return Context.Set<T>().ToListAsync(cancellationToken);
        }
    }
}
