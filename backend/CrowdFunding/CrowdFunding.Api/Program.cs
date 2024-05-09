using CrowdFunding.Persistence.Context;
using CrowdFunding.Application.Repositories;
using CrowdFunding.Persistence.Repositories;
using CrowdFunding.Application.Queries.Campaign;
using CrowdFunding.Application.Commands.Campaign;

var builder = WebApplication.CreateBuilder(args);

// Add controllers
builder.Services.AddControllers();

// Add DbContext
builder.Services.AddDbContext<MySqlDbContext>();


// Register repositories and UnitOfWork
builder.Services.AddScoped<ICampaignRepository, CampaignRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

foreach (var assembly in AppDomain.CurrentDomain.GetAssemblies())
{
    builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(assembly));
}

builder.Services.AddAutoMapper(typeof(CampaignMapper));
builder.Services.AddAutoMapper(typeof(GetAllCampaignsMapper));


var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

app.Run();
