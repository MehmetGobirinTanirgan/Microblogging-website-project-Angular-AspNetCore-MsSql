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

            CreateMap<User, UserProfileDTO>()
                .ForPath(f => f.UserProfileCard.ID, m => m.MapFrom(u => u.ID))
                .ForPath(f => f.UserProfileCard.CreatedDate, m => m.MapFrom(u => u.CreatedDate))
                .ForPath(f => f.UserProfileCard.Fullname, m => m.MapFrom(u => u.Fullname))
                .ForPath(f => f.UserProfileCard.Username, m => m.MapFrom(u => u.Username))
                .ForPath(f => f.UserProfileCard.Location, m => m.MapFrom(u => u.Location))
                .ForPath(f => f.UserProfileCard.ProfilePicPath, m => m.MapFrom(u => u.ProfilePicPath))
                .ForPath(f => f.UserProfileCard.BackgroundPath, m => m.MapFrom(u => u.BackgroundPath))
                .ForPath(f => f.UserProfileCard.PersonalInfo, m => m.MapFrom(u => u.PersonalInfo))
                .ForPath(f => f.UserProfileCard.PersonalWebSiteURL, m => m.MapFrom(u => u.PersonalWebSiteURL))
                .ForPath(f => f.UserProfileCard.FollowerCounter, m => m.MapFrom(u => u.FollowerCounter))
                .ForPath(f => f.UserProfileCard.FollowingCounter, m => m.MapFrom(u => u.FollowingCounter));

            CreateMap<User, ProfileEditModalDTO>();
            CreateMap<ProfileEditDTO, User>()
                .ForMember(u => u.PersonalInfo, m => m.MapFrom(p => p.PersonalInfo == "null" ? null : p.PersonalInfo))
                .ForMember(u => u.PersonalWebSiteURL, m => m.MapFrom(p => p.PersonalWebSiteURL == "null" ? null : p.PersonalWebSiteURL))
                .ForMember(u => u.Location, m => m.MapFrom(p => p.Location == "null" ? null : p.Location));

            CreateMap<User, ForeignUserProfileDTO>()
                .ForPath(f => f.UserProfileCard.ID, m => m.MapFrom(u => u.ID))
                .ForPath(f => f.UserProfileCard.CreatedDate, m => m.MapFrom(u => u.CreatedDate))
                .ForPath(f => f.UserProfileCard.Fullname, m => m.MapFrom(u => u.Fullname))
                .ForPath(f => f.UserProfileCard.Username, m => m.MapFrom(u => u.Username))
                .ForPath(f => f.UserProfileCard.Location, m => m.MapFrom(u => u.Location))
                .ForPath(f => f.UserProfileCard.ProfilePicPath, m => m.MapFrom(u => u.ProfilePicPath))
                .ForPath(f => f.UserProfileCard.BackgroundPath, m => m.MapFrom(u => u.BackgroundPath))
                .ForPath(f => f.UserProfileCard.PersonalInfo, m => m.MapFrom(u => u.PersonalInfo))
                .ForPath(f => f.UserProfileCard.PersonalWebSiteURL, m => m.MapFrom(u => u.PersonalWebSiteURL))
                .ForPath(f => f.UserProfileCard.FollowerCounter, m => m.MapFrom(u => u.FollowerCounter))
                .ForPath(f => f.UserProfileCard.FollowingCounter, m => m.MapFrom(u => u.FollowingCounter))
                .ForPath(f => f.UserProfileCard.FollowFlag, m => m.MapFrom(u => u.FollowFlag));
                
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
