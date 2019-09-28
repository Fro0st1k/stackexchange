import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sec-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PostBodyComponent implements OnInit {
  @Input() body: string;
  constructor() { }
  ngOnInit() {}
}
