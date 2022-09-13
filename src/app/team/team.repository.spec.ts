import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Team, TeamDocument } from './entity/team.shema';
import { TeamRepository } from './team.repository';

describe('TeamRepository', () => {
  let mockTeamModel: Model<TeamDocument>;
  let repository: TeamRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamRepository,
        {
          provide: getModelToken(Team.name),
          useValue: Model, // <-- Use the Model Class from Mongoose
        },
      ],
    }).compile();

    mockTeamModel = module.get<Model<TeamDocument>>(getModelToken(Team.name));
    repository = module.get<TeamRepository>(TeamRepository);
  });

  it('Should be defined.', () => {
    expect(repository).toBeDefined();
  });
});
