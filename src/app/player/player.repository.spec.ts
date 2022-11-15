import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreatePlayerRequestDto } from './dto/create-player-request.dto';
import { PlayerRepository } from './player.repository';
import mongoose from 'mongoose';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Player, PlayerDocument } from './entity/player.schema';

describe('PlayerRepository', () => {
  let repository: PlayerRepository;
  let model: Model<PlayerDocument>;

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
        PlayerRepository,
        {
          provide: getModelToken(Player.name),
          useValue: ModelMock,
        },
      ],
    }).compile();

    repository = module.get<PlayerRepository>(PlayerRepository);
    model = module.get<Model<PlayerDocument>>(getModelToken(Player.name));
  });

  it('Should be defined.', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('Should create a player with a nickname.', async () => {
      const createPlayerRequestDto: CreatePlayerRequestDto = {
        team: 'teamId',
        firstName: 'jack',
        lastName: 'jones',
        position: 'center',
      };
      const player = new Player();
      player.team = 'teamId';
      player.firstName = 'jack';
      player.lastName = 'jones';
      player.position = 'center';

      const newPlayer = await repository.create(createPlayerRequestDto);
      expect(newPlayer).toEqual(player);
    });
  });
  describe('findById', () => {
    const id = new mongoose.Types.ObjectId();

    it('Should return the Player.', async () => {
      const result = { populate: jest.fn() };
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        ...model,
        exec: jest.fn().mockResolvedValueOnce(result),
      } as any);
      expect(await repository.findById(id)).toEqual(result);
      expect(result.populate).toHaveBeenCalledWith('team');
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
});
