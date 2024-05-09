using AutoMapper;
using CrowdFunding.Application.Repositories;
using CrowdFunding.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CrowdFunding.Application.Queries.Campaign
{
    public class GetCampaignByIdHandler : IRequestHandler<GetCampaignByIdRequest, GetCampaignByIdResponse>
    {
        private readonly ICampaignRepository _campaignRepository;
        private readonly IMapper _mapper;

        public GetCampaignByIdHandler(ICampaignRepository campaignRepository, IMapper mapper)
        {
            _campaignRepository = campaignRepository;
            _mapper = mapper;
        }

        public async Task<GetCampaignByIdResponse> Handle(GetCampaignByIdRequest request, CancellationToken cancellationToken)
        {
            var campaign = await _campaignRepository.Get(request.Id, cancellationToken);

            var campaignDto = _mapper.Map<CrowdFunding.Domain.Entities.Campaign>(campaign);

            return new GetCampaignByIdResponse { Campaign = campaignDto };
        }
    }
}
