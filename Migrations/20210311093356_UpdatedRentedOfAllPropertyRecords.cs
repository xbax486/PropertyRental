using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class UpdatedRentedOfAllPropertyRecords : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET Rented = 'TRUE' WHERE Id in (1, 2, 3, 4, 5, 6, 9, 11)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET Rented = 'FALSE' WHERE Id in (1, 2, 3, 4, 5, 6, 9, 11)");
        }
    }
}
