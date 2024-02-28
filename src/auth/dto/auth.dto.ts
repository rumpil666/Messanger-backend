import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string

  @MinLength(8, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString()
  password: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string
}