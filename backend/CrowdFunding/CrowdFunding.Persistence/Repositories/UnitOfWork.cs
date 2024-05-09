using CrowdFunding.Application.Repositories;
using CrowdFunding.Persistence.Context;
using System.Threading;
using System.Threading.Tasks;

namespace CrowdFunding.Persistence.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly MySqlDbContext _context;

    public UnitOfWork(MySqlDbContext context)
    {
        _context = context;
    }

    public Task Save(CancellationToken cancellationToken)
    {
        return _context.SaveChangesAsync(cancellationToken);
    }
}
