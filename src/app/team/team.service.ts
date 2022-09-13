import { Injectable } from '@nestjs/common';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {
  constructor(private teamRepository: TeamRepository) {}

  async createTeam(team: CreateTeamRequestDto) {
    return this.teamRepository.create(team);
  }
}
