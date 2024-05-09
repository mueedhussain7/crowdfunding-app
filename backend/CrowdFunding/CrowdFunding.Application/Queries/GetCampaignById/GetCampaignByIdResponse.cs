using CrowdFunding.Domain.Entities;

namespace CrowdFunding.Application.Queries.Campaign
{
    public class GetCampaignByIdResponse
    {
        public CrowdFunding.Domain.Entities.Campaign Campaign { get; set; }
    }
}
