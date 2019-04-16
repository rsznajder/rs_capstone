import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  validateForm = false;
  alerts: any[] = [];

  constructor(fb: FormBuilder) {
    this.contactForm = fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  onSubmit() {
    this.alerts = [];
    console.log('model-based form submitted');
    console.log(this.contactForm);
    if (!this.contactForm.valid) {
      this.validateForm = true;
      this.showErrorAlert();
      return;
    }
    // sending data to Api
    this.showSuccessInfo();
  }

  /* rubric61 */
  showErrorAlert(): void {
    this.alerts.push({
      type: 'warning',
      msg: 'Please, correct data in Contact Form',
      timeout: 3000
    });
  }

  /* rubric60 */
  showSuccessInfo(): void {
    this.alerts.push({
      type: 'success',
      msg: 'Your message has been sent.<br>Your email address: ' + this.contactForm.get('email').value + 
            'Subject: ' + this.contactForm.get('subject').value,
      timeout: 3000
    });
  }
 
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
