using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;


namespace MVC_Skill_Master.Web.Controllers
{
    public class AccountController : Controller
    {



        private readonly IConfiguration _configuration;
        public AccountController(IConfiguration configuration)
        {
            _configuration=configuration;
        }

        [HttpGet]
        public IActionResult Register(string mode = "submit")
        {
            try
            {
                var Baseurl = _configuration["Appsettings:BaseUrl"];
                ViewBag.hostname=Baseurl;

                ViewBag.Mode=mode;
                return View("~/Views/Account/Register.cshtml");
            }
            catch (Exception)
            {
                throw;
            }
        }


        



        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login()
        {
            try
            {
                var Baseurl = _configuration["Appsettings:BaseUrl"];
                ViewBag.hostname=Baseurl;
                return View("~/Views/Account/Login.cshtml");
            }
            catch (Exception)
            {
                throw;
            }
        }

        
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login", "Account");
        }
    }
}
