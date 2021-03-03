using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class PrepopulateOwnersAddressesPropertiesPropertyTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Owners (Name) VALUES ('Andy')");
            migrationBuilder.Sql("INSERT INTO Owners (Name) VALUES ('James')");

            migrationBuilder.Sql("INSERT INTO PropertyTypes (Name) VALUES ('House')");
            migrationBuilder.Sql("INSERT INTO PropertyTypes (Name) VALUES ('Apartment')");
            migrationBuilder.Sql("INSERT INTO PropertyTypes (Name) VALUES ('Townhouse')");

            migrationBuilder.Sql("INSERT INTO Addresses (Unit, Street, SuburbId) VALUES (101, 'Park Street', 1)");
            migrationBuilder.Sql("INSERT INTO Addresses (Unit, Street, SuburbId) VALUES (202, 'Victoria Road', 3)");
            migrationBuilder.Sql("INSERT INTO Addresses (Unit, Street, SuburbId) VALUES (301, 'Alison Road', 2)");

            migrationBuilder.Sql("INSERT INTO Properties (Bedroom, Bathroom, Parking, PropertyTypeId, AddressId, OwnerId) VALUES (2, 1, 1, 1, 1, (SELECT ID FROM Owners WHERE Name = 'Andy'))");
            migrationBuilder.Sql("INSERT INTO Properties (Bedroom, Bathroom, Parking, PropertyTypeId, AddressId, OwnerId) VALUES (3, 2, 2, 2, 2, (SELECT ID FROM Owners WHERE Name = 'James'))");
            migrationBuilder.Sql("INSERT INTO Properties (Bedroom, Bathroom, Parking, PropertyTypeId, AddressId, OwnerId) VALUES (1, 1, 0, 3, 3, (SELECT ID FROM Owners WHERE Name = 'Andy'))");

            migrationBuilder.Sql("INSERT INTO SetOfFeatures (PropertyId, PetsAllowed, BuiltInWardrobe, GasAvailable, HasStudyRoom, Furnished) VALUES (1, 'true', 'false', 'true', 'true', 'false')");
            migrationBuilder.Sql("INSERT INTO SetOfFeatures (PropertyId, PetsAllowed, BuiltInWardrobe, GasAvailable, HasStudyRoom, Furnished) VALUES (2, 'false', 'true', 'true', 'false', 'true')");
            migrationBuilder.Sql("INSERT INTO SetOfFeatures (PropertyId, PetsAllowed, BuiltInWardrobe, GasAvailable, HasStudyRoom, Furnished) VALUES (3, 'true', 'true', 'false', 'true', 'true')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Properties");
        }
    }
}
