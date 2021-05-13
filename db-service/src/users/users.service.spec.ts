import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import * as pw from '../users/password';

jest.mock('../users/password');
const mockCreatePasswordHash = pw.createPasswordHash as jest.MockedFunction<
  typeof pw.createPasswordHash
>;

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
      const users = [new User()];
      const spy = jest
        .spyOn(mockUserModel, 'find')
        .mockResolvedValue(users as UserDocument[]);

      expect(await service.findAll()).toBe(users);
      expect(spy).toBeCalled();
    });
  });

  describe('findByCompanyId', () => {
    it('should return all users within a company', async () => {
      const users = [new User()];
      const companyId = '5e5df7fc6953acd3dc50fe8f';
      const spy = jest
        .spyOn(mockUserModel, 'find')
        .mockResolvedValue(users as UserDocument[]);

      expect(await service.findByCompanyId(companyId)).toBe(users);
      expect(spy).toBeCalled();
    });
  });

  describe('checkLoginDetail', () => {
    it('should return null if cannot find a user', async () => {
      const loginUserDto = { username: 'username', password: 'password' };
      const modelSpy = jest
        .spyOn(mockUserModel, 'findOne')
        .mockResolvedValue(null);
      expect(await service.checkLoginDetail(loginUserDto)).toBe(null);
      expect(modelSpy).toBeCalled();
    });

    it('should return a user details if passwords match', async () => {
      const user = new User();
      user.username = 'username';
      user.passwordHash = 'passwordHash';
      user.passwordSalt = 'passwordSalt';

      const loginUserDto = { username: user.username, password: 'password' };

      const modelSpy = jest
        .spyOn(mockUserModel, 'findOne')
        .mockResolvedValue(user as UserDocument);

      mockCreatePasswordHash.mockReturnValueOnce(user.passwordHash);

      expect(await service.checkLoginDetail(loginUserDto)).toBe(user);
      expect(modelSpy).toBeCalled();
    });

    it('should raise error if passwords do not match', async () => {
      const user = new User();
      user.username = 'username';
      user.passwordHash = 'passwordHash';
      user.passwordSalt = 'passwordSalt';

      const loginUserDto = { username: user.username, password: 'password' };

      jest
        .spyOn(mockUserModel, 'findOne')
        .mockResolvedValue(user as UserDocument);

      mockCreatePasswordHash.mockReturnValueOnce('anotherPasswordHash');

      let error;
      try {
        await service.checkLoginDetail(loginUserDto);
      } catch (e) {
        error = e;
      }

      expect(error.getStatus()).toBe(401);
    });
  });
});
