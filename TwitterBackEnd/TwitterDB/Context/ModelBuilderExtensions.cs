using Microsoft.EntityFrameworkCore;
using System;
using TwitterCore.Entities.Enums;
using TwitterCore.Models;

namespace TwitterDB.Context
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
        modelBuilder.Entity<User>()
                .HasData(new User
                {
                    ID = Guid.NewGuid(),
                    CreatedDate = DateTime.Now,
                    Status = ComplexEntityStatus.Active,
                    Username = "Max87654812",
                    Fullname = "Mad Max",
                    EmailAddress = "max@gmail.com",
                    Password = "1",
                    Birthday = new DateTime(1990,10,2),
                    ProfilePicPath = "https://res.cloudinary.com/dt107fl3n/image/upload/v1628593796/Default_klqavt.jpg",
                    BackgroundPath = "https://res.cloudinary.com/dt107fl3n/image/upload/v1628593807/Default_ir2ky0.jpg",
                    FollowerCounter = 0,
                    FollowingCounter = 0,
                });
        }
    }
}
