using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moonshine.Slurm.Service.Adapters.Common
{
    public class FacebookPlaceData
    {
        public Place[] data;
    }

    public class FacebookPlaceWithEvents
    {
        public string id;
        public string name;
        public Location location;
        public FacebookEventData events;
    }

    public class FacebookEventData
    {
        public FacebookEvent[] data;
    }

    public class FacebookEvent
    {
        private DateTime _startTime;

        public string id;
        public string name;
        public string description;
        public DateTime start_time { get { return _startTime; } set { _startTime = value; formatted_start_time = string.Format("{0}-{1}", value.Month, value.Day); } }
        public string formatted_start_time;
        public Cover cover;
        public PictureData picture;

    }

    public class Cover
    {
        public string id;
        public string source;
    }

    public class PictureData
    {
        public Picture data;
    }

    public class Picture
    {
        public bool is_silhouette;
        public string url;
    }

    public class Place
    {
        public string id;
        public string name;
        public Location location;
    }

    public class Location
    {
        public string street;
        public string city;
        public string state;
        public string country;
        public string zip;
        public string latitude;
        public string longitude;
    }
}