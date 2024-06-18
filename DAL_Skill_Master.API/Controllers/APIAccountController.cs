using DAL_Skill_Master.API.DBDetails;
using DAL_Skill_Master.API.Models.DomainModels;
using DAL_Skill_Master.API.Models.DTOModels;
using DAL_Skill_Master.API.RepositoryDetails;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DAL_Skill_Master.API.Controllers
{
    public class APIAccountController : ControllerBase
    {
        private readonly ApplicationAPIUser _context;
        private readonly IAuthenticationRepository _authentication;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public APIAccountController(ApplicationAPIUser context, IAuthenticationRepository authentication, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _authentication = authentication;
            _httpContextAccessor=httpContextAccessor;
        }

        [HttpPost, Route("api/Account/Registration")]
        public async Task<ActionResult<Registration>> Register(Registration registration)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    Registration obj = new Registration();
                    obj.Name= registration.Name;
                    obj.EmailId= registration.EmailId;
                    obj.Password= registration.Password;
                    obj.ConformPassword= registration.ConformPassword;

                    await _authentication.AddUsers(obj);
                }
                return Ok(ModelState);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet,Route("api/Account/Login")]
        public IActionResult Login(string email, string password) 
        {
            try
            {
                if (!string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(password))
                {
                    LoginDTO logindto = new LoginDTO
                    {
                        EmailId = email,
                        Password = password
                    };

                    bool isSuccess = _authentication.AuthenticatedUser(logindto);

                    if (isSuccess)
                    { 
                        return Ok("User authenticated successfully.");
                    }
                    else
                    {
                        return Unauthorized(StatusCodes.Status401Unauthorized);
                    }
                }
                else
                {
                    // Invalid parameters
                    return BadRequest("Email and password are required.");
                }
            }
            catch (Exception)
            {
                // Exception occurred during authentication
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}
