using CrowdFunding.Domain.Entities;

namespace CrowdFunding.Application.Queries.Campaign
{
    public class GetLockedCampaignResponse
    {
        public CrowdFunding.Domain.Entities.Campaign Campaign { get; set; }
    }
}
