import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rs-capstone';

  constructor(productService: ProductService) {}

  ngOnInit() {
    console.log('app init');
  }
}
