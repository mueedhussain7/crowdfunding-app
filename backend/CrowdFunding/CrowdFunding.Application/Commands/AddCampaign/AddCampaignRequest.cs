using MediatR;

namespace CrowdFunding.Application.Commands.Campaign
{
    public sealed record AddCampaignRequest(
    string ImageUrl,
    string OwnerAddress,
    string Category,
     string Description
    ) : IRequest<AddCampaignResponse>;
}