using CrowdFunding.Domain.Entities;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CrowdFunding.Application.Repositories
{
    public interface ICampaignRepository : IBaseRepository<Campaign>
    {
        Task<Campaign> GetLockedCampaignAsync(string ownerAddress, CancellationToken cancellationToken);
        Task<List<Campaign>> GetAllByOwnerAddressAsync(string ownerAddress, CancellationToken cancellationToken);
        Task<List<Campaign>> GetAllByCategoryAsync(string category, CancellationToken cancellationToken);
    }
}
