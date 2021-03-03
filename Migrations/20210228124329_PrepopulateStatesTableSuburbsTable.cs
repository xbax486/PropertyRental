using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class PrepopulateStatesTableSuburbsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO States (Name, Code) VALUES ('New South Wales', 'NSW')");
            migrationBuilder.Sql("INSERT INTO States (Name, Code) VALUES ('Victoria', 'VIC')");

            migrationBuilder.Sql("INSERT INTO Suburbs (Name, Postcode, StateId) VALUES ('Sydney', 2000, 1)");
            migrationBuilder.Sql("INSERT INTO Suburbs (Name, Postcode, StateId) VALUES ('Randwick', 2031, 1)");
            migrationBuilder.Sql("INSERT INTO Suburbs (Name, Postcode, StateId) VALUES ('Melbourne', 3000, 2)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM States");
        }
    }
}
