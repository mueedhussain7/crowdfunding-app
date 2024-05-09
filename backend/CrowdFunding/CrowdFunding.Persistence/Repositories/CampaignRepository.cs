using Microsoft.EntityFrameworkCore;
using CrowdFunding.Application.Repositories;
using CrowdFunding.Domain.Entities;
using CrowdFunding.Persistence.Context;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic; // Required for List<T>

namespace CrowdFunding.Persistence.Repositories
{
    public class CampaignRepository : BaseRepository<Campaign>, ICampaignRepository
    {
        public CampaignRepository(MySqlDbContext context) : base(context)
        {
        }

        // Method to find all Campaigns by owner address
        public Task<List<Campaign>> GetAllByOwnerAddressAsync(string ownerAddress, CancellationToken cancellationToken)
        {
            return Context.Campaigns
                          .Where(p => p.OwnerAddress == ownerAddress)
                          .ToListAsync(cancellationToken);
        }

        // Method to find all Campaigns by category
        public Task<List<Campaign>> GetAllByCategoryAsync(string category, CancellationToken cancellationToken)
        {
            return Context.Campaigns
                          .Where(p => p.Category == category)
                          .ToListAsync(cancellationToken);
        }

        public Task<Campaign> GetLockedCampaignAsync(string ownerAddress, CancellationToken cancellationToken)
        {
            return Context.Set<Campaign>().FirstOrDefaultAsync(x => x.TransactionHash ==null);
        }
    }
}
