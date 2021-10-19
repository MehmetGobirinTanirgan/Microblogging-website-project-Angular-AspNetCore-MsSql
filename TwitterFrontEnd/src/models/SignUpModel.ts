export class SignUpModel {
  constructor(source?: Partial<SignUpModel>){
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
