import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { TeamDto } from '../team/dto/team-dto';
import { CreatePlayerRequestDto } from './dto/create-player-request.dto';
import { PlayerDto } from './dto/player-dto';
import { PlayerRepository } from './player.repository';
import { PlayerService } from './player.service';

describe('PlayerService', () => {
  let service: PlayerService;

  const repositoryMockPlayer = {
    _id: 'playerId',
    team: {
      _id: 'testId',
      city: 'testCity',
      nickname: 'testNickname',
      fullName: 'testFullName',
      confName: 'testConfName',
    },
    firstName: 'jack',
    lastName: 'jones',
    position: 'center',
  };

  const mockTeamDto: TeamDto = {
    id: 'testId',
    city: 'testCity',
    nickname: 'testNickname',
    fullName: 'testFullName',
    confName: 'testConfName',
  };

  const mockPlayer: PlayerDto = {
    id: 'playerId',
    team: mockTeamDto,
    firstName: 'jack',
    lastName: 'jones',
    position: 'center',
  };
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockResolvedValue(repositoryMockPlayer),
      findById: jest.fn().mockResolvedValue(repositoryMockPlayer),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: PlayerRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
  });

  it('Should be defined.', () => {
    expect(service).toBeDefined();
  });

  describe('createPlayer', () => {
    it('Should send the new object to the repository', (done) => {
      const mockCreatePlayerRequestDto: CreatePlayerRequestDto = {
        team: 'teamId',
        firstName: 'jack',
        lastName: 'jones',
        position: 'center',
      };

      service.createPlayer(mockCreatePlayerRequestDto).then(() => {
        expect(mockRepository.create).toHaveBeenCalledWith(
          mockCreatePlayerRequestDto,
        );
        done();
      });
    });
  });
  describe('getPlayer', () => {
    const id = new mongoose.Types.ObjectId();
    it('Should return a Player.', (done) => {
      service.getPlayer(id).then((data: any) => {
        expect(data).toEqual(mockPlayer);
        done();
      });
    });
  });
});
