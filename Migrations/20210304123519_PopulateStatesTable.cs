using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class PopulateStatesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO States (Name, Acronym) VALUES ('Australian Capital Territory', 'ACT')");
            migrationBuilder.Sql("INSERT INTO States (Name, Acronym) VALUES ('New South Wales', 'NSW')");
            migrationBuilder.Sql("INSERT INTO States (Name, Acronym) VALUES ('Northern Territory', 'NT')");
            migrationBuilder.Sql("INSERT INTO States (Name, Acronym) VALUES ('Queensland', 'QLD')");
            migrationBuilder.Sql("INSERT INTO States (Name, Acronym) VALUES ('Victoria', 'VIC')");
            migrationBuilder.Sql("INSERT INTO States (Name, Acronym) VALUES ('Tasmania', 'TAS')");
            migrationBuilder.Sql("INSERT INTO States (Name, Acronym) VALUES ('Western Australia', 'WA')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("TRUNCATE TABLE States");
        }
    }
}
