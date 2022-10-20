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
        city: 'A city',
        fullName: 'fullname',
        confName: 'A conf name',
        nickname: 'nickname',
      };
      const player = new Player();
      player.city = 'A city';
      player.fullName = 'fullname';
      player.confName = 'A conf name';
      player.nickname = 'nickname';

      const newPlayer = await repository.create(createPlayerRequestDto);
      expect(newPlayer).toEqual(player);
    });
    it('Should create a player without a nickname.', async () => {
      const createPlayerRequestDto: CreatePlayerRequestDto = {
        city: 'A city',
        fullName: 'fullname',
        confName: 'A conf name',
      };
      const player = new Player();
      player.city = 'A city';
      player.fullName = 'fullname';
      player.confName = 'A conf name';

      expect(await repository.create(createPlayerRequestDto)).toEqual(player);
    });
  });
  describe('findById', () => {
    const id = new mongoose.Types.ObjectId();

    it('Should return the Player.', async () => {
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
});
