import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { Team, TeamDocument } from './entity/team.shema';

@Injectable()
export class TeamRepository {
  constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>) {}

  async create(createTeamRequestDto: CreateTeamRequestDto) {
    const createTeam = new this.teamModel({
      _id: createTeamRequestDto.teamId,
      city: createTeamRequestDto.city,
      nickname: createTeamRequestDto.nickname,
      confName: createTeamRequestDto.confName,
      fullName: createTeamRequestDto.fullName,
    });
    try {
      return await createTeam.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
