import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISearchResult } from '../../entities/search';
import { CrudService } from '../crud/crud.service';

const config = {
  api: {
    search: 'api/search',
    question: 'api/questions',
    userQuestions: 'api/users',
  },
  defaultOptions: {
    page: 1,
    pagesize: 20,
    order: 'desc',
    sort: 'activity',
    site: 'stackoverflow',
    key: 'U4DMV*8nvpm3EOpvf69Rxw(('
  },
  additionalOptions: {
    filter: '!-*jbN-o8P3E5'
  }
};

@Injectable({
  providedIn: 'root'
})

export class RequestsService {
  constructor(private crudService: CrudService) {}

  public getSearchResult(word): Observable<ISearchResult> {
    const requestUrl = config.api.search;
    const requestOptions = this.mergeOptions({ intitle: word });
    return this.crudService.getData(requestUrl, { params: requestOptions });
  }

  public getAuthorQuestions(userId: number): Observable<ISearchResult> {
    const requestUrl = `${config.api.userQuestions}/${userId}/questions`;
    const requestOptions = this.mergeOptions();
    return this.crudService.getData(requestUrl, { params: requestOptions });
  }

  public getQuestionByTag(tagName: string): Observable<ISearchResult> {
    const requestUrl = config.api.search;
    const requestOptions = this.mergeOptions({ tagged: tagName});
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
