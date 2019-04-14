import { Component, OnInit } from '@angular/core';
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

  constructor(private _productService: ProductService, private _cartService: CartService) {
    const localThis = this;
    _productService.menuCategoryListChanged$.asObservable().subscribe((value) => {
      if (value.message === 'new data') {
        localThis.menuList = <MenuItem[]>_productService.menuCategoryList.map(obj => ({...obj}));
      }
    });
   }

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
        numberOfItemsInCategory = numberOfItemsInCategory + 1;
        if (p.subcategory.toLowerCase() === selectedSubcategory.toLowerCase()) {
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


  treeviewChange(event: MenuItem) {
    console.log(event);
    if (event instanceof MenuSubcategory) {
      const subcategory: MenuSubcategory = <MenuSubcategory>event;
      for (const menu of this.menuList) {
        if (menu.subcategories.find(x => x.name === subcategory.name)) {
          this.selectedCategory = menu.name;
          this.selectedSubcategory = subcategory.name;
          this.filterProductList();
          return;
        }
      }
    }
  }

  inStockChange(event: boolean) {
    this.selectedInStockOnly = event;
    this.filterProductList();
  }

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
    /* const product1 = new Product({
      name: 'Baby Monitor',
      description: 'Baby monitor while baby is sleeping away from mom or dad. Baby monitor while baby is sleeping away from mom or dad',
      price: 30,
      imagelink: 'https://webmppcapstone.blob.core.windows.net/babycare-royaltyfree/babymonitor.png',
      rating: 5,
      stock: 40,
      category: 'Household and Beauty',
      subcategory: 'Baby care'
    });
    const product2 = new Product({
      name: 'Baby Girl Dress',
      description: 'Baby Girl Dress with beautiful colors',
      price: 13,
      imagelink: 'https://webmppcapstone.blob.core.windows.net/babycare-royaltyfree/babydress.png',
      rating: 5,
      stock: 55,
      category: 'Household and Beauty',
      subcategory: 'Baby care'
    });
    const product3 = new Product({
      name: 'Baby Bottle',
      description: 'Baby bottle with 10 oz capacity',
      price: 8,
      imagelink: 'https://webmppcapstone.blob.core.windows.net/babycare-royaltyfree/babyBottle.png',
      rating: 5,
      stock: 55,
      category: 'Household and Beauty',
      subcategory: 'Baby care'
    });
    const product4 = new Product({
      name: 'Blanket',
      description: 'Baby blanket helps keep the baby warm',
      price: 20,
      imagelink: 'https://webmppcapstone.blob.core.windows.net/babycare-royaltyfree/babyblanket.png',
      rating: 5,
      stock: 15,
      category: 'Household and Beauty',
      subcategory: 'Baby care'
    });
    const product5 = new Product({
      name: 'Bib',
      description: 'Baby Bib helps with keeps baby cloth clean during meal time',
      price: 10,
      imagelink: 'https://webmppcapstone.blob.core.windows.net/babycare-royaltyfree/babybib.png',
      rating: 4,
      stock: 30,
      category: 'Household and Beauty',
      subcategory: 'Baby care'
    });
    this.filteredProductList.push(product1, product2, product3, product4, product5);
    this.checkQuantityInCart(); */
  }
}
