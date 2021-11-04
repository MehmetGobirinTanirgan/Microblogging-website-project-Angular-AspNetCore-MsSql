using FluentValidation;
using TwitterAPI.Objects.Mappers.Dtos;

namespace TwitterAPI.Validators
{
    public class ReplyTweetCreationValidator : AbstractValidator<ReplyTweetCreationDTO>
    {
        public ReplyTweetCreationValidator()
        {
            RuleFor(x => x.TweetDetail).MaximumLength(280);
            RuleFor(x => x.MainTweetID).NotNull();
            RuleFor(x => x.Username).NotNull().MaximumLength(50);
        }
    }
}
