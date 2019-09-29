import { Component, Input, OnInit } from '@angular/core';
import { IQuestion } from '../../../../entities/question';

@Component({
  selector: 'sec-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})

export class PostInfoComponent implements OnInit {
  @Input() light: boolean;
  @Input() question: IQuestion;
  constructor() {}
  ngOnInit() {}
}
