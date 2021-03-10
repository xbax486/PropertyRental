using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class PopulateTenantsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Tenants (Name, Email, Mobile, RentalId) VALUES ('Jim', 'jimtest@example.com', '0478945612', 1)");
            migrationBuilder.Sql("INSERT INTO Tenants (Name, Email, Mobile, RentalId) VALUES ('Howard', 'howardtest@example.com', '0476125461', 8)");
            migrationBuilder.Sql("INSERT INTO Tenants (Name, Email, Mobile, RentalId) VALUES ('Olivia', 'oliviatest@example.com', '0415346784', 9)");
            migrationBuilder.Sql("INSERT INTO Tenants (Name, Email, Mobile, RentalId) VALUES ('Charlotte', 'charlottetest@example.com', '0465237891', 10)");
            migrationBuilder.Sql("INSERT INTO Tenants (Name, Email, Mobile, RentalId) VALUES ('Amelia', 'ameliatest@example.com', '0417894523', 11)");
            migrationBuilder.Sql("INSERT INTO Tenants (Name, Email, Mobile, RentalId) VALUES ('William', 'williamtest@example.com', '0437618429', 12)");
            migrationBuilder.Sql("INSERT INTO Tenants (Name, Email, Mobile, RentalId) VALUES ('Jason', 'jasontest@example.com', '0456781279', 13)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("TRUNCATE TABLE Tenants");
        }
    }
}
