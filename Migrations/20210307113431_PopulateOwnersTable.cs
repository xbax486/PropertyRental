using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class PopulateOwnersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Owners (Name, Email, Mobile) VALUES ('Andy', 'andytest@gmail.com', '0491570156')");
            migrationBuilder.Sql("INSERT INTO Owners (Name, Email, Mobile) VALUES ('James', 'jamestest@gmail.com', '0471160157')");
            migrationBuilder.Sql("INSERT INTO Owners (Name, Email, Mobile) VALUES ('Kenny', 'kennytest@gmail.com', '0451270148')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("TRUNCATE TABLE Owners");
        }
    }
}
