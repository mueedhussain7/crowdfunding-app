using MediatR;
using System;

namespace CrowdFunding.Application.Commands.Campaign
{
    public sealed record UpdateCampaignRequest(
        Guid Id,
        string? ImageUrl,
        string? Description,
        string? TransactionHash
    ) : IRequest<UpdateCampaignResponse>;
}
