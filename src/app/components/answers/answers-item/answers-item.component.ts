import { Component, Input, OnInit } from '@angular/core';
import { IAnswer } from '../../../entities/answer';

@Component({
  selector: 'sec-answers-item',
  templateUrl: './answers-item.component.html',
  styleUrls: ['./answers-item.component.scss']
})

export class AnswersItemComponent implements OnInit {
  @Input() answer: IAnswer;
  constructor() {}
  ngOnInit() {}
}
