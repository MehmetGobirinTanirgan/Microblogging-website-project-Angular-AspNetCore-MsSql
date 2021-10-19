import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { DataService } from 'src/services/data.service';
import { FollowService } from 'src/services/follow.service';
import { FollowListComponent } from './follow-list.component';

describe('FollowListComponent', () => {
  let component: FollowListComponent;
  let fixture: ComponentFixture<FollowListComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockFollowService: jasmine.SpyObj<FollowService>;
  let mockData: MockData;
  let mockLocalStorage: MockLocalStorage;
  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpy();
    const followServiceSpyObj = jasmine.createSpyObj('FollowService', [
      'getFollowList',
      'getUserID',
      'setDisplayFlag',
      'getDisplayFlag',
    ]);

    await TestBed.configureTestingModule({
      declarations: [FollowListComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: DataService, useValue: dataServiceSpy }],
    })
      .overrideProvider(FollowService, { useValue: followServiceSpyObj })
      .compileComponents();

    mockDataService = TestBed.inject(
      DataService
    ) as jasmine.SpyObj<DataService>;
    mockFollowService = TestBed.inject(
      FollowService
    ) as jasmine.SpyObj<FollowService>;
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

  it('#ngOnInit should call #refreshData when #dataService.followList is null', () => {
    mockData = new MockData();
    const mockFollowList = mockData.mockFollowList;
    mockDataService.followList = null;
    const refreshSpy = spyOn(component, 'refreshData');
    refreshSpy.and.callThrough();
    mockFollowService.getFollowList.and.returnValue(of(mockFollowList));
    fixture.detectChanges();

    expect(component.followList).toEqual(mockFollowList);
    expect(refreshSpy).toHaveBeenCalled();
    expect(mockFollowService.getFollowList).toHaveBeenCalled();
  });

  it('#ngOnInit should not call #refreshData when #dataService.followList is not null', () => {
    mockData = new MockData();
    const mockFollowList = mockData.mockFollowList;
    mockDataService.followList = mockFollowList;
    const refreshSpy = spyOn(component, 'refreshData');
    fixture.detectChanges();

    expect(component.followList).toEqual(mockFollowList);
    expect(refreshSpy).not.toHaveBeenCalled();
    expect(mockFollowService.getFollowList).not.toHaveBeenCalled();
  });

  it('#ngOnInit should effect #displayFlag property', () => {
    mockData = new MockData();
    const mockFollowList = mockData.mockFollowList;
    mockDataService.followList = mockFollowList;
    mockFollowService.getDisplayFlag.and.returnValue(true);
    fixture.detectChanges();

    expect(component.displayFlag).toBeTrue();
    expect(mockFollowService.getDisplayFlag).toHaveBeenCalled();
  });

  it('#refreshData should return expected data', () => {
    mockData = new MockData();
    const mockFollowList = mockData.mockFollowList;
    mockFollowService.getFollowList.and.returnValue(of(mockFollowList));
    component.refreshData();

    expect(component.followList).toEqual(mockFollowList);
    expect(mockFollowService.getFollowList).toHaveBeenCalled();
  });

  it('#refreshData should display alert in error case', () => {
    const refreshSpy = spyOn(component, 'refreshData');
    refreshSpy.and.callThrough();
    spyOn(window, 'alert');
    mockFollowService.getFollowList.and.returnValue(
      throwError(new HttpResponse({ status: 400 }))
    );
    component.refreshData();

    expect(window.alert).toHaveBeenCalledWith("Can't load follow list");
    expect(refreshSpy).toHaveBeenCalled();
    expect(mockFollowService.getFollowList).toHaveBeenCalled();
  });

  it('#showFollowers', () => {
    mockFollowService.setDisplayFlag.and.callThrough();
    component.showFollowers();
    expect(component.displayFlag).toBeFalse();
    expect(mockFollowService.setDisplayFlag).toHaveBeenCalled();
  });

  it('#showFollowings', () => {
    mockFollowService.setDisplayFlag.and.callThrough();
    component.showFollowings();
    expect(component.displayFlag).toBeTrue();
    expect(mockFollowService.setDisplayFlag).toHaveBeenCalled();
  });
});

class MockData {
  mockFollowList = {
    fullname: 'mockFullname',
    username: 'mockUsername',
    followers: [
      {
        id: '1',
        fullname: 'mockFullname',
        username: 'mockUsername',
        profilePicPath: 'mockProfilePicPath',
      },
    ],
    followings: [
      {
        id: '1',
        fullname: 'mockFullname',
        username: 'mockUsername',
        profilePicPath: 'mockProfilePicPath',
      },
    ],
  };
}

class MockLocalStorage {
  store: Record<string, string> = {};

  addMockLocalStorage() {
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (this.store[key] = <string>value);
      }
    );

    spyOn(localStorage, 'getItem').and.callFake(
      (key: string): string | null => {
        return this.store[key] || null;
      }
    );
  }
}
