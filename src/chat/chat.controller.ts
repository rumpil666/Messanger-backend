import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CreateChatDto } from './dto/create.chat.dto';
import { MessageDto } from './dto/message.dto';

@Controller('chat')
export class ChatController {
    constructor(private chatService : ChatService){}

    @Post('')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async createChat(@CurrentUser('id') id : string , @Body() ChatDto : CreateChatDto ) {
        return await this.chatService.createChat(id , ChatDto);
    }

    @Get('')
    @UseGuards(AuthGuard())
    async getChats(@CurrentUser('id') id : string) {
        return await this.chatService.getChats(id);
    }

    @Get('/:id')
    @UseGuards(AuthGuard())
    async getChat(@CurrentUser('id') id : string , @Param('id') ChatId : string ) {
        return await this.chatService.getChat(id , ChatId);
    }
    @Post('/message/:id')
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    async SendMessage(@CurrentUser('id') id : string , @Param('id') ChatId : string , @Body() message : MessageDto) {
        return await this.chatService.SendMessage(id,ChatId,message);
    }
}
