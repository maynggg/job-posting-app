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
      const query = { query: 'query' };
      const user = {
        companyId: 'id',
        username: 'username',
        name: 'name',
        passwordHash: 'passwordHash',
        passwordSalt: 'passwordSalt',
        role: 'role',
      };
      const result = [user];

      const spy = jest
        .spyOn(service, 'findAll')
        .mockReturnValueOnce(result as any);

      expect(await controller.findUsers(query)).toBe(result);
      expect(spy).toBeCalledWith(query);
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

  describe('create', () => {
    it('should return a user info in the createUserDto object', async () => {
      const createUserDto = {
        companyId: 'id',
        username: 'username',
        name: 'name',
        password: 'password',
        role: 'role',
      };

      const res = {
        _id: 'id',
        companyId: 'id',
        username: 'username',
        name: 'name',
        passwordHash: 'passwordHash',
        passwordSalt: 'passwordSalt',
        role: 'role',
      };

      const spy = jest.spyOn(service, 'create').mockReturnValueOnce(res as any);

      expect(await controller.create(createUserDto)).toBe(res);
      expect(spy).toBeCalledWith(createUserDto);
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const loginUserDto = {
        username: 'username',
        password: 'password',
      };

      const accessToken = '1234';

      const res = {
        accessToken: '1234',
      };

      const user = {
        _id: 'id',
        companyId: 'id',
        username: 'username',
        name: 'name',
        passwordHash: 'passwordHash',
        passwordSalt: 'passwordSalt',
        role: 'role',
      };

      const checkLoginDetailSpy = jest
        .spyOn(service, 'checkLoginDetail')
        .mockReturnValueOnce(user as any);

      const createAuthTokenSpy = jest
        .spyOn(service, 'createAuthToken')
        .mockReturnValueOnce(accessToken as string);

      expect(await controller.login(loginUserDto)).toStrictEqual(res);
      expect(checkLoginDetailSpy).toBeCalledWith(loginUserDto);
      expect(createAuthTokenSpy).toBeCalledWith(user);
    });

    it('should throw a not error if user is not found', async () => {
      const loginUserDto = {
        username: 'username',
        password: 'password',
      };

      const user = undefined;

      jest.spyOn(service, 'checkLoginDetail').mockReturnValueOnce(user as any);

      try {
        await controller.login(loginUserDto);
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });
  });
});
