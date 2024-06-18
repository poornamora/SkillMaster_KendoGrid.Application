using System.ComponentModel.DataAnnotations;

namespace DAL_Skill_Master.API.Models.DomainModels
{
    public class Skill
    {

        public int SkillId { get; set; }

        public string? SkillName { get; set; }

        public int NumberofEmployees { get; set; }

        public int RatePerHour { get; set; }

        public string? Remark { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; } = true;
    }
}
