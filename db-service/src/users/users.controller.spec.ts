import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: null,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const user = {
        companyId: 'id',
        username: 'username',
        name: 'name',
        passwordHash: 'passwordHash',
        passwordSalt: 'passwordSalt',
        role: 'role',
      };
      const result = [user];

      service.findAll = jest.fn().mockResolvedValueOnce(result);
      expect(await controller.findUsers()).toBe(result);
    });
  });

  describe('findById', () => {
    it('should return a user with the specified id', async () => {
      const user = {
        companyId: 'id',
        username: 'username',
        name: 'name',
        passwordHash: 'passwordHash',
        passwordSalt: 'passwordSalt',
        role: 'role',
      };

      const userId = '12345';

      service.findById = jest.fn().mockResolvedValueOnce(user);
      expect(await controller.findById(userId)).toBe(user);
      expect(service.findById).toBeCalledWith(userId);
    });
  });

  describe('getMyInfo', () => {
    it('should return a user info in the request object', async () => {
      const req = {
        user: {
          companyId: 'id',
          username: 'username',
          name: 'name',
          passwordHash: 'passwordHash',
          passwordSalt: 'passwordSalt',
          role: 'role',
        },
      };

      expect(await controller.getMyInfo(req)).toBe(req.user);
    });
  });
});
