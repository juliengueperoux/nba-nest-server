import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { Team, TeamDocument } from './entity/team.shema';
import { TeamRepository } from './team.repository';

describe('TeamRepository', () => {
  let repository: TeamRepository;

  class ModelMock {
    constructor(private data: any) {}
    new = jest.fn().mockResolvedValue(this.data);
    save = jest.fn().mockResolvedValue(this.data);
    static find = jest.fn().mockResolvedValue({});
    static remove = jest.fn().mockResolvedValueOnce(true);
    static exists = jest.fn().mockResolvedValue(false);
    static findOne = jest.fn().mockResolvedValue({});
    static findByIdAndUpdate = jest.fn().mockResolvedValue({});
    static findByIdAndDelete = jest.fn().mockReturnThis();
    static exec = jest.fn();
    static deleteOne = jest.fn().mockResolvedValue(true);
    static findById = jest.fn().mockReturnThis();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamRepository,
        {
          provide: getModelToken(Team.name),
          useValue: ModelMock,
        },
      ],
    }).compile();

    repository = module.get<TeamRepository>(TeamRepository);
  });

  it('Should be defined.', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a team', async () => {
      const createTeamRequestDto: CreateTeamRequestDto = {
        teamId: 'An id',
        city: 'A city',
        fullName: 'fullname',
        confName: 'A conf name',
        nickname: 'nickname',
      };
      const team = new Team();
      team._id = 'An id';
      team.city = 'A city';
      team.fullName = 'fullname';
      team.confName = 'A conf name';
      team.nickname = 'nickname';

      // act
      const newTeam = await repository.create(createTeamRequestDto);
      console.log(newTeam);
      expect(newTeam).toEqual(team);
      // assert
    });
  });
});
