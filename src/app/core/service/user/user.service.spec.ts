import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpClientMock: { get: jasmine.Spy; put: jasmine.Spy; post: jasmine.Spy, delete: jasmine.Spy };

  beforeEach(() => {
    httpClientMock = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post', 'delete']);
    userService = new UserService(httpClientMock as any);
  });



});
