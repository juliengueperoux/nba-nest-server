import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { Team, TeamDocument } from './entity/team.shema';
import { TeamRepository } from './team.repository';
import mongoose from 'mongoose';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

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

      expect(await repository.create(createTeamRequestDto)).toEqual(team);
    });
  });
  describe('findById', () => {
    const id = new mongoose.Types.ObjectId();

    it('Should return the Team.', async () => {
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        ...model,
        exec: jest.fn().mockResolvedValueOnce('test'),
      } as any);
      expect(await repository.findById(id)).toEqual('test');
    });
    it('Should throw an InternalServerErrorException when the mongoose query send an error.', (done) => {
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        ...model,
        exec: jest.fn().mockRejectedValue('Error'),
      } as any);
      repository.findById(id).catch((error) => {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Error');
        done();
      });
    });

    it('Should throw a NotFoundException when the mongoose query does not return a result.', (done) => {
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        ...model,
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);
      repository.findById(id).catch((error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        done();
      });
    });
  });

  describe('findAll', () => {
    it('Should return the teams.', async () => {
      jest.spyOn(model, 'find').mockReturnValueOnce({
        ...model,
        exec: jest.fn().mockResolvedValueOnce(['test']),
      } as any);
      expect(await repository.findAll()).toEqual(['test']);
    });
    it('Should throw an InternalServerErrorException when the mongoose query send an error.', (done) => {
      jest.spyOn(model, 'find').mockReturnValueOnce({
        ...model,
        exec: jest.fn().mockRejectedValue('Error'),
      } as any);
      repository.findAll().catch((error) => {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Error');
        done();
      });
    });

    it('Should return an empty array when the mongoose query returns a falsy value.', (done) => {
      jest.spyOn(model, 'find').mockReturnValueOnce({
        ...model,
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);
      repository.findAll().then((data) => {
        expect(data).toEqual([]);
        done();
      });
    });
  });
});
