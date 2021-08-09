using AutoMapper;
using System;
using TwitterCore.Entities.Enums;
using TwitterModel.DTO;
using TwitterModel.Models;

namespace TwitterAPI.AutoMappers.TweetMapper
{
    public class TweetTypeMapper : Profile
    {
        public TweetTypeMapper()
        {

            CreateMap<TweetImage, TweetImageDTO>();

            CreateMap<Tweet, TweetDTO>()
                .ForPath(t => t.ProfilePicPath, m => m.MapFrom(t => t.User.ProfilePicPath))
                .ForPath(t => t.Fullname, m => m.MapFrom(t => t.User.Fullname))
                .ForPath(t => t.Username, m => m.MapFrom(t => t.User.Username))
                .ForPath(t => t.LikeCounter, m => m.MapFrom(t => t.LikeCounter))
                .ForPath(t => t.ReplyCounter, m => m.MapFrom(t => t.ReplyCounter))
                .ForPath(t => t.RetweetCounter, m => m.MapFrom(t => t.RetweetCounter))
                .ForPath(t => t.TweetImageInfos, m => m.MapFrom(t => t.ImagesOfTweet))
                .ForPath(t => t.MainTweetOwnerID, m => m.MapFrom(t => t.ReplyMainTweet.UserID))
                .ForPath(t => t.MainTweetOwnerUsername, m => m.MapFrom(t => t.ReplyMainTweet.User.Username));

            CreateMap<NewTweetDTO, Tweet>()
                .ForMember(t => t.Status, m => m.MapFrom(n => ComplexEntityStatus.Active))
                .ForMember(t => t.ReplyStatus, m => m.MapFrom(n => TweetReplyStatus.Everyone))
                .ForMember(t => t.CreatedDate, m => m.MapFrom(n => DateTime.Now));

            CreateMap<LikeDTO, Like>();

            CreateMap<NewReplyTweetDTO, Tweet>()
                .ForMember(t => t.ReplyMainTweetID, m => m.MapFrom(n => n.MainTweetID))
                .ForMember(t => t.Status, m => m.MapFrom(n => ComplexEntityStatus.Active))
                .ForMember(t => t.ReplyStatus, m => m.MapFrom(n => TweetReplyStatus.Everyone))
                .ForMember(t => t.CreatedDate, m => m.MapFrom(n => DateTime.Now));
            CreateMap<TweetImage, TweetImageDTO>();
        }
    }
}
