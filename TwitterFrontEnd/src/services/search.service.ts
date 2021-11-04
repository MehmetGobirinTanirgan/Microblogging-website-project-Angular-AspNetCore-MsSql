import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchUserDTO } from 'src/dtos/SearchUserDTO';

@Injectable()
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  getSearchResults(searchText: string) {
    return this.httpClient.get<Array<SearchUserDTO>>('Search/SearchUsers/' + searchText);
  }
}
