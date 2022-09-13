import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { TeamService } from './team.service';
import { Response } from 'express';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post('/createTeam')
  async createTeam(
    @Body() createTeamDto: CreateTeamRequestDto,
    @Res() res: Response,
  ) {
    try {
      const newTeam: any = await this.teamService.createTeam(createTeamDto);
      return res.status(HttpStatus.OK).send(newTeam);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
