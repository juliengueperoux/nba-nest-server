import { Injectable } from '@nestjs/common';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { CreateTeamResponseDto } from './dto/create-team-response-dto';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {
  constructor(private teamRepository: TeamRepository) {}

  async createTeam(team: CreateTeamRequestDto): Promise<CreateTeamResponseDto> {
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
}
