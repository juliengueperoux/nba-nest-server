import { IsDefined, IsString } from 'class-validator';

export class CreatePlayerRequestDto {
  @IsDefined()
  @IsString()
  team: string;

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
