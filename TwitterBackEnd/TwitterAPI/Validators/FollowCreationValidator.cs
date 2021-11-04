using FluentValidation;
using TwitterAPI.Objects.Mappers.Dtos;

namespace TwitterAPI.Validators
{
    public class FollowCreationValidator : AbstractValidator<FollowCreationDTO>
    {
        public FollowCreationValidator()
        {
            RuleFor(x => x.FollowerUsername).NotNull().MaximumLength(50);
            RuleFor(x => x.FollowingUsername).NotNull().MaximumLength(50);
        }
    }
}
