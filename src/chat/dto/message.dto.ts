import { IsArray, IsOptional, IsString } from 'class-validator';

export class MessageDto {
  // @IsString()
  // sender: string

  @IsString()
  @IsOptional()
  messageBody?: string

  @IsArray()
  @IsOptional()
  fileList?: string[]

  @IsString()
  @IsOptional()
  createdAt?: string

  // @IsString()
  // @IsOptional()
  // updateAt?: string
}