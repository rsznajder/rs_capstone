import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { RestUniqueStringGenericService } from './generic/rest-uniquestring-generic.service';
import { UniqueStringSerializer } from './generic/uniquestring.serializer';
import { Category } from './dto/category';
import { Product } from './dto/product';

@Injectable({
  providedIn: 'root'
})
export class RestProductService extends RestUniqueStringGenericService<Product> {
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'base_url',
      'products',
      new UniqueStringSerializer<Product>()
    );
  }

  listCategoryFromUrl(url: string): Observable<Category[]> {
    return this.httpClient
      .get(url)
      .pipe(map((data: any) => this.convertCategoryData(data)));
  }

  private convertCategoryData(data: any): Category[] {
    const category = <Category[]>data;
    return category;
  }
}
