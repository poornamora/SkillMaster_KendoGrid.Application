using DAL_Skill_Master.API.Models.DomainModels;
using DAL_Skill_Master.API.Models.DTOModels;
using Microsoft.AspNetCore.Mvc;

namespace DAL_Skill_Master.API.RepositoryDetails
{
    public interface IAuthenticationRepository
    {
        Task<ActionResult<Registration>> AddUsers(Registration user);

        bool AuthenticatedUser(LoginDTO loginDTO);
    }
}
