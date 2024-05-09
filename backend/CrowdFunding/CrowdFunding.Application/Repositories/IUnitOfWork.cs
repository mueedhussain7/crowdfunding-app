using System;
namespace CrowdFunding.Application.Repositories
{
    public interface IUnitOfWork
    {
        Task Save(CancellationToken cancellationToken);
    }
}

