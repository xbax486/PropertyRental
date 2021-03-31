using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class UpdateAvailablePropertiesAfterFixingRentalUpdateBug : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET Available = 'TRUE' WHERE Id in (1, 3, 4, 6, 9, 11, 15, 17)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET Available = 'FALSE' WHERE Id in (1, 3, 4, 6, 9, 11, 15, 17)");
        }
    }
}
