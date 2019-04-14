import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUniqueStringIndex } from './uniquestring.index';
import { ISerializer } from './serializer.index';
import { QueryOptions } from './queryoptions';

export class RestUniqueStringGenericService<T extends IUniqueStringIndex> {
  constructor(
    protected httpClient: HttpClient,
    protected url: string,
    protected endpoint: string,
    protected serializer: ISerializer<T>
  ) {}

  list(queryOptions: QueryOptions): Observable<T[]> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}?${queryOptions.toQueryString()}`)
      .pipe(map((data: any) => this.convertData(data.items)));
  }

  listFromUrl(url: string): Observable<T[]> {
    return this.httpClient
      .get(url)
      .pipe(map((data: any) => this.convertData(data.items)));
  }

  public create(item: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.url}/${this.endpoint}`, this.serializer.toJson(item))
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  public update(item: T): Observable<T> {
    return this.httpClient
      .put<T>(
        `${this.url}/${this.endpoint}/${item.uniqueName}`, 
        this.serializer.toJson(item)
      )
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  read(id: number): Observable<T> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/${id}`)
      .pipe(map((data: any) => this.serializer.fromJson(data) as T));
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${this.endpoint}/${id}`);
  }

  private convertData(data: any): T[] {
    return data.map(item => this.serializer.fromJson(item));
  }
}
