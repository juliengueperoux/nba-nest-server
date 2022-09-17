import { Test, TestingModule } from '@nestjs/testing';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { CreateTeamResponseDto } from './dto/create-team-response-dto';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

describe('TeamController', () => {
  let controller: TeamController;
  let service: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [
        {
          provide: TeamService,
          useValue: {
            createTeam: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TeamController>(TeamController);
    service = module.get<TeamService>(TeamService);
  });

  it('Should be defined.', () => {
    expect(controller).toBeDefined();
  });
  describe('createTeam', () => {
    it('Should call createTeam method from Team service.', () => {
      const createTeamRequestDto: CreateTeamRequestDto = {
        city: 'A city',
        fullName: 'fullname',
        confName: 'A conf name',
        nickname: 'nickname',
      };

      const createTeamResponseDto: CreateTeamResponseDto = {
        id: 'An id',
        city: 'A city',
        fullName: 'fullname',
        confName: 'A conf name',
        nickname: 'nickname',
      };

      const createTeamSpy = jest
        .spyOn(service, 'createTeam')
        .mockResolvedValue(createTeamResponseDto);

      return controller
        .createTeam(createTeamRequestDto)
        .then((response: any) => {
          expect(createTeamSpy).toHaveBeenCalledWith(createTeamRequestDto);
          expect(createTeamSpy).toHaveBeenCalledTimes(1);
          expect(response).toBe(createTeamResponseDto);
        });
    });
  });
});
