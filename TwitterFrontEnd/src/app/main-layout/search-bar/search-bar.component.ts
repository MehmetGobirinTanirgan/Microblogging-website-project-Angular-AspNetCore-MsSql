import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { SearchUser } from 'src/models/SearchUser';
import { SearchService } from 'src/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers: [SearchService],
})
export class SearchBarComponent implements OnInit {
  constructor(private searchService: SearchService) {
    this.searchResults = new Array<SearchUser>();
    this.focusFlag = false;
  }

  searchResults: Array<SearchUser>;
  @ViewChild('dropdownRef', { static: false, read: NgbDropdown })
  dropdown: NgbDropdown;
  focusFlag: boolean;

  ngOnInit(): void {}

  search(searchText: string) {
    searchText = searchText.trim();
    if (searchText !== '') {
      this.searchService.getSearchResults(searchText).subscribe(
        (data) => {
          this.searchResults = data;
          this.dropdown.open();
        },
        (error) => {
          alert('Search process failed');
        }
      );
    } else {
      this.dropdown.close();
    }
  }

  onFocus() {
    this.focusFlag = true;
  }

  focusOut() {
    this.focusFlag = false;
  }
}
