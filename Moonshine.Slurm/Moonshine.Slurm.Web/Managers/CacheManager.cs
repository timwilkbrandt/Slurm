using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using Microsoft.ApplicationServer.Caching;

namespace Moonshine.Zoidberg.Zagats.Web.Managers
{
    public class CacheManager
    {        
        private string _key;
        private DataCache _cache;

        public CacheManager(string method, List<string> inputs)
        {
            var formattedInputs = string.Empty;

            if(inputs.Count() > 0)
                formattedInputs = string.Join("-", inputs);

            _key = string.Format("{0}-{1}", method, formattedInputs).ToLowerInvariant();

            DataCacheFactory slurmCacheFactory = new DataCacheFactory();
            _cache = slurmCacheFactory.GetDefaultCache();
        }

        
        public object GetFromCache()
        {

            var cacheObject = _cache.Get(_key);

            return cacheObject;
        }

        public void SaveToCache(object obj)
        {
            _cache.Add(_key, obj);
        }

        public void RemoveFromCache()
        {
            _cache.Remove(_key);
        }

    }
}