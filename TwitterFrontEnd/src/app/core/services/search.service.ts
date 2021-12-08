import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchUser } from '../models/SearchUser';

@Injectable()
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  getSearchResults(searchText: string) {
    return this.httpClient.get<Array<SearchUser>>('Search/SearchUsers/' + searchText);
  }
}
