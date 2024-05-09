using MediatR;
using AutoMapper;
using CrowdFunding.Application.Repositories;
using CrowdFunding.Domain.Entities;

namespace CrowdFunding.Application.Commands.Campaign
{
    public class AddCampaignHandler : IRequestHandler<AddCampaignRequest, AddCampaignResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICampaignRepository _campaignRepository;
        private readonly IMapper _mapper;

        public AddCampaignHandler(IUnitOfWork unitOfWork, ICampaignRepository campaignRepository, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _campaignRepository = campaignRepository;
            _mapper = mapper;
        }

        public async Task<AddCampaignResponse> Handle(AddCampaignRequest request, CancellationToken cancellationToken)
        {
            var campaign = _mapper.Map<CrowdFunding.Domain.Entities.Campaign>(request);
            _campaignRepository.Create(campaign);
            await _unitOfWork.Save(cancellationToken);

            return _mapper.Map<AddCampaignResponse>(campaign);
        }
    }
}
