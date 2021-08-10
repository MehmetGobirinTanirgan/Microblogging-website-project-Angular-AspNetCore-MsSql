using AutoMapper;
using System;
using System.IO;
using System.Linq;
using TwitterCore.Entities.Enums;
using TwitterModel.DTO;
using TwitterModel.Models;

namespace TwitterAPI.AutoMappers.UserMapper
{
    public class UserTypeMapper : Profile
    {
        public UserTypeMapper()
        {
            Random random = new Random();
            var defaultUsernamePart = random.Next(10000000, 99999999);

            CreateMap<SignUpDTO, User>()
                .ForMember(u => u.Birthday, m => m.MapFrom(s => new DateTime(s.Year, s.Month, s.Day)))
                .ForMember(u => u.CreatedDate, m => m.MapFrom(s => DateTime.Now))
                .ForMember(u => u.Status, m => m.MapFrom(s => ComplexEntityStatus.Active))
                .ForMember(u => u.ProfilePicPath, m => m.MapFrom(s => "https://res.cloudinary.com/dt107fl3n/image/upload/v1628593796/Default_klqavt.jpg"))
                .ForMember(u => u.BackgroundPath, m => m.MapFrom(s => "https://res.cloudinary.com/dt107fl3n/image/upload/v1628593807/Default_ir2ky0.jpg"))
                .ForMember(u => u.Username, m => m.MapFrom(s => SplitString(s.Fullname) + defaultUsernamePart));

            CreateMap<User, UserProfileDTO>();
            CreateMap<User, ProfileEditModalDTO>();
            CreateMap<ProfileEditDTO, User>()
                .ForMember(u => u.BackgroundPath, m => m.MapFrom((p, u) => p.BackgroundPath != null ? p.BackgroundPath : u.BackgroundPath))
                .ForMember(u => u.ProfilePicPath, m => m.MapFrom((p, u) => p.ProfilePicPath != null ? p.ProfilePicPath : u.ProfilePicPath));

            CreateMap<User, ForeignUserProfileDTO>();
            CreateMap<User, SearchUserDTO>();

            CreateMap<FollowDTO, Follow>();

  

            CreateMap<User, FollowerFollowingDTO>();
        }

        private static string SplitString(string str)
        {
            return str.Split(" ")[0];
        }
    }
}
