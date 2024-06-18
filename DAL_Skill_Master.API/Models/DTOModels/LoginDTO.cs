using System.ComponentModel.DataAnnotations.Schema;

namespace DAL_Skill_Master.API.Models.DTOModels
{
    public class LoginDTO
    {
        public string? EmailId { get; set; }

        public string? Password { get; set; }
    }
}
