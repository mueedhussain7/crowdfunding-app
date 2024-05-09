using System;

namespace CrowdFunding.Domain.Entities
{
    public sealed class Campaign : BaseEntity
    {
        public string ImageUrl { get; set; }
        public string OwnerAddress { get; set; }
        public string? TransactionHash { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }

    }
}
