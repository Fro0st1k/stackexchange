import { Component, Input, OnInit } from '@angular/core';
import { IQuestion } from '../../../entities/question';

@Component({
  selector: 'sec-questions-light-item',
  templateUrl: './questions-light-item.component.html',
  styleUrls: ['./questions-light-item.component.scss']
})

export class QuestionsLightItemComponent implements OnInit {
  @Input() question: IQuestion;
  constructor() {}
  ngOnInit() {}
}
