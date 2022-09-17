import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { Team, TeamDocument } from './entity/team.shema';
import { TeamRepository } from './team.repository';

describe('TeamRepository', () => {
  let repository: TeamRepository;
  let model: Model<TeamDocument>;

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
    model = module.get<Model<TeamDocument>>(getModelToken(Team.name));
  });

  it('Should be defined.', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('Should create a team with a nickname.', async () => {
      const createTeamRequestDto: CreateTeamRequestDto = {
        city: 'A city',
        fullName: 'fullname',
        confName: 'A conf name',
        nickname: 'nickname',
      };
      const team = new Team();
      team.city = 'A city';
      team.fullName = 'fullname';
      team.confName = 'A conf name';
      team.nickname = 'nickname';

      const newTeam = await repository.create(createTeamRequestDto);
      expect(newTeam).toEqual(team);
    });
    it('Should create a team without a nickname.', async () => {
      const createTeamRequestDto: CreateTeamRequestDto = {
        city: 'A city',
        fullName: 'fullname',
        confName: 'A conf name',
      };
      const team = new Team();
      team.city = 'A city';
      team.fullName = 'fullname';
      team.confName = 'A conf name';

      const newTeam = await repository.create(createTeamRequestDto);
      expect(newTeam).toEqual(team);
    });
  });
});
