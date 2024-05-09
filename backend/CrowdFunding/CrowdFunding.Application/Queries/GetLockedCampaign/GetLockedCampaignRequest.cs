using MediatR;

namespace CrowdFunding.Application.Queries.Campaign
{
    public record GetLockedCampaignRequest(string ownerAddress) : IRequest<GetLockedCampaignResponse>;
}
