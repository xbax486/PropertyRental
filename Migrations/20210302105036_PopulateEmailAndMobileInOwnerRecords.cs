using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyRental.Migrations
{
    public partial class PopulateEmailAndMobileInOwnerRecords : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Owners SET Email = 'andy123@example.com', Mobile = '61432165789' WHERE Id = 1");
            migrationBuilder.Sql("UPDATE Owners SET Email = 'james456@example.com', Mobile = '61432165789' WHERE Id = 2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Owners SET Email = '', Mobile = '' WHERE Id = 1");
            migrationBuilder.Sql("UPDATE Owners SET Email = '', Mobile = '' WHERE Id = 2");
        }
    }
}
