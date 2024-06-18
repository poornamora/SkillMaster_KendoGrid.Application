using Microsoft.AspNetCore.Mvc;
using MVC_Skill_Master.Web.Models;
using System.Diagnostics;

namespace MVC_Skill_Master.Web.Controllers
{
    public class HomeController : Controller
    {


        private readonly IConfiguration _configuration;


        public HomeController(IConfiguration configuration)
        {
            _configuration=configuration;
        }

        public IActionResult SkillMasterFormBooking(string mode = "submit")
        {
            try
            {
                var baseurl = _configuration["Appsettings:BaseUrl"];
                ViewBag.hostname=baseurl;
                ViewBag.Mode = mode;
                return View();
            }
            catch(Exception)
            {
                throw;
            }
        }

        public IActionResult ListPage()
        {
            var baseurl = _configuration["Appsettings:BaseUrl"];
            ViewBag.hostname=baseurl;
            return View("~/views/Home/SkillMasterFormBooking.cshtml");
        }

        [HttpGet]
        public IActionResult GetUpdatePage(string mode = "update")
        {
            var baseurl = _configuration["Appsettings:BaseUrl"];
            ViewBag.hostname=baseurl;

            ViewBag.Mode=mode;
            return View("~/views/Home/SkillMasterFormBooking.cshtml");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
