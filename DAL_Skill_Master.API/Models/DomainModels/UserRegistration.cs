using System.ComponentModel.DataAnnotations.Schema;

namespace DAL_Skill_Master.API.Models.DomainModels
{
    public class Registration
    {

        public int RegistrationId { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string? Name { get; set; }


        [Column(TypeName = "varchar(100)")]
        
        public string? EmailId { get; set; }

        [Column(TypeName = "varchar(100)")]
      
        public string? Password { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string? ConformPassword { get; set; }

        public bool IsDeleted { get; set; } = true;
    }
}
