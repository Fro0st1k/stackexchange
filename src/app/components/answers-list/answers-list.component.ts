import { Component, Input, OnInit } from '@angular/core';
import { IAnswer } from '../../entities/answer';

@Component({
  selector: 'sec-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})

export class AnswersListComponent implements OnInit {
  @Input() answers: IAnswer[];
  constructor() {}
  ngOnInit() {}
}
