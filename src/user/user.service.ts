import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        groups: true
      }
    })
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async create(dto:AuthDto){
    const user = {
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: await hash(dto.password)
    }

    return this.prisma.user.create({
      data: user
    })
  }
}
