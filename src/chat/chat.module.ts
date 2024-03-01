import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, PrismaService],
})
export class ChatModule {}
