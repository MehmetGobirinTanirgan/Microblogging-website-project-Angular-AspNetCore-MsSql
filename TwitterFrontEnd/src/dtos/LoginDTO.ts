export class LoginDTO {
  constructor(source?: Partial<LoginDTO>) {
    Object.assign(this, source);
  }
  usernameOrPhoneOrEmail: string;
  password: string;
}
