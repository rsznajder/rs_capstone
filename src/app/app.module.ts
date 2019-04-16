import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './route-reuse-strategy';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { Globals } from './_globals/globals';
import { ProductService } from './services/product/product.service';
import { CartService } from './services/cart/cart.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { FooterComponent } from './pages/layout/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';
import { CounterInputComponent } from './controls/counterinput/counterinput.component';
import { CartGridComponent } from './controls/cartgrid/cartgrid.component';
import { CartGridRowComponent } from './controls/cartgrid/cartgrid-row/cartgrid-row.component';
import { TogglebuttonComponent } from './controls/togglebutton/togglebutton.component';
import { TreeviewComponent } from './controls/treeview/treeview.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    CartComponent,
    ContactComponent,
    HomeComponent,
    ProductComponent,
    ShoppingComponent,
    CounterInputComponent,
    CartGridComponent,
    CartGridRowComponent,
    TogglebuttonComponent,
    TreeviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    DigitOnlyModule,
    CarouselModule.forRoot(),
    DeviceDetectorModule.forRoot()
  ],
  providers: [HttpClient, Globals, ProductService, CartService,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
