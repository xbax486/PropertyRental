using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class UpdatePropertiesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Addresses_AddressId",
                table: "Properties");

            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Owners_OwnerId",
                table: "Properties");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "SetOfFeatures");

            migrationBuilder.DropIndex(
                name: "IX_Properties_AddressId",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Properties");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Properties",
                newName: "SuburbId");

            migrationBuilder.RenameIndex(
                name: "IX_Properties_OwnerId",
                table: "Properties",
                newName: "IX_Properties_SuburbId");

            migrationBuilder.AddColumn<bool>(
                name: "BuiltInWardrobe",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Furnished",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "GasAvailable",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasStudyRoom",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PetsAllowed",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Street",
                table: "Properties",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Unit",
                table: "Properties",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Suburbs_SuburbId",
                table: "Properties",
                column: "SuburbId",
                principalTable: "Suburbs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Suburbs_SuburbId",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "BuiltInWardrobe",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "Furnished",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "GasAvailable",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "HasStudyRoom",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "PetsAllowed",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "Street",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "Unit",
                table: "Properties");

            migrationBuilder.RenameColumn(
                name: "SuburbId",
                table: "Properties",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Properties_SuburbId",
                table: "Properties",
                newName: "IX_Properties_OwnerId");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "Properties",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Street = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    SuburbId = table.Column<int>(type: "int", nullable: false),
                    Unit = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Addresses_Suburbs_SuburbId",
                        column: x => x.SuburbId,
                        principalTable: "Suburbs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SetOfFeatures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BuiltInWardrobe = table.Column<bool>(type: "bit", nullable: false),
                    Furnished = table.Column<bool>(type: "bit", nullable: false),
                    GasAvailable = table.Column<bool>(type: "bit", nullable: false),
                    HasStudyRoom = table.Column<bool>(type: "bit", nullable: false),
                    PetsAllowed = table.Column<bool>(type: "bit", nullable: false),
                    PropertyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SetOfFeatures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SetOfFeatures_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Properties_AddressId",
                table: "Properties",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_SuburbId",
                table: "Addresses",
                column: "SuburbId");

            migrationBuilder.CreateIndex(
                name: "IX_SetOfFeatures_PropertyId",
                table: "SetOfFeatures",
                column: "PropertyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Addresses_AddressId",
                table: "Properties",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Owners_OwnerId",
                table: "Properties",
                column: "OwnerId",
                principalTable: "Owners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
