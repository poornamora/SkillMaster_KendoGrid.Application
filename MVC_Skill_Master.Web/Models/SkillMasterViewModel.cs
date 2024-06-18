using System.ComponentModel.DataAnnotations;

namespace MVC_Skill_Master.Web.Models
{
    public class SkillMasterViewModel
    {
        [Key]
        public int skillmasterId { get; set; }

        public string? SkillName { get; set; }

        public int NumberofEmployees { get; set; }

        public double RatePerHour { get; set; }

        public string? Remark { get; set; }
                
        public bool IsActive {get;set;}
    }
}
