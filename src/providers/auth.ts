import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

import { IonicConstants } from '../ionic-constants';

/*
  Generated class for the ProvidersAuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: Http, private storage: Storage) {
    console.log('Hello ProvidersAuthProvider Provider');
  }

  login(form: any): Observable<void> {

    if (!form || !form.email || !form.password) {
      return Observable.throw('Incorrect email or password');
    }

    let bodyReq = {
      email: form.email,
      password: form.password
    }
    return this.http.post(IonicConstants.BASE_URL + '/' + IonicConstants.Auth.LOGIN, bodyReq)
      .map(response => {
        let resp = response.json();
        storage.set('token_auth', { token: resp.data.token });
      });
  }

}
