import { Component, Input, OnInit } from '@angular/core';
import { IQuestion } from '../../entities/question';

@Component({
  selector: 'sec-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})

export class QuestionsListComponent implements OnInit {
  @Input() questions: IQuestion[];
  constructor() {}
  ngOnInit() {}
}
