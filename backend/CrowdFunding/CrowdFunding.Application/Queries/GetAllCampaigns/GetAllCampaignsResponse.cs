using System;
using System.Collections.Generic;
using CrowdFunding.Domain.Entities; // Assuming 'Campaign' is in this namespace

namespace CrowdFunding.Application.Queries.Campaign
{
    public class GetAllCampaignsResponse
    {
        public List<CrowdFunding.Domain.Entities.Campaign> Campaigns { get; set; }

        public GetAllCampaignsResponse()
        {
            Campaigns = new List<CrowdFunding.Domain.Entities.Campaign>();
        }
    }
}
