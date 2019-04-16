import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  /* rubric13 */
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  /* rubric34 */
  { path: 'shopping', component: ShoppingComponent },
  /* rubric56 */
  { path: 'cart', component: CartComponent },
  /* rubric46 */
  { path: 'product', component: ProductComponent },
  /* rubric62 */
  { path: 'contact', component: ContactComponent },
  /* rubric64 */
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }