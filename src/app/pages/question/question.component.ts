import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from '../../services/requests/requests.service';
import { Observable } from 'rxjs';
import { ISearchResult } from '../../entities/search';
import { finalize, map } from 'rxjs/operators';
import { IQuestion } from '../../entities/question';

@Component({
  selector: 'sec-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {
  questionInfo$: Observable<IQuestion>;
  public isLoading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private requestsService: RequestsService
  ) {}

  ngOnInit() {
    this.questionInfo();
  }

  private questionInfo(): void {
    const questionId = this.activatedRoute.snapshot.params.questionId;
    this.questionInfo$ = this.requestsService.getQuestionInfo(questionId)
      .pipe(
        map((result: ISearchResult) => result.items[0]),
        finalize(() => this.isLoading = false)
      );
  }
}
