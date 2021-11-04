using AutoMapper;
using System;
using TwitterAPI.Objects.Mappers.Dtos;
using TwitterCore.Entities.Enums;
using TwitterCore.Models;

namespace TwitterAPI.Objects.Mappers.Mappers
{
    public class TweetTypeMapper : Profile
    {
        public TweetTypeMapper()
        {

            CreateMap<TweetImage, TweetImageDTO>();

            CreateMap<Tweet, TweetDisplayDTO>()
                .ForPath(t => t.ProfilePicPath, m => m.MapFrom(t => t.User.ProfilePicPath))
                .ForPath(t => t.Fullname, m => m.MapFrom(t => t.User.Fullname))
                .ForPath(t => t.Username, m => m.MapFrom(t => t.User.Username))
                .ForPath(t => t.LikeCounter, m => m.MapFrom(t => t.LikeCounter))
                .ForPath(t => t.ReplyCounter, m => m.MapFrom(t => t.ReplyCounter))
                .ForPath(t => t.RetweetCounter, m => m.MapFrom(t => t.RetweetCounter))
                .ForPath(t => t.TweetImageInfos, m => m.MapFrom(t => t.ImagesOfTweet))
                .ForPath(t => t.MainTweetOwnerUsername, m => m.MapFrom(t => t.ReplyMainTweet.User.Username));

            CreateMap<TweetCreationDTO, Tweet>()
                .ForMember(t => t.Status, m => m.MapFrom(n => ComplexEntityStatus.Active))
                .ForMember(t => t.ReplyStatus, m => m.MapFrom(n => TweetReplyStatus.Everyone))
                .ForMember(t => t.CreatedDate, m => m.MapFrom(n => DateTime.Now))
                .ForMember(t => t.TweetDetail, m => m.MapFrom(n => n.TweetDetail == "null" ? null : n.TweetDetail));

            CreateMap<LikeCreationDTO, Like>();

            CreateMap<ReplyTweetCreationDTO, Tweet>()
                .ForMember(t => t.ReplyMainTweetID, m => m.MapFrom(n => n.MainTweetID))
                .ForMember(t => t.Status, m => m.MapFrom(n => ComplexEntityStatus.Active))
                .ForMember(t => t.ReplyStatus, m => m.MapFrom(n => TweetReplyStatus.Everyone))
                .ForMember(t => t.CreatedDate, m => m.MapFrom(n => DateTime.Now));
            CreateMap<TweetImage, TweetImageDTO>();
        }
    }
}
