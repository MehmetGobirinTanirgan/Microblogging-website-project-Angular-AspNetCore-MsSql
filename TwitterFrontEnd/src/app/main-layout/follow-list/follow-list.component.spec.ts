import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { DataService } from 'src/services/data.service';
import { FollowService } from 'src/services/follow.service';
import { MockFollowList } from 'src/testObjects/MockFollowList';
import { MockLocalStorage } from 'src/testObjects/MockLocalStorage';
import { FollowListComponent } from './follow-list.component';

describe('FollowListComponent', () => {
  let component: FollowListComponent;
  let fixture: ComponentFixture<FollowListComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockFollowService: jasmine.SpyObj<FollowService>;
  let mockLocalStorage: MockLocalStorage;
  let router: Router;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpy();
    const followServiceSpyObj = jasmine.createSpyObj('FollowService', ['getFollowList']);

    await TestBed.configureTestingModule({
      declarations: [FollowListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [{ provide: DataService, useValue: dataServiceSpy }],
    })
      .overrideProvider(FollowService, { useValue: followServiceSpyObj })
      .compileComponents();

    mockDataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    mockFollowService = TestBed.inject(FollowService) as jasmine.SpyObj<FollowService>;
    router = TestBed.inject(Router);
    mockLocalStorage = new MockLocalStorage();
    mockLocalStorage.addMockLocalStorage();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getFollowList should return expected data', () => {
    const mockFollowList = new MockFollowList();
    mockFollowService.getFollowList.and.returnValue(of(mockFollowList));
    component.getFollowList();
    expect(component.followList).toEqual(mockFollowList);
    expect(mockFollowService.getFollowList).toHaveBeenCalled();
  });

  it('#getFollowList should display alert if request fails', () => {
    const refreshSpy = spyOn(component, 'getFollowList');
    refreshSpy.and.callThrough();
    spyOn(window, 'alert');
    mockFollowService.getFollowList.and.returnValue(throwError(new HttpResponse({ status: 400 })));
    component.getFollowList();
    expect(window.alert).toHaveBeenCalledWith('Cant load follow list');
    expect(refreshSpy).toHaveBeenCalled();
    expect(mockFollowService.getFollowList).toHaveBeenCalled();
  });
});
