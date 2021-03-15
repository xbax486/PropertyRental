using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class UpdateAvailableRecordsInPropertiesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET Available = 'FALSE' WHERE Id in (1, 2, 3, 4, 5, 6, 9, 11)");
            migrationBuilder.Sql("UPDATE Properties SET Available = 'TRUE' WHERE Id in (12, 13, 14, 15, 16, 17)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET Available = 'FALSE' WHERE Id in (1, 2, 3, 5, 6, 9, 11)");
            migrationBuilder.Sql("UPDATE Properties SET Available = 'TRUE' WHERE Id in (4, 12, 13, 14, 15, 16, 17)");
        }
    }
}
