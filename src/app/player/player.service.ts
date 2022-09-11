import { Injectable } from '@nestjs/common';
import { CreatePlayerRequestDto } from './dto/create-player-request.dto';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {
  constructor(private playerRepository: PlayerRepository) {}

  async createPlayer(player: CreatePlayerRequestDto) {
    return this.playerRepository.create(player);
  }
}
