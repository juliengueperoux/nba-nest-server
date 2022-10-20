import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { SimplifiedTeamDto, TeamDto } from './dto/team-dto';
import { TeamRepository } from './team.repository';
import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;

  const repositoryMockTeam = {
    _id: 'testId',
    city: 'testCity',
    nickname: 'testNickname',
    fullName: 'testFullName',
    confName: 'testConfName',
  };

  const mockTeam: TeamDto = {
    id: 'testId',
    city: 'testCity',
    nickname: 'testNickname',
    fullName: 'testFullName',
    confName: 'testConfName',
  };
  let mockRepository: any;

  const reposioryMockTeams = [
    { ...repositoryMockTeam },
    { ...repositoryMockTeam, id: 'testId2' },
  ];

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockResolvedValue({}),
      findById: jest.fn().mockResolvedValue(repositoryMockTeam),
      findAll: jest.fn().mockResolvedValue(reposioryMockTeams),
    };

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
    it('Should send the new object to the repository', (done) => {
      const mockCreateTeamRequestDto: CreateTeamRequestDto = {
        city: 'A city',
        fullName: 'fullname',
        confName: 'A conf name',
        nickname: 'nickname',
      };
      service.createTeam(mockCreateTeamRequestDto).then(() => {
        expect(mockRepository.create).toHaveBeenCalledWith(
          mockCreateTeamRequestDto,
        );
        done();
      });
    });
  });

  describe('getTeam', () => {
    const id = new mongoose.Types.ObjectId();
    it('Should return a Team.', (done) => {
      service.getTeam(id).then((data: any) => {
        expect(data).toEqual(mockTeam);
        done();
      });
    });
  });

  describe('getSimplifiedTeams', () => {
    const expectedSimplifiedTeamsDto: SimplifiedTeamDto[] = [
      {
        id: reposioryMockTeams[0]._id,
        fullName: reposioryMockTeams[0].fullName,
      },
      {
        id: reposioryMockTeams[1]._id,
        fullName: reposioryMockTeams[1].fullName,
      },
    ];
    it('Should return simplified teams.', (done) => {
      service.getSimplifiedTeams().then((data: any) => {
        expect(data).toEqual(expectedSimplifiedTeamsDto);
        done();
      });
    });
  });
});
