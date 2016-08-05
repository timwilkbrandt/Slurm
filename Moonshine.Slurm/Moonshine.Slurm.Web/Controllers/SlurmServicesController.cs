using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Moonshine.Slurm.Service.Adapters;

namespace Moonshine.Slurm.Web.Controllers
{
    public class SlurmServicesController : Controller
    {
        // GET: SlurmServices
        public JsonResult GetEvents()
        {
            string ip = string.Empty;
            string accessToken = "EAACEdEose0cBAHYsLfGqezwqZAN3azuWeOUgzovwpJxITqylAdZC2jCl7UrZBTKckIbhXMsXoaob0tv4Y0dcz7lMsA1Btv8hfPzS0gNIw2zkEavU9PhphDU2nodKYN9uGg6ZAcZBIA1U7yWB9fcb4F7bz8bArel0DKOjob9U0ZAgZDZD";
            DateTime searchDate = DateTime.UtcNow;

            if (Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null)
            {
                ip = Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
            }
            else if (Request.UserHostAddress.Length != 0)
            {
                ip = Request.UserHostAddress;
            }

            ip = "167.246.60.1";

            FacebookServiceAdapter facebook = new FacebookServiceAdapter();
            int distance = 200;
            int limit = 1000;

            var result = facebook.GetPublicServiceEvents(ip, accessToken, searchDate, distance, limit);

            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveSelectedEvent()
        {
            return null;
        }

        public JsonResult GetTrendingEvent()
        {
            var trendingEvent = new Models.TrendingEvent();
            return Json(trendingEvent.GetTrendingEvents());
        }
    }
}