namespace TimeZonePoCAngularApi.Application.Services.Interfaces;

public interface ICacheService {
    public MemoryCacheEntryOptions GetDefaultCacheEntryOptions();
    public TItem Set<TItem>(object key, TItem value, MemoryCacheEntryOptions? options);
    public bool TryGetValue<TItem>(object key, out TItem? value);

    public void Clear();
}
