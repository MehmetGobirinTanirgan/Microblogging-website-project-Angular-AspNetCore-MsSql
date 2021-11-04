import { LoginDTO } from 'src/dtos/LoginDTO';

export class MockLogin extends LoginDTO {
  usernameOrPhoneOrEmail: string = 'mock@gmail.com';
  password: string = '12345678';
}
