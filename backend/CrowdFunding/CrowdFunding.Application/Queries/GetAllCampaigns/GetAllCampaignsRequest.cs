using MediatR;

namespace CrowdFunding.Application.Queries.Campaign
{
    // This record represents a request to get all proposals. It does not carry any payload
    // as no specific parameters are needed to fetch all entries.
    public sealed record GetAllCampaignsRequest() : IRequest<GetAllCampaignsResponse>;
}
