/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataService } from 'src/services/data.service';
import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const dataServiceSpyObj = jasmine.createSpyObj('DataService', ['getLoadingFlag']);
    await TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      providers: [{ provide: DataService, useValue: dataServiceSpyObj }],
    }).compileComponents();
    mockDataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockDataService.getLoadingFlag.and.returnValue(of(true));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
