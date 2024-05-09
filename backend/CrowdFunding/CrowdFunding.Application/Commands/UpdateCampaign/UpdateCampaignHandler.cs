using MediatR;
using AutoMapper;
using CrowdFunding.Application.Repositories;
using CrowdFunding.Domain.Entities;
using System;

namespace CrowdFunding.Application.Commands.Campaign
{
    public class UpdateCampaignHandler : IRequestHandler<UpdateCampaignRequest, UpdateCampaignResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICampaignRepository _campaignRepository;
        private readonly IMapper _mapper;

        public UpdateCampaignHandler(IUnitOfWork unitOfWork, ICampaignRepository campaignRepository, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _campaignRepository = campaignRepository;
            _mapper = mapper;
        }

        public async Task<UpdateCampaignResponse> Handle(UpdateCampaignRequest request, CancellationToken cancellationToken)
        {
            // Fetch the campaign entity from the repository
            var campaign = await _campaignRepository.Get(request.Id, cancellationToken);

            if (campaign == null)
            {
                throw new Exception("Campaign not Found");
            }

            // Update only the provided fields
            campaign.ImageUrl = request.ImageUrl ?? campaign.ImageUrl;
            campaign.Description = request.Description ?? campaign.Description;
            campaign.TransactionHash = request.TransactionHash ?? campaign.TransactionHash;

            // Update the campaign entity in the repository
            _campaignRepository.Update(campaign);
            await _unitOfWork.Save(cancellationToken);

            // Return the updated campaign entity in the response
            return new UpdateCampaignResponse
            {
                Campaign = campaign
            };
        }
    }
}
