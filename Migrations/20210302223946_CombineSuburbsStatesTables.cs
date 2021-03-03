using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class CombineSuburbsStatesTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Suburbs_States_StateId",
                table: "Suburbs");

            migrationBuilder.DropTable(
                name: "States");

            migrationBuilder.DropIndex(
                name: "IX_Suburbs_StateId",
                table: "Suburbs");

            migrationBuilder.DropColumn(
                name: "StateId",
                table: "Suburbs");

            migrationBuilder.AddColumn<string>(
                name: "Postal",
                table: "Suburbs",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Suburbs",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Postal",
                table: "Suburbs");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Suburbs");

            migrationBuilder.AddColumn<int>(
                name: "StateId",
                table: "Suburbs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "States",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_States", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Suburbs_StateId",
                table: "Suburbs",
                column: "StateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Suburbs_States_StateId",
                table: "Suburbs",
                column: "StateId",
                principalTable: "States",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
