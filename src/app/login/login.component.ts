import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray, NgControlStatus } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

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
      
    } else {
      console.log('not signing up');
      
    }
  }

}
