using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class PopulateRentalsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Rentals (OwnerId, PropertyId, StartDate, EndDate, Payment) VALUES (1, 1, '2018-05-01', '2018-11-01', 250)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("TRUNCATE TABLE Rentals");
        }
    }
}
