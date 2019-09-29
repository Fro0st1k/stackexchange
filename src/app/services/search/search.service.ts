import { Injectable } from '@angular/core';
import { ISearchResult } from '../../entities/search';
import { filter, map, tap } from 'rxjs/operators';
import { RequestsService } from '../requests/requests.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private searchData = new BehaviorSubject<ISearchResult>({} as ISearchResult);
  public searchData$ = this.searchData.asObservable();
  private isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading.asObservable();
  private additionalQuestions = new BehaviorSubject(null);
  public additionalQuestions$ = this.additionalQuestions.asObservable();

  private currentSearchValue: string;
  private hasMore: boolean;
  private page = 1;

  constructor(private requestsService: RequestsService) {}

  public getAdditionalQuestions(userOrTagInfo: any): void {
    const isUserQuestions = typeof userOrTagInfo.userId === 'number';
    const subscription = isUserQuestions
      ? this.requestsService.getAuthorQuestions(userOrTagInfo.userId)
      : this.requestsService.getQuestionByTag(userOrTagInfo.tagName);

    subscription
      .pipe(map(data => ({ ...data, isUserQuestions, userOrTagInfo })))
      .subscribe(data => this.additionalQuestions.next(data));
  }

  public getQuestions(searchValue: string): void {
    this.page = 1;
    this.searchData.next({} as ISearchResult);
    this.additionalQuestions.next(null);
    this.currentSearchValue = searchValue.trim();
    if (this.currentSearchValue) {
      this.getQuestionsData({ intitle: this.currentSearchValue,  page: this.page });
    }
  }

  public getQuestionsData(options) {
    this.isLoading.next(true);
    this.requestsService.getSearchResult(options)
      .pipe(
        filter(() => !!options.intitle),
        tap(response => this.hasMore = response.has_more),
        map(response => this.mergeNewData(response)),
      ).subscribe(data => this.searchData.next(data), console.error, () => this.isLoading.next(false));
  }

  public getMoreQuestions() {
    if (!this.isLoading.getValue() && this.hasMore) {
      this.getQuestionsData({ intitle: this.currentSearchValue, page: ++this.page });
    }
  }

  private mergeNewData(newData: ISearchResult): ISearchResult {
    const curData = this.searchData.getValue();
    const questionItems = curData && curData.items || [];
    return {
      ...newData,
      items: [...questionItems, ...newData.items]
    };
  }
}
