import { TeamDto } from 'src/app/team/dto/team-dto';

export class PlayerDto {
  id: string;
  team: TeamDto;
  firstName: string;
  lastName: string;
  position: string;
}
