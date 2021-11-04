using FluentValidation;
using TwitterAPI.Objects.Mappers.Dtos;

namespace TwitterAPI.Validators
{
    public class ProfileEditValidator : AbstractValidator<ProfileEditDTO>
    {
        public ProfileEditValidator()
        {
            RuleFor(x => x.Fullname).NotNull().MaximumLength(50);
            RuleFor(x => x.PersonalInfo).MaximumLength(160);
            RuleFor(x => x.PersonalWebSiteURL).MaximumLength(500);
            RuleFor(x => x.Location).MaximumLength(100);
        }
    }
}
