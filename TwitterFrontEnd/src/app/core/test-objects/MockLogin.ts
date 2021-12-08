import { Login } from "../models/Login";

export class MockLogin extends Login {
  usernameOrPhoneOrEmail: string = 'mock@gmail.com';
  password: string = '12345678';
}
