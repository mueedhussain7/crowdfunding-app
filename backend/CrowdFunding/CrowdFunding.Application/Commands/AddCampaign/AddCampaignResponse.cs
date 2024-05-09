namespace CrowdFunding.Application.Commands.Campaign
{
    public sealed record AddCampaignResponse
    {
        public Guid Id { get; set; }
        public string ImageUrl { get; set; }
        public string OwnerAddress { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
    }
}