using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moonshine.Slurm.Web.Models
{
    public class TrendingEvent
    {
        private string _key = "7CBC5F21-C618-4451-AA05-0B983274B596";
        
        public string Date { get;  private set; }
        public string Name { get; private set; }
        private int Count { get; set; } = 1;
        private List<TrendingEvent> _trendingEvents { get; set; }

        public TrendingEvent()
        {
            var cache = new Managers.CacheManager(_key);
            _trendingEvents = (List<TrendingEvent>)cache.GetFromCache();
        }

        public TrendingEvent(string date, string name)
        {
            this.Date = date;
            this.Name = name;

            var cache = new Managers.CacheManager(_key);
            var match = false;
            
            _trendingEvents = (List<TrendingEvent>)cache.GetFromCache();

            foreach (var trendingEvent in _trendingEvents)
            {
                if (date == this.Date && name == this.Name)
                {
                    _trendingEvents.Remove(trendingEvent);
                    trendingEvent.Count++;
                    _trendingEvents.Add(trendingEvent);
                    cache.RemoveFromCache();
                    cache.SaveToCache(_trendingEvents);
                    match = true;
                    break;
                }
            }

            if (match == false)
            {
                _trendingEvents.Add(this);
                cache.SaveToCache(_trendingEvents);
            }
        }
                
        public List<TrendingEvent> GetTrendingEvents()
        {
            return _trendingEvents;
        }
    }
}