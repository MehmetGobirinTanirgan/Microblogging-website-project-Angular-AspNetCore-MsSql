export class Login{
  constructor(source?: Partial<Login>) {
    Object.assign(this, source);
  }
  usernameOrPhoneOrEmail: string;
  password: string;
}
