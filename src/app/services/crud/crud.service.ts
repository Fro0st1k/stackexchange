import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  constructor(private http: HttpClient) {}

  public getData(url, options?): Observable<any> {
    return this.http.get(url, options);
  }

  public postData(url, options?): Observable<any> {
    return this.http.post(url, options);
  }

  public updateData(url, options?): Observable<any> {
    return this.http.put(url, options);
  }

  public deleteData(url, options?): Observable<any> {
    return this.http.delete(url, options);
  }
}
