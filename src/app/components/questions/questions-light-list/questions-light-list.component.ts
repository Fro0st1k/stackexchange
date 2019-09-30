import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ISearchResult } from '../../../entities/search';
import { fade } from '../../../animations/fade.animations';

@Component({
  selector: 'sec-questions-light-list',
  templateUrl: './questions-light-list.component.html',
  styleUrls: ['./questions-light-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fade]
})

export class QuestionsLightListComponent implements OnInit {
  @Input() questions: ISearchResult;
  constructor() {}
  ngOnInit() {}
}
