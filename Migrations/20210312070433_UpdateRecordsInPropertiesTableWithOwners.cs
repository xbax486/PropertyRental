using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class UpdateRecordsInPropertiesTableWithOwners : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET OwnerId = 1 WHERE Id in (1, 3)");
            migrationBuilder.Sql("UPDATE Properties SET OwnerId = 2 WHERE Id in (4, 6, 9, 11, 13)");
            migrationBuilder.Sql("UPDATE Properties SET OwnerId = 3 WHERE Id in (2, 5, 12)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET OwnerId = NULL");
        }
    }
}
