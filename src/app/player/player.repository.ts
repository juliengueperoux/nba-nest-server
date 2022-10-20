import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreatePlayerRequestDto } from './dto/create-player-request.dto';
import { Player, PlayerDocument } from './entity/player.schema';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
  ) {}

  async create(createPlayerRequestDto: CreatePlayerRequestDto) {
    const createPlayer = new this.playerModel({
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

  async findById(playerId: mongoose.Types.ObjectId) {
    let player;
    try {
      player = await this.playerModel.findById(playerId).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!player) {
      throw new NotFoundException('The player with this id does not exist');
    }

    return player;
  }
}
