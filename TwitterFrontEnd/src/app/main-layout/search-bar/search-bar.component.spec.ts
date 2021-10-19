import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { SearchService } from 'src/services/search.service';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let mockSearchService: jasmine.SpyObj<SearchService>;

  beforeEach(async () => {
    const searchServiceSpyObj = jasmine.createSpyObj('SearchService', [
      'getSearchResults',
    ]);
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [HttpClientTestingModule],
    })
      .overrideProvider(SearchService, { useValue: searchServiceSpyObj })
      .compileComponents();

    mockSearchService = TestBed.inject(
      SearchService
    ) as jasmine.SpyObj<SearchService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#search should return results', () => {
    const mockResults = [
      {
        id: 'mockID',
        fullname: 'mockFullname',
        username: 'mockUsername',
        profilePicPath: 'mockPath',
      },
    ];
    const dropDownSpy = jasmine.createSpyObj('NgbDropdown',['open']);
    component.dropdown = dropDownSpy;
    mockSearchService.getSearchResults.and.returnValue(of(mockResults));
    component.search('mockText');

    expect(component.searchResults).toEqual(mockResults);
    expect(component.dropdown.open).toHaveBeenCalled();
  });

  it('#search should display alert when request fails', () => {
    spyOn(window,'alert');
    mockSearchService.getSearchResults.and.returnValue(throwError(new HttpResponse({status:400})));
    component.search('mockText');

    expect(window.alert).toHaveBeenCalledWith('Search process failed');
  });

  it('#search should close dropdown when search text is empty', () => {
    const dropDownSpy = jasmine.createSpyObj('NgbDropdown',['close']);
    component.dropdown = dropDownSpy;
    component.search('');

    expect(component.dropdown.close).toHaveBeenCalled();
  });
});
