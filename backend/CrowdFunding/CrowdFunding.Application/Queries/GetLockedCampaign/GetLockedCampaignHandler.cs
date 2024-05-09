using AutoMapper;
using CrowdFunding.Application.Repositories;
using MediatR;

namespace CrowdFunding.Application.Queries.Campaign
{
    public class GetLockedCampaignHandler : IRequestHandler<GetLockedCampaignRequest, GetLockedCampaignResponse>
    {
        private readonly ICampaignRepository _campaignRepository;
        private readonly IMapper _mapper;

        public GetLockedCampaignHandler(ICampaignRepository campaignRepository, IMapper mapper)
        {
            _campaignRepository = campaignRepository;
            _mapper = mapper;
        }

        public async Task<GetLockedCampaignResponse> Handle(GetLockedCampaignRequest request, CancellationToken cancellationToken)
        {
            var campaign = await _campaignRepository.GetLockedCampaignAsync(request.ownerAddress, cancellationToken);

            var campaignDto = _mapper.Map<CrowdFunding.Domain.Entities.Campaign>(campaign);

            return new GetLockedCampaignResponse { Campaign = campaignDto };
        }
    }
}
