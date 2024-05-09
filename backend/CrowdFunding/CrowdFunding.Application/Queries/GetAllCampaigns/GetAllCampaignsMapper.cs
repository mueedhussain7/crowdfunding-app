using System;
using AutoMapper;
using CrowdFunding.Domain.Entities;

namespace CrowdFunding.Application.Queries.Campaign
{
	public class GetAllCampaignsMapper:Profile
    {
		public GetAllCampaignsMapper()
		{
            CreateMap<CrowdFunding.Domain.Entities.Campaign, GetAllCampaignsResponse>();
        }
	}
}