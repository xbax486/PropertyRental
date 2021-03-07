using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class PopulatePropertiesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Properties (Unit, Street, SuburbId, PropertyTypeId, OwnerId, Bedroom, Bathroom, Parking, PetsAllowed, BuiltInWardrobe, GasAvailable, HasStudyRoom, Furnished) VALUES ('101', '13 Park Street', 1, 1, 2, 3, 2, 2, 'TRUE', 'FALSE', 'TRUE', 'FALSE', 'TRUE')");
            migrationBuilder.Sql("INSERT INTO Properties (Unit, Street, SuburbId, PropertyTypeId, OwnerId, Bedroom, Bathroom, Parking, PetsAllowed, BuiltInWardrobe, GasAvailable, HasStudyRoom, Furnished) VALUES ('202', '14 Alison Road', 2, 2, 1, 1, 1, 0, 'FALSE', 'FALSE', 'TRUE', 'FALSE', 'FALSE')");
            migrationBuilder.Sql("INSERT INTO Properties (Unit, Street, SuburbId, PropertyTypeId, OwnerId, Bedroom, Bathroom, Parking, PetsAllowed, BuiltInWardrobe, GasAvailable, HasStudyRoom, Furnished) VALUES ('33', '25 Railway Crescent', 3, 2, 2, 2, 1, 2, 'TRUE', 'TRUE', 'TRUE', 'TRUE', 'TRUE')");
            migrationBuilder.Sql("INSERT INTO Properties (Unit, Street, SuburbId, PropertyTypeId, OwnerId, Bedroom, Bathroom, Parking, PetsAllowed, BuiltInWardrobe, GasAvailable, HasStudyRoom, Furnished) VALUES ('45', '54 Middle Lane', 4, 4, 3, 2, 2, 1, 'TRUE', 'FALSE', 'TRUE', 'TRUE', 'TRUE')");
            migrationBuilder.Sql("INSERT INTO Properties (Unit, Street, SuburbId, PropertyTypeId, OwnerId, Bedroom, Bathroom, Parking, PetsAllowed, BuiltInWardrobe, GasAvailable, HasStudyRoom, Furnished) VALUES ('6', '36 Barker Street', 5, 5, 3, 1, 1, 1, 'TRUE', 'FALSE', 'TRUE', 'FALSE', 'TRUE')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("TRUNCATE TABLE Properties");
        }
    }
}
