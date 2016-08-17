using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Moonshine.Slurm.Service.Adapters.Common;

namespace Moonshine.Slurm.Service.Adapters
{
    public class FacebookServiceAdapter
    {
        public List<FacebookEvent> GetPublicServiceEvents(string ipAddress, string accessToken, DateTime searchDate, int distance = 100, int limit = 1000)
        {
            //get lat/long from ip
            GeoLocationServiceAdapter geo = new GeoLocationServiceAdapter();
            string geoResult = geo.GetGeoLocationCoordinates(ipAddress);

            JObject json = JObject.Parse(geoResult);

            string latitude = (string)json["latitude"];
            string longtitude = (string)json["longitude"];
                               
            //get events for this lat/long
            using (var client = new WebClient())
            {
                //This will just return a list of Place IDs
                /* placeUrl = "https://graph.facebook.com/v2.7/search?type=place&q=&center=" + req.query.lat + "," 
                     + req.query.lng + "&distance=" + req.query.distance + "&limit=1000&fields=id&access_token=" 
                     + req.query.access_token;*/
                string url = string.Format("https://graph.facebook.com/v2.7/search?type=place&q=&fields=id&center={0},{1}&distance={2}&limit={3}&access_token={4}", latitude, longtitude, distance, limit, accessToken);

                var result = client.DownloadString(url);
                var places = JsonConvert.DeserializeObject<FacebookPlaceData>(result);

                //create a comma-delimited array of ids
                string ids = "";
                int currentNumber = 0;
                foreach (var place in places.data)
                {
                    ids = string.Format("{0},{1}", ids, place.id);

                    currentNumber++;
                    if (currentNumber == 50) break; //hard-stop at 50 due to maximum request limit
                }

                if (ids.Length > 0)
                {
                    ids = ids.Remove(0, 1);
                }

                //go get the events for these places                
                /* https://graph.facebook.com/v2.7/?ids=" + idArray.join(",") + "&fields=id,name,cover.fields(id,source),picture.type(large),location,events.fields(id,name,cover.fields(id,source),picture.type(large),description,start_time,attending_count,declined_count,maybe_count,noreply_count).since(" + currentTimestamp + ")&access_token=" + req.query.access_token)) */

                url = string.Format("https://graph.facebook.com/v2.7/?ids={0}&access_token={1}&fields=id,name,location,events.fields(id,name,cover.fields(id,source),picture.type(large),description,start_time)", ids, accessToken);
                result = client.DownloadString(url);

                var placesWithEvents = new List<FacebookPlaceWithEvents>();
                var filteredEvents = new List<FacebookEvent>();

                for (int i = 0; i < places.data.Length - 1; i++) //HACK:  discarding the last one!
                {
                    try
                    {
                        var place1 = places.data[i];
                        var place2 = places.data[i + 1];

                        int pos1 = result.IndexOf(place1.id) + place1.id.Length + 2;
                        result = result.Remove(0, pos1);

                        int pos2 = result.IndexOf(place2.id) - 2;

                        var placeWithEvents = result.Substring(0, pos2);

                        var theEvent = JsonConvert.DeserializeObject<FacebookPlaceWithEvents>(placeWithEvents);
                        
                        if (theEvent.events != null && theEvent.events.data.Length > 0)
                        {
                            foreach(var targetEvent in theEvent.events.data)
                            {
                                if (targetEvent.start_time.Month == searchDate.Month )
                                {
                                    filteredEvents.Add(targetEvent);
                                }
                            }

                            //placesWithEvents.Add(theEvent);
                        }
                    }
                    catch
                    {
                        //bury this one
                    }
                }

                return filteredEvents;
            }
        }

        public void GetPrivateServiceEvents()
        {

        }
    }
}
