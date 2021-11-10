import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray, NgControlStatus } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  passwordInputIcon: string = 'visibility';

  @ViewChild('passwordInput')
  passwordInput!: ElementRef;

  signUpForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      lastname: new FormControl('', Validators.required),
      accepttandc: new FormControl('', [Validators.required])
  });

  togglePasswordInputIcon(): void {
    
    if (this.passwordInputIcon == 'visibility') {
      this.passwordInputIcon = 'visibility_off'
      this.passwordInput.nativeElement.type = 'text'
    } else {
      this.passwordInputIcon = 'visibility'
      this.passwordInput.nativeElement.type = 'password'
    }
  }

  ngOnInit(): void {
  }

  signUpButtonClick(evt: MouseEvent) {  
    console.log('sign up botton', evt);
    console.log('this.signUpForm.value', this.signUpForm.value);
    if (this.signUpForm.valid) {
      
    } else {
      console.log('not signing up');
      
    }
  }

}
