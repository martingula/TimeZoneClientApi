namespace TimeZonePoCAngularApi.Application.Models;

public class ApiSettingDto {
    public int CacheSlidingExpirationInSeconds { get; set; }
    public int CacheAbsoluteExpirationInSeconds { get; set; }
}
