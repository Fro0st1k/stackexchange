import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISearchResult } from '../../entities/search';
import { CrudService } from '../crud/crud.service';
import { config } from './requests.config';

@Injectable({
  providedIn: 'root'
})

export class RequestsService {
  constructor(private crudService: CrudService) {}

  public getSearchResult(options): Observable<ISearchResult> {
    const requestUrl = config.api.search;
    const requestOptions = this.mergeOptions(options);
    return this.crudService.getData(requestUrl, { params: requestOptions });
  }

  public getAuthorQuestions(userId: number): Observable<ISearchResult> {
    const requestUrl = `${config.api.userQuestions}/${userId}/questions`;
    const requestOptions = this.mergeOptions();
    return this.crudService.getData(requestUrl, { params: requestOptions });
  }

  public getQuestionByTag(tagName: string): Observable<ISearchResult> {
    const requestUrl = config.api.search;
    const requestOptions = this.mergeOptions({ tagged: tagName, sort: 'votes' });
    return this.crudService.getData(requestUrl, { params: requestOptions });
  }

  public getQuestionInfo(questionId: number): Observable<ISearchResult> {
    const requestUrl = `${config.api.question}/${questionId}`;
    const requestOptions = this.mergeOptions(config.additionalOptions);
    return this.crudService.getData(requestUrl, { params: requestOptions });
  }

  private mergeOptions(options?: {}): any {
    return  {
      ...config.defaultOptions,
      ...options
    };
  }
}
