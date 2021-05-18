import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import * as pw from '../users/password';
import * as jwt from 'jsonwebtoken';

jest.mock('../users/password');
const mockCreatePasswordHash = pw.createPasswordHash as jest.MockedFunction<
  typeof pw.createPasswordHash
>;

jest.mock('jsonwebtoken');
const mockJwtSign = jwt.sign as jest.MockedFunction<typeof jwt.sign>;

describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    mockUserModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a user with the specified ID', async () => {
      const user = new User();
      const userId = '12345';
      const spy = jest
        .spyOn(mockUserModel, 'findById')
        .mockResolvedValue(user as UserDocument);

      expect(await service.findById(userId)).toBe(user);
      expect(spy).toBeCalledWith(userId);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const query = { query: 'query' };
      const users = [new User()];
      const spy = jest
        .spyOn(mockUserModel, 'find')
        .mockResolvedValue(users as UserDocument[]);

      expect(await service.findAll(query)).toBe(users);
      expect(spy).toBeCalledWith(query);
    });
  });

  describe('checkLoginDetail', () => {
    it('should return null if cannot find a user', async () => {
      const loginUserDto = { username: 'username', password: 'password' };
      mockUserModel.findOne = jest
        .fn()
        .mockReturnValueOnce({ select: () => null });
      expect(await service.checkLoginDetail(loginUserDto)).toBe(null);
      expect(mockUserModel.findOne).toBeCalled();
    });

    it('should return a user details if passwords match', async () => {
      const user = new User();
      user.username = 'username';
      user.passwordHash = 'passwordHash';
      user.passwordSalt = 'passwordSalt';

      const loginUserDto = { username: user.username, password: 'password' };

      mockUserModel.findOne = jest
        .fn()
        .mockReturnValueOnce({ select: () => user });
      mockCreatePasswordHash.mockReturnValueOnce(user.passwordHash);

      expect(await service.checkLoginDetail(loginUserDto)).toBe(user);
      expect(mockUserModel.findOne).toBeCalled();
    });

    it('should raise error if passwords do not match', async () => {
      const user = new User();
      user.username = 'username';
      user.passwordHash = 'passwordHash';
      user.passwordSalt = 'passwordSalt';

      const loginUserDto = { username: user.username, password: 'password' };

      mockUserModel.findOne = jest
        .fn()
        .mockReturnValueOnce({ select: () => user });
      mockCreatePasswordHash.mockReturnValueOnce('anotherPasswordHash');

      try {
        await service.checkLoginDetail(loginUserDto);
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });
  });

  describe('createAuthToken', () => {
    it('should return an access token', async () => {
      const user = new User();
      const token = '1234';
      mockJwtSign.mockReturnValueOnce(token);
      expect(await service.createAuthToken(user)).toBe(token);
      expect(mockUserModel.findOne).toBeCalled();
    });
  });
});
