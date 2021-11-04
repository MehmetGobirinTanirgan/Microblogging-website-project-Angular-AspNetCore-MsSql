using FluentValidation;
using TwitterAPI.Objects.Mappers.Dtos;

namespace TwitterAPI.Validators
{
    public class LikeCreationValidator : AbstractValidator<LikeCreationDTO>
    {
        public LikeCreationValidator()
        {
            RuleFor(x => x.TweetID).NotNull();
            RuleFor(x => x.Username).NotNull().MaximumLength(50);
        }
    }
}
