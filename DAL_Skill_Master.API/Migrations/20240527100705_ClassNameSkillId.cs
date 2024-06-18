using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL_Skill_Master.API.Migrations
{
    /// <inheritdoc />
    public partial class ClassNameSkillId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "skillmasterId",
                table: "SkillMasterTbl",
                newName: "SkillId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SkillId",
                table: "SkillMasterTbl",
                newName: "skillmasterId");
        }
    }
}
