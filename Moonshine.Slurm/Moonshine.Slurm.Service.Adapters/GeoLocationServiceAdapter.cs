using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Moonshine.Slurm.Service.Adapters
{
    public class GeoLocationServiceAdapter
    {
        public string GetGeoLocationCoordinates(string ipAddress)
        {
            //https://freegeoip.net/json/167.246.60.1
            /*"ip":"167.246.60.1","country_code":"US","country_name":"United States",
            "region_code":"NY","region_name":"New York","city":"New York","zip_code":"10014",
            "time_zone":"America/New_York","latitude":40.733,"longitude":-74.0078,"metro_code":501}*/
            using (var client = new WebClient())
            {
                string url = string.Format("https://freegeoip.net/json/{0}", ipAddress);

                var result = client.DownloadString(url);

                return result;
            }
        }
    }
}
