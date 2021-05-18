import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { HttpModule, HttpService } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMyInfo', () => {
    it('should return user information', async () => {
      const user = {
        id: 'id',
        name: 'name',
        username: 'username',
        password: 'password',
        role: 'role',
      };

      const response = {
        data: user,
        headers: {},
        config: { url: 'http://localhost:3000/mockUrl' },
        status: 200,
        statusText: 'OK',
      };

      const observableObj = {
        toPromise: () => response,
      };

      const spy = jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(observableObj as any);

      expect(await service.getMyInfo()).toBe(response.data);
      expect(spy).toBeCalled();
    });
  });
});
