using DAL_Skill_Master.API.DBDetails;
using DAL_Skill_Master.API.Models.DomainModels;
using DAL_Skill_Master.API.Models.DTOModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DAL_Skill_Master.API.RepositoryDetails
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private readonly ApplicationAPIUser _applicationAPIUser;
        
        public AuthenticationRepository(ApplicationAPIUser applicationAPIUser)
        {
            _applicationAPIUser= applicationAPIUser;
            
        }
        public async Task<ActionResult<Registration>> AddUsers(Registration user)
        {
            try
            {
                Registration registration = new Registration();
                registration.Name = user.Name;
                registration.EmailId = user.EmailId;
                registration.Password = user.Password;
                registration.ConformPassword = user.ConformPassword;

                _applicationAPIUser.RegistrationTbl.Add(registration);
                await _applicationAPIUser.SaveChangesAsync();
                return registration;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool AuthenticatedUser(LoginDTO loginDTO)
        {
            try
            {
                if (loginDTO!=null)
                {
                    var isSuccess = _applicationAPIUser.RegistrationTbl.Where(i => i.EmailId==loginDTO.EmailId && i.Password==loginDTO.Password).FirstOrDefault(a=>a.IsDeleted==true);

                    if (isSuccess!=null)
                    {
                        return true;
                    }
                    return false;
                }
                return false;
            }

            catch (Exception)
            {
                throw;
            }
        }
    }
}
