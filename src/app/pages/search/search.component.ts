import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ISearchResult } from '../../entities/search';
import { RequestsService } from '../../services/requests/requests.service';
import { ScrollService } from '../../services/scroll/scroll.service';
import { filter, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'sec-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {
  public questions = {} as ISearchResult;
  private destroy$ = new Subject<void>();
  private currentSearchValue: string;
  private hasMore: boolean;
  private page = 1;
  private isLoading: boolean;

  constructor(
    private requestsService: RequestsService,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    this.watchScrollPosition();
  }

  private watchScrollPosition(): void {
    this.scrollService.handlePageScroll()
      .pipe(
        takeUntil(this.destroy$),
        filter(value => value === 'bottom' && this.hasMore),
      ).subscribe(() => this.getMoreQuestions());
  }

  private getMoreQuestions() {
    if (!this.isLoading && this.hasMore) {
      this.getQuestionsData({ intitle: this.currentSearchValue, page: ++this.page });
    }
  }

  private getQuestions(searchValue: string, isNewSearchValue: boolean): void {
    if (isNewSearchValue) {
      this.page = 1;
      this.questions.items = [];
    } else {
      this.page = ++this.page;
    }

    this.currentSearchValue = searchValue;
    this.getQuestionsData({ intitle: searchValue,  page: this.page });
  }

  private getQuestionsData(options) {
    this.isLoading = true;
    this.requestsService.getSearchResult(options)
      .pipe(
        tap(response => this.hasMore = response.has_more),
        map(response => this.mergeNewData(response)),
      ).subscribe(response => this.questions = response, console.error, () => this.isLoading = false);
  }

  private mergeNewData(data: ISearchResult): ISearchResult {
    const questionItems = this.questions && this.questions.items || [];
    return {
      ...data,
      items: [...questionItems, ...data.items]
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
