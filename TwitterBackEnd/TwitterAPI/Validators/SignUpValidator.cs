using FluentValidation;
using TwitterAPI.Objects.Mappers.Dtos;

namespace TwitterAPI.Validators
{
    public class SignUpValidator : AbstractValidator<SignUpDTO>
    {
        public SignUpValidator()
        {
            RuleFor(x => x.Fullname).NotNull().MaximumLength(50);
            RuleFor(x => x.Password).NotNull().MaximumLength(1000);
            RuleFor(x => x.Day).NotEmpty();
            RuleFor(x => x.Month).NotEmpty();
            RuleFor(x => x.Year).NotEmpty();
        }
    }
}
