using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Moonshine.Slurm.Service.Adapters;
using Moonshine.Slurm.Web.Models;

namespace Moonshine.Slurm.Web.Controllers
{
    public class SlurmServicesController : Controller
    {
        // GET: SlurmServices
        public JsonResult GetEvents(FaceBookPublicEventRequest request)
        {
            string ip = System.Web.HttpContext.Current.Request.UserHostAddress;

            string accessToken = request.Token;
            DateTime searchDate = Convert.ToDateTime(request.EventDate);

           
            if(ip.Contains("127.0.0.1") || ip.Contains(":1"))
            { 
                ip = "167.246.60.1";
            }
   

            FacebookServiceAdapter facebook = new FacebookServiceAdapter();
            int distance = 400;
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