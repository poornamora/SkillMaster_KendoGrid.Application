using DAL_Skill_Master.API.Models.DomainModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace DAL_Skill_Master.API.DBDetails
{
    public class ApplicationAPIUser:DbContext
    {
        public ApplicationAPIUser(DbContextOptions<ApplicationAPIUser> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Skill> SkillMasterTbl { get; set; }

        public DbSet<Registration> RegistrationTbl { get; set; }
    }
}
