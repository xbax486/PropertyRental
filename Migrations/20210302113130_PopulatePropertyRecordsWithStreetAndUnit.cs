using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class PopulatePropertyRecordsWithStreetAndUnit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET Unit = '101', Street = 'Park Street' WHERE Id = 1");
            migrationBuilder.Sql("UPDATE Properties SET Unit = '202', Street = 'Railway Crescent' WHERE Id = 2");
            migrationBuilder.Sql("UPDATE Properties SET Unit = '303', Street = 'Alison Road' WHERE Id = 3");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET Unit = '', Street = '' WHERE Id = 1");
            migrationBuilder.Sql("UPDATE Properties SET Unit = '', Street = '' WHERE Id = 2");
            migrationBuilder.Sql("UPDATE Properties SET Unit = '', Street = '' WHERE Id = 3");
        }
    }
}
