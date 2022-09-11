import { IsDefined, IsString } from 'class-validator';

export class CreatePlayerRequestDto {
  @IsDefined()
  @IsString()
  personId: string;

  @IsDefined()
  @IsString()
  teamId: string;

  @IsDefined()
  @IsString()
  firstName: string;

  @IsDefined()
  @IsString()
  lastName: string;

  @IsDefined()
  @IsString()
  position: string;
}
