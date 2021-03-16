using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class UpdateAvailableColumnOfAllRecordsInPropertiesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET Available = 'TRUE' WHERE Id in (11, 14, 15, 16, 23)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET Available = 'FALSE' WHERE Id in (11, 14, 15, 16, 23)");
        }
    }
}
