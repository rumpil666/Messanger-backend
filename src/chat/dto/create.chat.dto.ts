import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  name: string

  @IsNotEmpty()
  @IsBoolean()
  isGroup: boolean;

  @IsNotEmpty()
  @IsString()
  admin: string

  @IsArray()
  @IsNotEmpty()
  participants: string[]

  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}