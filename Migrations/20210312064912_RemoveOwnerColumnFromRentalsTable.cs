using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class RemoveOwnerColumnFromRentalsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentals_Owners_OwnerId",
                table: "Rentals");

            migrationBuilder.DropIndex(
                name: "IX_Rentals_OwnerId",
                table: "Rentals");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Rentals");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OwnerId",
                table: "Rentals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Rentals_OwnerId",
                table: "Rentals",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rentals_Owners_OwnerId",
                table: "Rentals",
                column: "OwnerId",
                principalTable: "Owners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
