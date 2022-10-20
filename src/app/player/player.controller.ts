import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerRequestDto } from './dto/create-player-request.dto';
import { PlayerDto } from './dto/player-dto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post('/createPlayer')
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerRequestDto,
  ): Promise<PlayerDto> {
    return await this.playerService.createPlayer(createPlayerDto);
  }
}
