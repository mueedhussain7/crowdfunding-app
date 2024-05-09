using MediatR;
using System;

namespace CrowdFunding.Application.Commands.Campaign
{
    public sealed record DeleteCampaignRequest(
        Guid Id
    ) : IRequest<DeleteCampaignResponse>;
}
