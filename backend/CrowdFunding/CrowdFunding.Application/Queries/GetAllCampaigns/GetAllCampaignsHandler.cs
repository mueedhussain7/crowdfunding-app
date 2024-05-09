using AutoMapper;
using CrowdFunding.Application.Repositories;
using CrowdFunding.Domain.Entities;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CrowdFunding.Application.Queries.Campaign
{
    public class GetAllCampaignsHandler : IRequestHandler<GetAllCampaignsRequest, GetAllCampaignsResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICampaignRepository _campaignRepository;
        private readonly IMapper _mapper;

        public GetAllCampaignsHandler(IUnitOfWork unitOfWork, ICampaignRepository CampaignRepository, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _campaignRepository = CampaignRepository;
            _mapper = mapper;
        }

        public async Task<GetAllCampaignsResponse> Handle(GetAllCampaignsRequest request, CancellationToken cancellationToken)
        {
            var Campaigns = await _campaignRepository.GetAll(cancellationToken);
            var CampaignDtos = _mapper.Map<List<CrowdFunding.Domain.Entities.Campaign>>(Campaigns);

            return new GetAllCampaignsResponse { Campaigns = CampaignDtos };
        }
    }
}
