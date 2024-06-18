using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MVC_Skill_Master.Web.Controllers;

namespace MVC_Skill_Master.Web.CustomFilters
{
    public class CustomAuthorizationFilterAttribute:ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var user = context.HttpContext.Session.GetString("User");

            if(user == null )
            {
                context.Result=new RedirectToActionResult("Login","Account",null);
            }
        }
    }
}
