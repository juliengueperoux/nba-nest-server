import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { TeamDocument } from '../team/entity/team.shema';
import { CreatePlayerRequestDto } from './dto/create-player-request.dto';
import { PlayerDto } from './dto/player-dto';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {
  constructor(private playerRepository: PlayerRepository) {}

  async createPlayer(player: CreatePlayerRequestDto): Promise<PlayerDto> {
    return await this.playerRepository.create(player).then((response) => {
      const team = response.team as TeamDocument;
      return {
        id: response._id,
        team: {
          id: team._id,
          city: team.city,
          fullName: team.fullName,
          nickname: team.nickname,
          confName: team.confName,
        },
        firstName: response.firstName,
        lastName: response.lastName,
        position: response.position,
      };
    });
  }

  async getPlayer(playerId: mongoose.Types.ObjectId): Promise<PlayerDto> {
    return this.playerRepository.findById(playerId).then((response) => {
      const team = response.team as TeamDocument;
      return {
        id: response._id,
        team: {
          id: team._id,
          city: team.city,
          fullName: team.fullName,
          nickname: team.nickname,
          confName: team.confName,
        },
        firstName: response.firstName,
        lastName: response.lastName,
        position: response.position,
      };
    });
  }
}
