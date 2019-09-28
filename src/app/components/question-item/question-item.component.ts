import { Component, Input, OnInit } from '@angular/core';
import { IQuestion } from '../../entities/question';

@Component({
  selector: 'sec-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss']
})

export class QuestionItemComponent implements OnInit {
  @Input() question: IQuestion;

  constructor() {}
  ngOnInit() {}
}
