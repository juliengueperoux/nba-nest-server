export class TeamDto {
  id: string;
  city: string;
  nickname?: string;
  fullName: string;
  confName: string;
}

export class SimplifiedTeamDto {
  id: string;
  fullName: string;
}
