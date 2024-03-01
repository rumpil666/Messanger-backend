import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateChatDto } from './dto/create.chat.dto';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) { }

  async createChat(userId: string, chatDto: CreateChatDto) {
    if (chatDto.participants.length < 1) throw new InternalServerErrorException("Participants are required");
    if (chatDto.participants.includes(userId)) throw new InternalServerErrorException("You are already a participant");
    if (chatDto.isGroup && !chatDto.name) throw new InternalServerErrorException("Name is required for group chat");
    if (chatDto.isGroup && !chatDto.imageUrl) throw new InternalServerErrorException("Image is required for group chat");
    if (!chatDto.isGroup && chatDto.participants.length > 1) throw new InternalServerErrorException("this is not a group chat , you can only add one participant")
    const newChat = {
      name: chatDto.name,
      isGroup: chatDto.isGroup,
      imageUrl: chatDto.imageUrl,
      admin: userId,
      participants: [...chatDto.participants, userId],
    };
    if (!newChat) throw new InternalServerErrorException("Chat not created");
    return this.prisma.chat.create({
      data: newChat
    })
  }

  async getChats(userId: string) {
    const chats = await this.prisma.chat.findMany({
      where: {
        participants: {
          has: userId
        }
      }
    });
    if (!chats) throw new NotFoundException("You dont have any chats yet");
    return chats;
  }

  async getChat(userId: string, chatId: string) {
    const chat = await this.prisma.chat.findUnique({
      where: {
        id: chatId,
        participants: {
          has: userId
        }
      }
    });
    if (!chat) throw new NotFoundException("This chat doesnt exist or you are not a participant");
    return chat;
  }

  async addUserInChat(userId: string, chatId: string, chatDto: CreateChatDto) {
    if (chatDto.admin !== userId) throw new InternalServerErrorException("Participants are required");
    const chat = await this.prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        participants: {
          push: chatDto.participants
        }
      },
    });
    if (!chat) throw new NotFoundException("This chat doesnt exist or you are not a participant");
    return chat;
  }

  // async deleteUserInChat(userId: string, chatId: string, chatDto: CreateChatDto) {
  //   if (chatDto.admin !== userId) throw new InternalServerErrorException("Participants are required");
  //   const participant = this.prisma.chat.findUnique({
  //     where: {

  //     }
  //   })
  //   if (!chat) throw new NotFoundException("This chat doesnt exist or you are not a participant");
  //   return chat;
  // }

  async SendMessage(userId: string, chatId: string, messageDto: MessageDto) {
    const message = await this.prisma.message.create({
      data: {
          ...messageDto,
          user: {
            connect: {
              id: userId
            }
          },
          chat: {
            connect: {
              id: chatId
            }
          }
        }
    })
    if (!message) throw new NotFoundException("This chat doesnt exist or you are not a participant");
    return message;
  }

  async UpdateMessage(messageId: string, messageDto: MessageDto) {
    const message = await this.prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        messageBody: messageDto.messageBody,
        updatedAt: new Date()
      },
    });
    if (!message) throw new NotFoundException("This chat doesnt exist or you are not a participant");
    return message;
  }
}
