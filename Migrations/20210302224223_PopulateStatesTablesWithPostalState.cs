using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class PopulateStatesTablesWithPostalState : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Suburbs SET Postal = 'NSW', State = 'New South Wales' WHERE Id = 1");
            migrationBuilder.Sql("UPDATE Suburbs SET Postal = 'NSW', State = 'New South Wales' WHERE Id = 2");
            migrationBuilder.Sql("UPDATE Suburbs SET Postal = 'VIC', State = 'Victoria' WHERE Id = 3");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Suburbs SET Postal = '', State = '' WHERE Id = 1");
            migrationBuilder.Sql("UPDATE Suburbs SET Postal = '', State = '' WHERE Id = 2");
            migrationBuilder.Sql("UPDATE Suburbs SET Postal = '', State = '' WHERE Id = 3");
        }
    }
}
