import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IQuestion } from '../../../entities/question';
import { SearchService } from '../../../services/search/search.service';

@Component({
  selector: 'sec-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuestionItemComponent implements OnInit {
  @Input() question: IQuestion;
  @Input() withoutTags: boolean;

  constructor(private searchService: SearchService) {}
  ngOnInit() {}

  public getAdditionalQuestions(userInfo: any): void {
    this.searchService.getAdditionalQuestions(userInfo);
  }
}
