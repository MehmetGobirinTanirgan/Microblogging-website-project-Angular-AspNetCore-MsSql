using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Text;
using TwitterAPI.Services.Abstract;
using TwitterAPI.Services.Concrete;
using TwitterAPI.Settings;
using TwitterCore.RepositoryAbstractions;
using TwitterDB.Context;
using TwitterRepository.Sql.Concrete;

namespace TwitterAPI.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "TwitterAPI", Version = "v1" });
            });
        }

        public static void AddDb(this IServiceCollection services, IConfiguration configuration)
        {
            var provider = configuration.GetValue<string>("ConnectionStrings:Provider");

            services.AddDbContext<TwitterContext>(options => _ = provider switch
            {
                "MySql" => options.UseMySql(configuration.GetConnectionString("MySqlConStr"), new MySqlServerVersion(new Version(8, 0, 27)), x => x.MigrationsAssembly("MySql.Migrations")),
                "MsSql" => options.UseSqlServer(configuration.GetConnectionString("MsSqlConStr"), x => x.MigrationsAssembly("MsSql.Migrations")),
                _ => throw new Exception($"Unsupported provider: {provider}")
            });
        }

        public static void AddDI(this IServiceCollection services)
        {
            services.AddScoped(typeof(IComplexEntityRepository<>), typeof(ComplexEntityRepository<>));
            services.AddScoped(typeof(ISimpleEntityRepository<>), typeof(SimpleEntityRepository<>));
            services.AddScoped(typeof(IMTMEntityRepository<>), typeof(MTMEntityRepository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITweetService, TweetService>();
            services.AddScoped<ITweetImageService, TweetImageService>();
            services.AddScoped<IFollowService, FollowService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IUploadService, UploadService>();
        }

        public static void AddCloudinaryConfig(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<CloudinarySettings>(configuration.GetSection("CloudinarySettings"));
        }

        public static void AddJWT(this IServiceCollection services, IConfiguration configuration)
        {
            var appSettingsSection = configuration.GetSection("AppSettings");
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
    }
}
