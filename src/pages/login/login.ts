import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { CustomValidators } from "../../validators/custom-validators";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginFrmGroup: FormGroup;
  error: string;
  email: AbstractControl;
  password: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder) {
    this.loadValidators();
    this.email = this.loginFrmGroup.controls['email'];
    this.password = this.loginFrmGroup.controls['password'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  protected loadValidators(): void {
    this.loginFrmGroup = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, CustomValidators.emailValidator, CustomValidators.noEmptyWhiteSpace])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), CustomValidators.passwordValidator, CustomValidators.noEmptyWhiteSpace])]
    });
  }


}
