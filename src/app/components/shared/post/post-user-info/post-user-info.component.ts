import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOwner } from '../../../../entities/owner';

@Component({
  selector: 'sec-post-user-info',
  templateUrl: './post-user-info.component.html',
  styleUrls: ['./post-user-info.component.scss']
})

export class PostUserInfoComponent implements OnInit {
  @Input() owner: IOwner;
  @Output() showUserQuestionsEvent = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  public showUserQuestions(userId: number, userName: string): void {
    this.showUserQuestionsEvent.emit({ userId, userName });
  }
}
