using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MVC_Skill_Master.Web.Models
{
    public class UserRegistration
    {
        [Key]

        [Required]
        public int Id { get; set; }

        [Column(TypeName = "varchar(100)")]
        [Display(Name = "Name")]
        [Required(ErrorMessage = "Please Enter Name")]
        
        public string? Name { get; set; }


        [Column(TypeName = "varchar(120)")]
        [RegularExpression(@"^([0-9a-zA-Z]([\+\-_\.][0-9a-zA-Z]+)*)+@(([0-9a-zA-Z][-\w]*[0-9a-zA-Z]*\.)+[a-zA-Z0-9]{2,3})$", ErrorMessage = "Enter valid Email")]
        public string? Email { get; set; }

        [Column(TypeName = "varchar(200)")]
        [Required(ErrorMessage = "Please Enter Password")]
        [DataType(DataType.Password)]
        public string? Password { get; set; }

        [Column(TypeName = "varchar(200)")]
        [Required(ErrorMessage = "Please Enter Conform Password")]
        [DataType(DataType.Password)]
        [Display(Name = "Conform Password")]
        [Compare("Password")]
        [NotMapped]
        public string? ConformPassword { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
