import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';

import { CustomValidators } from "../../validators/custom-validators";
import { AuthProvider } from '../../providers/auth';
import { HomePage } from '../../pages/home/home';

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
  toast: any = null;
  loading: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    public authProvider: AuthProvider) {
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


  signin(form: any): void {
    console.log('ok');
    if (this.toast != null) {
      this.toast.dismiss();
    }
    if (this.loginFrmGroup.valid) {
      this.showLoader('"Authenticating..."');
      this.authProvider.login(form).subscribe(
        data => {
          this.loading.dismiss();
          this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' });
        },
        err => {
          this.loading.dismiss();
          this.showToast(`${JSON.parse(err._body).error.message}`);
        }
      );
    }
  }

  showLoader(message: string) {
    this.loading = this.loadingCtrl.create({
      content: message //mensagem que será exibida pelo usuário
    });
    this.loading.present(); //fazer aparecer o loading na tela
  }


  showToast(message: string) {
    this.toast = this.toastCtrl.create({
      position: 'bottom', //posição que será mostrado o toast na tela
      showCloseButton: true, //mostrar ou não o botão para fechar o toast
      closeButtonText: 'OK' //texto que será apresentado no botão fechar
    });
    this.toast.setMessage(message); //mensagem que será mostrada para o usuário
    this.toast.present(); //mostra o toast na tela
  }
}
