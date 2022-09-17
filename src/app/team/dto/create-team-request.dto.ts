import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateTeamRequestDto {
  @IsDefined()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsDefined()
  @IsString()
  fullName: string;

  @IsDefined()
  @IsString()
  confName: string;
}
