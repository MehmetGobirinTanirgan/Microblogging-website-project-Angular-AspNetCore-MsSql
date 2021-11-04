using FluentValidation;
using TwitterAPI.Objects.Mappers.Dtos;

namespace TwitterAPI.Validators
{
    public class LoginValidator : AbstractValidator<LoginDTO>
    {
        public LoginValidator()
        {
            RuleFor(x => x.UsernameOrPhoneOrEmail).NotNull().MaximumLength(50);
            RuleFor(x => x.Password).NotNull().MaximumLength(1000);
        }
    }
}
