import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { Team, TeamDocument } from './entity/team.shema';

@Injectable()
export class TeamRepository {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<TeamDocument>,
  ) {}

  async create(createTeamRequestDto: CreateTeamRequestDto) {
    const createdTeam = new this.teamModel({
      city: createTeamRequestDto.city,
      nickname: createTeamRequestDto.nickname,
      confName: createTeamRequestDto.confName,
      fullName: createTeamRequestDto.fullName,
    });
    try {
      return await createdTeam.save();
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(error);
    }
  }

  async findById(teamId: mongoose.Types.ObjectId) {
    let team;
    try {
      team = await this.teamModel.findById(teamId).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!team) {
      throw new NotFoundException('The team with this id does not exist');
    }

    return team;
  }

  async findAll() {
    let teams;
    try {
      teams = await this.teamModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!teams) {
      return [];
    }

    return teams;
  }
}
