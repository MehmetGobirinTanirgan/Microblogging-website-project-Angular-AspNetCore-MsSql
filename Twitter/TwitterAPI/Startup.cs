using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using TwitterAPI.Models;
using TwitterModel.Context;
using TwitterRepository.ComplexEntityRepository;
using TwitterRepository.FollowRepository;
using TwitterRepository.LikeRepository;
using TwitterRepository.MTMEntityRepository;
using TwitterRepository.SimpleEntityRepository;
using TwitterRepository.TweetImageRepository;
using TwitterRepository.TweetRepository;
using TwitterRepository.UserRepository;
using TwitterService.AuthenticationService;
using TwitterService.FollowService;
using TwitterService.TweetImageService;
using TwitterService.TweetService;
using TwitterService.UserService;

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
            services.AddAutoMapper(typeof(Startup));
            services.AddControllers();
            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "TwitterAPI", Version = "v1" });
            });

            services.AddDbContext<TwitterContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ConStr")));

            services.AddScoped(typeof(IComplexEntityRepository<>),typeof(ComplexEntityRepository<>));
            services.AddScoped(typeof(ISimpleEntityRepository<>),typeof(SimpleEntityRepository<>));
            services.AddScoped(typeof(IMTMEntityRepository<>),typeof(MTMEntityRepository<>));
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ITweetRepository, TweetRepository>();
            services.AddScoped<ILikeRepository, LikeRepository>();
            services.AddScoped<IFollowRepository, FollowRepository>();
            services.AddScoped<ITweetImageRepository, TweetImageRepository>();
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
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
