export class LoginModel {
  constructor(source?: Partial<LoginModel>){
    Object.assign(this, source);
  }
  usernameOrPhoneOrEmail: string;
  password: string;
}
