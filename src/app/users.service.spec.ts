import { TestBed, inject, fakeAsync, tick, getTestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

import { HttpClient, HttpParams } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UsersService', () => {

  let injector: TestBed;
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });

    injector = getTestBed();
    service = injector.get(UsersService);
    httpMock = injector.get(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getUsers', () => {
    it('should return an Observable<User[]>', () => {
      const dummyUsers = [
        { id: 1, login: 'John' },
        { id: 2, login: 'Doe' }
      ];

      service.getUsers().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(dummyUsers);
      });

      const req = httpMock.expectOne(`${service.API_URL}/users`);
      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe('https://api.github.com/users');
      req.flush(dummyUsers);

    });


  });


  describe('#search', () => {
    const dummyParams = new HttpParams().set('q', 'cironunes');

    it('should throw an error if trying to search for not supported `what`', () => {
      service.search('unknown', dummyParams)
        .subscribe(() => { }, err => {
          expect(err).toBe(`Searching for unknown is not supported. The available types are: ${service.WHAT.join(', ')}.`);
        });

      httpMock.expectNone(`${service.API_URL}/search/users?q=cironunes`);
    });

    it('should return an Observable<SearchResults>', () => {
      service.search('users', dummyParams)
        .subscribe(result => {
          debugger
          expect(result.items.length).toBe(2);
        });

      const req = httpMock.expectOne(`${service.API_URL}/search/users?q=cironunes`);
      expect(req.request.url).toBe(`${service.API_URL}/search/users`);
      expect(req.request.params).toEqual(dummyParams);

      req.flush({
        incomplete_results: false,
        items: [{}, {}],
        total_count: 2
      });
    });

  });


});
