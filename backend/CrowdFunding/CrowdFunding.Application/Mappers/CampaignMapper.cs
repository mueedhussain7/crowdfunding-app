using AutoMapper;
using CrowdFunding.Domain.Entities;

namespace CrowdFunding.Application.Commands.Campaign
{
    public sealed class CampaignMapper : Profile
    {
        public CampaignMapper()
        {
            CreateMap<AddCampaignRequest, CrowdFunding.Domain.Entities.Campaign>();
            CreateMap<CrowdFunding.Domain.Entities.Campaign, AddCampaignResponse>();
        }
    }
    
}


