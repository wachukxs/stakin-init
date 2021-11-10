import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray, NgControlStatus } from '@angular/forms';
import { Router } from '@angular/router';
import { CallerService } from '../services/caller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private callerService: CallerService) { }

  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  passwordInputIcon: string = 'visibility';

  @ViewChild('passwordInput')
  passwordInput!: ElementRef;

  ngOnInit(): void {
  }

  togglePasswordInputIcon(): void {
    
    if (this.passwordInputIcon == 'visibility') {
      this.passwordInputIcon = 'visibility_off'
      this.passwordInput.nativeElement.type = 'text'
    } else {
      this.passwordInputIcon = 'visibility'
      this.passwordInput.nativeElement.type = 'password'
    }
  }

  logInButtonClick(evt: MouseEvent) {
    console.log('errs:', this.loginForm.errors);
    console.log('this.loginForm', this.loginForm);
    if (this.loginForm.valid) {
      this.callerService.logInFarmer(this.loginForm.value).subscribe(
        (res: any) => {
          console.log('sign up response', res);
          if (res.body.farmer_details && res.body.response === "OK") {

            // sessionStorage.setItem('farmer_details', JSON.stringify(res.body.farmer_details))
            // this.router.navigate(['/dashboard'])
            
          }
        },
        (err) => {
          console.error('=> err', err);
          
          if (err.includes('SQLSTATE[23000]') && err.includes('phonenumber')) { // SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry '+254115335593' for key 'phonenumber'
            // set error in phone number input
            this.loginForm.get(['phonenumber'])?.setErrors({notUnique: true});
            
          } else if (err.includes('SQLSTATE[23000]') && err.includes('email')) {
            // set error in email input
            this.loginForm.get(['email'])?.setErrors({notUnique: true});
          } else {
            // sth happened and we don't know ... we're look into it.
          }
          // message_details
        }
      )
    } else {
      console.log('not signing up');
      
    }
  }

}
