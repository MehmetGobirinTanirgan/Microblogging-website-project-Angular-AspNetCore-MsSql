export class SignUp {
  constructor(source?: Partial<SignUp>) {
    Object.assign(this, source);
  }

  fullname: string;
  emailAddress: string;
  phoneNumber: string;
  day: number;
  month: number;
  year: number;
  password: string;
}
