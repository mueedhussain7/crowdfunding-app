using MediatR;
using AutoMapper;
using CrowdFunding.Application.Repositories;
using CrowdFunding.Domain.Entities;
using System;

namespace CrowdFunding.Application.Commands.Campaign
{
    public class DeleteCampaignHandler : IRequestHandler<DeleteCampaignRequest, DeleteCampaignResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICampaignRepository _campaignRepository;
        private readonly IMapper _mapper;

        public DeleteCampaignHandler(IUnitOfWork unitOfWork, ICampaignRepository campaignRepository, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _campaignRepository = campaignRepository;
            _mapper = mapper;
        }

        public async Task<DeleteCampaignResponse> Handle(DeleteCampaignRequest request, CancellationToken cancellationToken)
        {
            // Fetch the campaign entity from the repository
            var campaign = await _campaignRepository.Get(request.Id, cancellationToken);

            if (campaign == null)
            {
                throw new Exception("Campaign not Found");
            }

            // Delete the campaign entity in the repository
            _campaignRepository.Delete(campaign);
            await _unitOfWork.Save(cancellationToken);

            // Return the Deleted campaign entity in the response
            return new DeleteCampaignResponse
            {
                Campaign = campaign
            };
        }
    }
}
