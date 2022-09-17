import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { TeamService } from './team.service';
import { CreateTeamResponseDto } from './dto/create-team-response-dto';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post('/createTeam')
  async createTeam(
    @Body() createTeamDto: CreateTeamRequestDto,
  ): Promise<CreateTeamResponseDto> {
    try {
      return await this.teamService.createTeam(createTeamDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
