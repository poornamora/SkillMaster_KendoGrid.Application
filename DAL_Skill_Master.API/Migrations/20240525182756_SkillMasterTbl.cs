using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL_Skill_Master.API.Migrations
{
    /// <inheritdoc />
    public partial class SkillMasterTbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SkillMasterTbl",
                columns: table => new
                {
                    skillmasterId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SkillName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NumberofEmployees = table.Column<int>(type: "int", nullable: false),
                    RatePerHour = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SkillMasterTbl", x => x.skillmasterId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SkillMasterTbl");
        }
    }
}
