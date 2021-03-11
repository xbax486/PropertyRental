using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class RemoveRentalIdFromTenantsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tenants_Rentals_RentalId",
                table: "Tenants");

            migrationBuilder.DropIndex(
                name: "IX_Tenants_RentalId",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "RentalId",
                table: "Tenants");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RentalId",
                table: "Tenants",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Tenants_RentalId",
                table: "Tenants",
                column: "RentalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tenants_Rentals_RentalId",
                table: "Tenants",
                column: "RentalId",
                principalTable: "Rentals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
