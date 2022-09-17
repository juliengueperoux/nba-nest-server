import { Test, TestingModule } from '@nestjs/testing';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { TeamRepository } from './team.repository';
import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;

  const mockRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        {
          provide: TeamRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TeamService>(TeamService);
  });

  it('Should be defined.', () => {
    expect(service).toBeDefined();
  });

  describe('createTeam', () => {
    it('Should send the new object to the repository', () => {
      const mockCreateTeamRequestDto: CreateTeamRequestDto = {
        city: 'A city',
        fullName: 'fullname',
        confName: 'A conf name',
        nickname: 'nickname',
      };
      service.createTeam(mockCreateTeamRequestDto);
      expect(mockRepository.create).toHaveBeenCalledWith(
        mockCreateTeamRequestDto,
      );
    });
  });
});
