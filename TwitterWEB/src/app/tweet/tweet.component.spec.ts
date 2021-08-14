import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';

import { TweetComponent } from './tweet.component';

describe('TweetComponent', () => {
  let component: TweetComponent;
  let fixture: ComponentFixture<TweetComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockDataService: jasmine.SpyObj<DataService>;
  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'getUserData',
    ]);
    const dataServiceSpy = jasmine.createSpy();
    await TestBed.configureTestingModule({
      declarations: [ TweetComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule,NgbDropdownModule],
      providers:[{ provide: 'baseAddress', useValue: 'mockURL' },
      { provide: AuthenticationService, useValue: authServiceSpyObj },
      { provide: DataService, useValue: dataServiceSpy },]
    })
    .compileComponents();
    mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    mockDataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
