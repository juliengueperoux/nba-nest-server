import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { SimplifiedTeamDto, TeamDto } from './dto/team-dto';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

describe('TeamController', () => {
  let controller: TeamController;
  let service: TeamService;

  const mockTeam: TeamDto = {
    id: 'testId',
    city: 'testCity',
    nickname: 'testNickname',
    fullName: 'testFullName',
    confName: 'testConfName',
  };

  const mockSimplifiedTeams: SimplifiedTeamDto[] = [
    {
      id: 'testId1',
      fullName: 'testFullName1',
    },
    {
      id: 'testId2',
      fullName: 'testFullName2',
    },
  ];

  beforeEach(async () => {
    const mockTeamService = {
      createTeam: jest.fn(),
      getTeam: jest.fn().mockResolvedValue(mockTeam),
      getSimplifiedTeams: jest.fn().mockResolvedValue(mockSimplifiedTeams),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [
        {
          provide: TeamService,
          useValue: mockTeamService,
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

      const createTeamSpy = jest
        .spyOn(service, 'createTeam')
        .mockResolvedValue(mockTeam);

      return controller
        .createTeam(createTeamRequestDto)
        .then((response: any) => {
          expect(createTeamSpy).toHaveBeenCalledWith(createTeamRequestDto);
          expect(createTeamSpy).toHaveBeenCalledTimes(1);
          expect(response).toBe(mockTeam);
        });
    });
  });

  describe('getTeam', () => {
    it('Should return a team.', (done) => {
      const id = new mongoose.Types.ObjectId();

      controller.getTeam(id).then((data: any) => {
        expect(data).toEqual(mockTeam);
        done();
      });
    });
  });
  describe('getSimplifiedTeams', () => {
    it('Should return simplified teams.', (done) => {
      controller.getSimplifiedTeams().then((data: any) => {
        expect(data).toEqual(mockSimplifiedTeams);
        done();
      });
    });
  });
});
