using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class PopulatePropertyTypesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO PropertyTypes (Name) VALUES ('House')");
            migrationBuilder.Sql("INSERT INTO PropertyTypes (Name) VALUES ('Apartment')");
            migrationBuilder.Sql("INSERT INTO PropertyTypes (Name) VALUES ('Townhouse')");
            migrationBuilder.Sql("INSERT INTO PropertyTypes (Name) VALUES ('Land')");
            migrationBuilder.Sql("INSERT INTO PropertyTypes (Name) VALUES ('Retirement')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("TRUNCATE TABLE PropertyTypes");
        }
    }
}
