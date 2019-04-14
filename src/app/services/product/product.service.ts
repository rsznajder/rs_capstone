import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { RestProductService } from '../../rest/rest-product.service';
import { MenuCategory, MenuSubcategory } from '../../rest/dto/menucategory';
import { Category } from '../../rest/dto/category';
import { Product } from '../../rest/dto/product';
import { Globals } from '../../_globals/globals';
import { FindProductResponse } from './findproduct.response';
import { FindProductResponseTypes } from './findproduct-responsetypes.enum';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _complete$ = new Subject<any>();
  menuCategoryList: MenuCategory[] = <MenuCategory[]>[];
  menuCategoryListChanged$ = new ReplaySubject<any>(1);
  productList: Product[] = <Product[]>[];
  productListChanged$ = new ReplaySubject<any>(1);

  constructor(
    private _restProduct: RestProductService,
    private _globals: Globals
  ) {
    this.getProductListFromUrl();
  }

  private convertCategoryListResult(result: Category[]): void {
    if (result === null) {
      this.menuCategoryList = <MenuCategory[]>[];
      this.productList = <Product[]>[];
      this.menuCategoryListChanged$.next({ message: 'new data' });
      this.productListChanged$.next({ message: 'new data' });
      // this.completeRequest();
      return;
    }
    result.forEach(category => {
      // adding new menu category
      if (!this.menuCategoryList.find(c => c.name === category.category)) {
        const newCategory = new MenuCategory({
          name: category.category,
          subcategories: []
        });
        this.menuCategoryList.push(newCategory);
        // adding menu subcategories
        category.subcategories.forEach(subcategory => {
          if (
            !newCategory.subcategories.find(s => s.name === subcategory.name)
          ) {
            const newSub = new MenuSubcategory({
              name: subcategory.name
            });
            newCategory.subcategories.push(newSub);
          }
          // adding products
          subcategory.items.forEach(item => {
            if (!this.productList.find(p => p.name === item.name)) {
              const newProduct = new Product({
                name: item.name,
                description: item.description,
                price: item.price,
                imagelink: item.imagelink,
                rating: Number(item.rating),
                stock: Number(item.stock),
                category: item.category,
                subcategory: item.subcategory
              });
              this.productList.push(newProduct);
            }
          }, this);
        }, this);
      }
    }, this);
    this.menuCategoryListChanged$.next({ message: 'new data' });
    this.productListChanged$.next({ message: 'new data' });
    // we need it only once
    // this.completeRequest();
    console.log('product list is read: ' + this.productList.length);
  }

  private completeRequest(): void {
    // This aborts all HTTP requests.
    this._complete$.next();
    // This completes the subject properlly.
    this._complete$.complete();
  }

  public getProductListFromUrl() {
    this._restProduct
      .listCategoryFromUrl(this._globals.urlCategoryList)
      .pipe(takeUntil(this._complete$))
      .subscribe(result => this.convertCategoryListResult(result));
  }

  public findProductByName(name: string): FindProductResponse {
    if (!name) {
      return new FindProductResponse(null, FindProductResponseTypes.ProductNameIsEmpty);
      return null;
    }
    if (this.productList.length > 0) {
      const product: Product = this.productList.find(
        p => p.name.toLowerCase() === name.toLowerCase()
      );
      if (product) {
        console.log('product found: ' + product.name);
        return new FindProductResponse(product, FindProductResponseTypes.ProductFound);
      } else {
        console.log('product not found!: ' + name);
        return new FindProductResponse(product, FindProductResponseTypes.ProductNotFound);
      }
    } else {
      console.log('empty productList in service');
      this.getProductListFromUrl();
      return new FindProductResponse(null, FindProductResponseTypes.WaitForList);
    }
  }
}
