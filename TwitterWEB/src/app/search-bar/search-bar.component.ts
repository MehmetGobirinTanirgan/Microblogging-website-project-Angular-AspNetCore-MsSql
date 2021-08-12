import { Component, OnInit, ViewChild} from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { SearchResultModel } from 'src/models/SearchResultModel';
import { SearchService } from 'src/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers:[SearchService]
})
export class SearchBarComponent implements OnInit {
  constructor(private searchService:SearchService) { }
  searchResults:SearchResultModel[] =[];
  @ViewChild('dropdownRef', {static:false, read: NgbDropdown}) dropdown: NgbDropdown;
  ngOnInit(): void {
  }

  search(searchText:string){
    if(searchText != ""){
      this.searchService.getSearchResults(searchText).subscribe(data =>{
        this.searchResults = data;
        this.dropdown.open();
      },error =>{
        alert("Search process failed")
      });
    }else{
      this.dropdown.close();
    }
    }

}
