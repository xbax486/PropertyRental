using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class RemoveDuplicateSuburb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Suburbs WHERE Id = 5");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Suburbs (Name, Postcode, State, Abbreviation) VALUES ('Richmond', 3121, 'Victoria', 'VIC')");
        }
    }
}
