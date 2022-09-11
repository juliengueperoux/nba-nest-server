import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { CreatePlayerRequestDto } from './dto/create-player-request.dto';
import { PlayerService } from './player.service';
import { Response } from 'express';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post('/createPlayer')
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerRequestDto,
    @Res() res: Response,
  ) {
    try {
      const newPlayer: any = await this.playerService.createPlayer(
        createPlayerDto,
      );
      return res.status(HttpStatus.OK).send(newPlayer);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
