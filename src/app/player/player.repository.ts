import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerRequestDto } from './dto/create-player-request.dto';
import { Player, PlayerDocument } from './entity/player.schema';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
  ) {}

  async create(createPlayerRequestDto: CreatePlayerRequestDto) {
    const createPlayer = new this.playerModel({
      _id: createPlayerRequestDto.personId,
      team: createPlayerRequestDto.teamId,
      firstName: createPlayerRequestDto.firstName,
      lastName: createPlayerRequestDto.lastName,
      position: createPlayerRequestDto.position,
    });
    try {
      return await createPlayer.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
