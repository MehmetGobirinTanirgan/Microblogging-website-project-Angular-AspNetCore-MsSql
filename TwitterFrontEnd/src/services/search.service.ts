import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResultModel } from 'src/models/SearchResultModel';

@Injectable()
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  getSearchResults(searchText: string) {
    return this.httpClient.get<SearchResultModel[]>(
      'Search/SearchUsers/' + searchText
    );
  }
}
