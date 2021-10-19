using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Text;
using TwitterAPI.Objects.Mappers.Mappers;
using TwitterAPI.Services.Abstract;
using TwitterAPI.Services.Concrete;
using TwitterAPI.Settings;
using TwitterCore.RepositoryAbstractions;
using TwitterDB.Context;
using TwitterRepository.MsSql.Concrete;

namespace TwitterAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(TweetTypeMapper));
            services.AddControllers();
            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "TwitterAPI", Version = "v1" });
            });


            switch (Configuration.GetConnectionString("DbType"))
            {
                case "Sql":
                    services.AddDbContext<TwitterContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ConStr")));
                    services.AddScoped(typeof(IComplexEntityRepository<>), typeof(ComplexEntityRepository<>));
                    services.AddScoped(typeof(ISimpleEntityRepository<>), typeof(SimpleEntityRepository<>));
                    services.AddScoped(typeof(IMTMEntityRepository<>), typeof(MTMEntityRepository<>));
                    services.AddScoped<IUnitOfWork, UnitOfWork>();
                    break;
                default:
                    throw new NotImplementedException();
            }
            
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITweetService, TweetService>();
            services.AddScoped<ITweetImageService, TweetImageService>();
            services.AddScoped<IFollowService, FollowService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();

            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));

            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.SecretKey);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "TwitterAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
