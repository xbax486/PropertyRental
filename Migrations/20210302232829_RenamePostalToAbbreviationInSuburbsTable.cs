using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class RenamePostalToAbbreviationInSuburbsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Postal",
                table: "Suburbs",
                newName: "Abbreviation");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Abbreviation",
                table: "Suburbs",
                newName: "Postal");
        }
    }
}
