using MediatR;

namespace CrowdFunding.Application.Queries.Campaign
{
    public record GetCampaignByIdRequest(Guid Id) : IRequest<GetCampaignByIdResponse>;
}
