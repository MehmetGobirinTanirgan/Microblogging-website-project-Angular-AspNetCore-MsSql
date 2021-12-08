import { SignUp } from "src/models/SignUp";

export class MockSignUp extends SignUp {
  fullname: string = 'mockFullname';
  emailAddress: string = 'mock@gmail.com';
  password: string = '12345678';
  year: number = 2000;
  month: number = 10;
  day: number = 15;
  phoneNumber: string = '';
}
