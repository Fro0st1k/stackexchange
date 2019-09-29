import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sec-post-tags',
  templateUrl: './post-tags.component.html',
  styleUrls: ['./post-tags.component.scss']
})

export class PostTagsComponent implements OnInit {
  @Input() tags: string[];
  @Output() showQuestionByTagEvent = new EventEmitter<any>();
  constructor() {}
  ngOnInit() {}

  public showQuestionByTag(tagName: string): void {
    this.showQuestionByTagEvent.emit({ tagName });
  }
}
