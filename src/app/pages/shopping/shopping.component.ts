import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../rest/dto/product';
import { CartProduct } from '../../rest/dto/cartproduct';
import { MenuItem } from 'src/app/rest/dto/menuitem';
import { MenuSubcategory, MenuCategory } from 'src/app/rest/dto/menucategory';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  menuList: MenuItem[] = <MenuItem[]>[];
  filteredProductList: Product[] = <Product[]>[];
  selectedCategory = '';
  selectedSubcategory = '';
  selectedInStockOnly = true;
  selectedSortBy = 'None';
  numberOfItemsInCategory = 0;
  numberOfItemsFiltered = 0;

  constructor(private _deviceService: DeviceDetectorService, private _productService: ProductService,
              private _cartService: CartService) {
    const localThis = this;
    _productService.menuCategoryListChanged$.asObservable().subscribe((value) => {
      if (value.message === 'new data') {
        localThis.menuList = <MenuItem[]>_productService.menuCategoryList.map(obj => ({...obj}));
      }
    });
  }

  /* rubric15, rubric16, rubric17, rubric18 */
  filterProductList() {
    if (!this.selectedCategory) {
      return;
    }
    if (!this.selectedSubcategory) {
      return;
    }
    const selectedCategory = this.selectedCategory;
    const selectedSubcategory = this.selectedSubcategory;
    const selectedInStockOnly = this.selectedInStockOnly;
    const selectedSortBy = this.selectedSortBy;
    let numberOfItemsInCategory = 0;
    let numberOfItemsFiltered = 0;
    this.filteredProductList = this._productService.productList.filter(p => {
      // console.log(p.category + '   ' + p.subcategory);
      if (p.category.toLowerCase() === selectedCategory.toLowerCase()) {
        /* rubric28 */
        numberOfItemsInCategory = numberOfItemsInCategory + 1;
        if (p.subcategory.toLowerCase() === selectedSubcategory.toLowerCase()) {
          /* rubric29 */
          if (selectedInStockOnly === true) {
            if (p.stock > 0) {
              numberOfItemsFiltered = numberOfItemsFiltered + 1;
              return true;
            } else {
              return false;
            }
          } else {
            numberOfItemsFiltered = numberOfItemsFiltered + 1;
            return true;
          }
        }
      }
    }).sort((p1, p2) => {
      if (selectedSortBy === 'Price') {
        if (p1.price > p2.price) {
          return 1;
        } else if (p1.price < p2.price) {
          return -1;
        } else {
          return 0;
        }
      } else if (selectedSortBy === 'Alphabetical') {
        if (p1.name > p2.name) {
          return 1;
        } else if (p1.name < p2.name) {
          return -1;
        } else {
          return 0;
        }
      } else if (selectedSortBy === 'Rating') {
        if (p1.rating > p2.rating) {
          return 1;
        } else if (p1.rating < p2.rating) {
          return -1;
        } else {
          return 0;
        }
      }
    });
    this.numberOfItemsInCategory = numberOfItemsInCategory;
    this.numberOfItemsFiltered = numberOfItemsFiltered;
  }

  /* rubric15 */
  treeviewChange(event: MenuItem) {
    console.log(event);
    if (event instanceof MenuSubcategory) {
      const subcategory: MenuSubcategory = <MenuSubcategory>event;
      for (const menu of this.menuList) {
        /* rubric27 */
        if (menu.subcategories.find(x => x.name === subcategory.name)) {
          this.selectedCategory = menu.name;
          this.selectedSubcategory = subcategory.name;
          this.filterProductList();
          return;
        }
      }
    }
  }

  /* rubric17 */
  inStockChange(event: boolean) {
    this.selectedInStockOnly = event;
    this.filterProductList();
  }

  /* rubric18, rubric33 */
  sortByChange(event: any) {
    this.selectedSortBy = event.currentTarget.value;
    const selectedSortBy = this.selectedSortBy;
    this.filteredProductList.sort((p1, p2) => {
      if (selectedSortBy === 'Price') {
        if (p1.price > p2.price) {
          return 1;
        } else if (p1.price < p2.price) {
          return -1;
        } else {
          return 0;
        }
      } else if (selectedSortBy === 'Alphabetical') {
        if (p1.name > p2.name) {
          return 1;
        } else if (p1.name < p2.name) {
          return -1;
        } else {
          return 0;
        }
      } else if (selectedSortBy === 'Rating') {
        if (p1.rating > p2.rating) {
          return 1;
        } else if (p1.rating < p2.rating) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  }

  checkQuantityInCart() {
    for (const product of this.filteredProductList) {
      product.quantityInCart = this._cartService.getQuantityInCartByName(product.name);
    }
  }

  /* rubric30 */
  addToCart(productName: string, addToCartQuantity: number) {
    console.log(productName + '      ' + addToCartQuantity);
    for (const product of this.filteredProductList) {
      if (product.name === productName) {
        const cartProduct = new CartProduct({
          name: product.name,
          price: product.price,
          quantity: addToCartQuantity,
          netSum: 0,
          imagelink: product.imagelink
        });
        if (this._cartService.addProduct(cartProduct)) {
          product.addToCartMessage = 'success';
          product.quantityInCart = this._cartService.getQuantityInCartByName(product.name);
          setTimeout(this.showQuantityInCart, 3000, product);
        } else {
          product.addToCartMessage = 'error';
        }
      }
    }
  }

  showQuantityInCart(product: Product) {
    product.addToCartMessage = '';
  }

  ngOnInit() {
  }
}
