namespace TimeZonePoCAngularApi.Application.Services;

public class CacheService : ICacheService {
    private readonly IMemoryCache _memoryCache;
    private readonly MemoryCacheEntryOptions _memoryCacheEntryOptions;

    // This should come from configuration
    private readonly ApiSettingDto _apiSettings;

    public CacheService(IMemoryCache memoryCache, ApiSettingDto apiSettingDto) {
        _apiSettings = apiSettingDto;

        _memoryCache = memoryCache ?? throw new ArgumentNullException(nameof(memoryCache));
        _memoryCacheEntryOptions = new MemoryCacheEntryOptions()
            .SetSlidingExpiration(TimeSpan.FromSeconds(_apiSettings.CacheSlidingExpirationInSeconds))
            .SetAbsoluteExpiration(TimeSpan.FromSeconds(_apiSettings.CacheAbsoluteExpirationInSeconds));

    }

    public MemoryCacheEntryOptions GetDefaultCacheEntryOptions() {
        return _memoryCacheEntryOptions;
    }

    public TItem Set<TItem>(object key, TItem value, MemoryCacheEntryOptions? options) {
        _memoryCache.Set(key, value, options ?? _memoryCacheEntryOptions);
        return value;
    }

    public bool TryGetValue<TItem>(object key, out TItem? value) {
        if(_memoryCache.TryGetValue(key, out object? result)) {
            if(result == null) {
                value = default;
                return true;
            }

            if(result is TItem item) {
                value = item;
                return true;
            }
        }

        value = default;
        return false;
    }

    public void Clear() {
        ((MemoryCache)_memoryCache).Clear();
    }
}
