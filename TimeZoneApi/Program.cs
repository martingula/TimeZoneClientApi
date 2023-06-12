var builder = WebApplication.CreateBuilder(args);

// Configuration
builder.Configuration.SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();

var services = builder.Services;

var policyName = "_allowSpecificOrigins";

services.AddCors(options => {
    options.AddPolicy(policyName,
        corsBuilder => {
            corsBuilder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// Add services to the container.
services.AddMemoryCache();
services.AddControllers();
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

// Add app services
var apiSettings = builder.Configuration.GetSection("ApiSettings").Get<ApiSettingDto>();
services.AddSingleton(apiSettings ?? new ApiSettingDto());
services.AddSingleton<ICacheService, CacheService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if(app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(policyName);

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
