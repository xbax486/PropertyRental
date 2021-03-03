using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class PopulatePropertyRecords : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET PetsAllowed = 'true', GasAvailable = 'true', HasStudyRoom = 'true' WHERE Id = 1");
            migrationBuilder.Sql("UPDATE Properties SET BuiltInWardrobe = 'true', GasAvailable = 'true', Furnished = 'true' WHERE Id = 2");
            migrationBuilder.Sql("UPDATE Properties SET PetsAllowed = 'true', BuiltInWardrobe = 'true', HasStudyRoom = 'true', Furnished = 'true' WHERE Id = 3");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Properties SET PetsAllowed = 'false', GasAvailable = 'false', HasStudyRoom = 'false' WHERE Id = 1");
            migrationBuilder.Sql("UPDATE Properties SET BuiltInWardrobe = 'false', GasAvailable = 'false', Furnished = 'false' WHERE Id = 2");
            migrationBuilder.Sql("UPDATE Properties SET PetsAllowed = 'false', BuiltInWardrobe = 'false', HasStudyRoom = 'false', Furnished = 'false' WHERE Id = 3");
        }
    }
}
