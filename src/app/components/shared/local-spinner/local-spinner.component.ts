import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sec-local-spinner',
  templateUrl: './local-spinner.component.html',
  styleUrls: ['./local-spinner.component.scss']
})

export class LocalSpinnerComponent implements OnInit {
  @Input() isAttachedToTop: boolean;
  constructor() {}
  ngOnInit() {}
}
