export class SignUpDTO {
  constructor(source?: Partial<SignUpDTO>) {
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
