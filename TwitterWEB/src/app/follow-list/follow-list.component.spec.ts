import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from 'src/services/data.service';
import { FollowListComponent } from './follow-list.component';

describe('FollowListComponent', () => {
  let component: FollowListComponent;
  let fixture: ComponentFixture<FollowListComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;
  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpy();
    await TestBed.configureTestingModule({
      declarations: [FollowListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
      ],
    }).compileComponents();
    mockDataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
