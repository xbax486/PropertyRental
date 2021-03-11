using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class AddTenantRelationshipInRentalsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("TRUNCATE TABLE Rentals");

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "Rentals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Rentals_TenantId",
                table: "Rentals",
                column: "TenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rentals_Tenants_TenantId",
                table: "Rentals",
                column: "TenantId",
                principalTable: "Tenants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentals_Tenants_TenantId",
                table: "Rentals");

            migrationBuilder.DropIndex(
                name: "IX_Rentals_TenantId",
                table: "Rentals");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "Rentals");

            migrationBuilder.Sql("INSERT INTO Rentals (OwnerId, PropertyId, StartDate, EndDate, Payment) VALUES (1, 1, '2018-05-01', '2018-11-01', 250)");
            migrationBuilder.Sql("INSERT INTO Rentals (OwnerId, PropertyId, StartDate, EndDate, Payment) VALUES (2, 2, '2018-05-01', '2018-11-01', 250)");
            migrationBuilder.Sql("INSERT INTO Rentals (OwnerId, PropertyId, StartDate, EndDate, Payment) VALUES (2, 3, '2019-01-30', '2020-01-30', 350)");
            migrationBuilder.Sql("INSERT INTO Rentals (OwnerId, PropertyId, StartDate, EndDate, Payment) VALUES (3, 4, '2018-04-15', '2018-10-30', 200)");
            migrationBuilder.Sql("INSERT INTO Rentals (OwnerId, PropertyId, StartDate, EndDate, Payment) VALUES (1, 5, '2017-12-07', '2018-06-07', 450)");
            migrationBuilder.Sql("INSERT INTO Rentals (OwnerId, PropertyId, StartDate, EndDate, Payment) VALUES (2, 6, '2019-02-10', '2019-11-01', 500)");
            migrationBuilder.Sql("INSERT INTO Rentals (OwnerId, PropertyId, StartDate, EndDate, Payment) VALUES (3, 9, '2020-10-04', '2021-04-10', 490)");
        }
    }
}
