import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { TeamService } from './team.service';
import { SimplifiedTeamDto, TeamDto } from './dto/team-dto';
import mongoose from 'mongoose';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post('/createTeam')
  async createTeam(
    @Body() createTeamDto: CreateTeamRequestDto,
  ): Promise<TeamDto> {
    return await this.teamService.createTeam(createTeamDto);
  }

  @Get('/:id')
  async getTeam(
    @Param('id') teamId: mongoose.Types.ObjectId,
  ): Promise<TeamDto> {
    return await this.teamService.getTeam(teamId);
  }

  @Get()
  async getSimplifiedTeams(): Promise<SimplifiedTeamDto[]> {
    return await this.teamService.getSimplifiedTeams();
  }
}
