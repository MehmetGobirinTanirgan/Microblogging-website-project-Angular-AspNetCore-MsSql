using FluentValidation;
using TwitterAPI.Objects.Mappers.Dtos;

namespace TwitterAPI.Validators
{
    public class TweetCreationValidator : AbstractValidator<TweetCreationDTO>
    {
        public TweetCreationValidator()
        {
            RuleFor(x => x.TweetDetail).MaximumLength(280);
            RuleFor(x => x.Username).NotNull().MaximumLength(50);
        }
    }
}
