import { Component, Input, OnInit } from '@angular/core';
import { ISearchResult } from '../../../entities/search';

@Component({
  selector: 'sec-questions-light-list',
  templateUrl: './questions-light-list.component.html',
  styleUrls: ['./questions-light-list.component.scss']
})

export class QuestionsLightListComponent implements OnInit {
  @Input() questions: ISearchResult;
  constructor() {}
  ngOnInit() {}
}
