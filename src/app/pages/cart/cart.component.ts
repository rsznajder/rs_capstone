import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';
import { CartProduct } from '../../rest/dto/cartproduct';
import { CartGridComponent } from '../../controls/cartgrid/cartgrid.component';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Component({
  selector: 'app-cart', 
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orderForm: FormGroup;
  validateForm = false;
  alerts: any[] = [];
  isIntExplorerBrowser = false;

  constructor(fb: FormBuilder, private _deviceService: DeviceDetectorService, public _cartService: CartService) {
    const browser = this._deviceService.browser;
    if (browser === 'IE') {
      this.isIntExplorerBrowser = true;
    }
    // console.log(browser);
    this.orderForm = fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      zip: ['', [Validators.required, Validators.maxLength(30)]],
    });
   }

   onSubmit() {
    this.alerts = [];
    console.log('model-based form submitted');
    console.log(this.orderForm);
    /* rubric52 */
    if (!this.orderForm.valid) {
      this.validateForm = true;
      this.showErrorAlert();
      return;
    }
    // sending data to Api
    this.showSuccessInfo();
  }

  /* rubric52 */
  showErrorAlert(): void {
    this.alerts.push({
      type: 'warning',
      msg: 'Please, correct data in Shipping Details Form',
      timeout: 3000
    });
  }

  /* rubric51 */
  showSuccessInfo(): void {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    this.alerts.push({
      type: 'success',
      timeout: 3000
    });
  }
 
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  ngOnInit() {

  }
}
