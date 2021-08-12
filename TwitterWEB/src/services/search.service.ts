import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SearchResultModel } from 'src/models/SearchResultModel';

@Injectable()
export class SearchService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseAddress') private baseAddress: string
  ) {}

  getSearchResults(searchText: string) {
    return this.httpClient.get<SearchResultModel[]>(
      this.baseAddress + 'api/Search/SearchUsers/' + searchText
    );
  }
}
