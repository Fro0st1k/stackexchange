import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ISearchResult } from '../../entities/search';
import { RequestsService } from '../../services/requests/requests.service';
import { ScrollService } from '../../services/scroll/scroll.service';
import { filter, takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'sec-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchComponent implements OnInit, OnDestroy {
  public questions$: Observable<ISearchResult>;
  public additionalQuestions$: Observable<ISearchResult>;
  public isLoading$: Observable<boolean>;
  private destroy$ = new Subject<void>();

  constructor(
    private requestsService: RequestsService,
    private scrollService: ScrollService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.watchScrollPosition();
    this.questions$ = this.searchService.searchData$;
    this.additionalQuestions$ = this.searchService.additionalQuestions$;
    this.isLoading$ = this.searchService.isLoading$;
  }

  private watchScrollPosition(): void {
    this.scrollService.handlePageScroll()
      .pipe(
        takeUntil(this.destroy$),
        filter(value => value === 'bottom'),
      ).subscribe(() => this.searchService.getMoreQuestions());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
