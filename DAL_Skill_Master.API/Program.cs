using DAL_Skill_Master.API.DBDetails;
using DAL_Skill_Master.API.Models.DomainModels;
using DAL_Skill_Master.API.RepositoryDetails;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationAPIUser>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DBConnetion")));

builder.Services.AddScoped<IAuthenticationRepository, AuthenticationRepository>();
builder.Services.AddScoped<ISkillMasterRepository, SkillRepository>();

builder.Services.AddControllers();

builder.Services.AddDistributedMemoryCache();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost44376", builder =>
    {
        builder.WithOrigins("https://localhost:44376", "https://kit.fontawesome.com")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddControllers().AddOData(option =>
{
    option.Count().Filter().OrderBy().Expand().Select().SetMaxTop(100);
    option.AddRouteComponents("odata", GetEdmModel());
});

// Register IHttpContextAccessor
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowLocalhost44376");

app.UseAuthorization();

app.MapControllers();

app.Run();

static IEdmModel GetEdmModel()
{
    var edmbuilder = new ODataConventionModelBuilder();
    edmbuilder.EntitySet<Skill>("Skill");
    return edmbuilder.GetEdmModel();
}
