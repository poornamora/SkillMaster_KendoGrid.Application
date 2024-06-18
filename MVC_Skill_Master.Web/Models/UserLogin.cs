using System.ComponentModel.DataAnnotations;

namespace MVC_Skill_Master.Web.Models
{
    public class UserLogin
    {
        [Key]
        public int Id { get; set; }

        public string? Email { get; set; }


        public string? Password { get; set; }
    }
}
