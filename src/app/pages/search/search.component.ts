import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISearchResult } from '../../entities/search';
import { RequestsService } from '../../services/requests/requests.service';

@Component({
  selector: 'sec-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  public questions$: Observable<ISearchResult>;

  constructor(private requestsService: RequestsService) {}

  ngOnInit() {
    this.questions$ = this.requestsService.getSearchResult('js');
  }

}
