using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class UpdateAvailableForProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET Available = 'TRUE' WHERE Id in (1, 2, 9)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET Available = 'FALSE' WHERE Id in (1, 2, 9)");
        }
    }
}
