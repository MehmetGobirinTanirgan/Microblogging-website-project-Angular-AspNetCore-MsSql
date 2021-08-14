import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from 'src/services/authentication.service';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', [
      'getUserData',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      providers:[{ provide: AuthenticationService, useValue: authServiceSpyObj }]
    })
    .compileComponents();
    mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
