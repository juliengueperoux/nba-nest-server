import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { SimplifiedTeamDto, TeamDto } from './dto/team-dto';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {
  constructor(private teamRepository: TeamRepository) {}

  async createTeam(team: CreateTeamRequestDto): Promise<TeamDto> {
    return this.teamRepository.create(team).then((response) => {
      return {
        id: response._id,
        city: response.city,
        nickname: response.nickname,
        fullName: response.fullName,
        confName: response.confName,
      };
    });
  }

  async getTeam(teamId: mongoose.Types.ObjectId): Promise<TeamDto> {
    return this.teamRepository.findById(teamId).then((response) => {
      return {
        id: response._id,
        city: response.city,
        nickname: response.nickname,
        fullName: response.fullName,
        confName: response.confName,
      };
    });
  }

  async getSimplifiedTeams(): Promise<SimplifiedTeamDto[]> {
    return this.teamRepository.findAll().then((response) => {
      return response.map((data) => {
        return {
          id: data._id,
          fullName: data.fullName,
        };
      });
    });
  }
}
