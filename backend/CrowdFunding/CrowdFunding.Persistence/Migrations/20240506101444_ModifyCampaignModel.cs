using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrowdFunding.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ModifyCampaignModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OnChainId",
                table: "Campaigns");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OnChainId",
                table: "Campaigns",
                type: "longtext",
                nullable: false);
        }
    }
}
