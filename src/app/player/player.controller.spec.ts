import { Test, TestingModule } from '@nestjs/testing';
import { TeamDto } from '../team/dto/team-dto';
import { CreatePlayerRequestDto } from './dto/create-player-request.dto';
import { PlayerDto } from './dto/player-dto';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

describe('PlayerController', () => {
  let controller: PlayerController;
  let service: PlayerService;

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

  beforeEach(async () => {
    const mockPlayerService = {
      createPlayer: jest.fn(),
      getPlayer: jest.fn().mockResolvedValue(mockPlayer),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        {
          provide: PlayerService,
          useValue: mockPlayerService,
        },
      ],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
    service = module.get<PlayerService>(PlayerService);
  });

  it('Should be defined.', () => {
    expect(controller).toBeDefined();
  });

  describe('createPlayer', () => {
    it('Should call createPlayer method from Player service.', () => {
      const createPlayerRequestDto: CreatePlayerRequestDto = {
        teamId: 'teamId',
        firstName: 'jack',
        lastName: 'jones',
        position: 'center',
      };

      const createPlayerSpy = jest
        .spyOn(service, 'createPlayer')
        .mockResolvedValue(mockPlayer);

      return controller
        .createPlayer(createPlayerRequestDto)
        .then((response: any) => {
          expect(createPlayerSpy).toHaveBeenCalledWith(createPlayerRequestDto);
          expect(createPlayerSpy).toHaveBeenCalledTimes(1);
          expect(response).toBe(mockPlayer);
        });
    });
  });
});
