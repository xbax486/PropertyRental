using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class PopulateSuburbsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Suburbs (Name, Postcode, StateId) VALUES ('Sydney', 2000, 2)");
            migrationBuilder.Sql("INSERT INTO Suburbs (Name, Postcode, StateId) VALUES ('Jannali', 2226, 2)");
            migrationBuilder.Sql("INSERT INTO Suburbs (Name, Postcode, StateId) VALUES ('Burwood', 2134, 2)");
            migrationBuilder.Sql("INSERT INTO Suburbs (Name, Postcode, StateId) VALUES ('Richmond', 3121, 5)");
            migrationBuilder.Sql("INSERT INTO Suburbs (Name, Postcode, StateId) VALUES ('Abbotsford', 3067, 5)");
            migrationBuilder.Sql("INSERT INTO Suburbs (Name, Postcode, StateId) VALUES ('Brisbane', 4000, 4)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("TRUNCATE TABLE States");
        }
    }
}
