import { Injectable, NgZone } from '@angular/core';
import * as Auth0Cordova from '@auth0/cordova';
import * as Auth0 from 'auth0-js';
import { GlobalVariable } from '../../globals';

const auth0Config = {
  // needed for auth0
  clientID: GlobalVariable.AUTH0_CLIENT_ID,
  // needed for auth0cordova
  clientId: GlobalVariable.AUTH0_CLIENT_ID,
  domain: GlobalVariable.AUTH0_DOMAIN,
  callbackURL: location.href,
  packageIdentifier: GlobalVariable.AUTH0_APPLICATION_PACKAGE_NAME
};

@Injectable()
export class AuthService {
  auth0 = new Auth0.WebAuth(auth0Config);
  accessToken: string;
  idToken: string;
  user: any;

  constructor(public zone: NgZone) {
        console.log("auth0");
        this.user = this.getStorageVariable('profile');
        this.idToken = this.getStorageVariable('id_token');
        console.log(this.user);
        console.log(this.idToken);

  }


 private getStorageVariable(name) {
    console.log(name);
    return JSON.parse(window.localStorage.getItem(name));
  }

  private setStorageVariable(name, data) {
    console.log(name + "-" + data);
    window.localStorage.setItem(name, JSON.stringify(data));
  }

  private setIdToken(token) {
    this.idToken = token;
    this.setStorageVariable('id_token', token);
  }

  private setAccessToken(token) {
    this.accessToken = token;
    this.setStorageVariable('access_token', token);
  }

  public isAuthenticated() {
    const expiresAt = this.getStorageVariable('expires_at');
    console.log("isAuthenticated" + expiresAt);
    return Date.now() < expiresAt;
  }

  public login() {
    console.log("1");
    const client = new Auth0Cordova(auth0Config);

    console.log("2");
    const options = {
      scope: 'openid profile offline_access'
    };

    console.log("authorize");
    client.authorize(options, (err, authResult) => {
      if(err) {
        console.log(err);
        throw err;
      }

      this.setIdToken(authResult.idToken);
      this.setAccessToken(authResult.accessToken);

      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      console.log(expiresAt);
      this.setStorageVariable('expires_at', expiresAt);
      console.log("get user info");
      this.auth0.client.userInfo(this.accessToken, (err, profile) => {
        if(err) {
          console.log(err);
          throw err;
        }

        profile.user_metadata = profile.user_metadata || {};
        console.log("get profile");
        console.log(profile);
        this.setStorageVariable('profile', profile);
        this.zone.run(() => {
          this.user = profile;
        });
      });
    });
  }

  public logout() {
    // this.storage.remove('profile');
    // this.storage.remove('access_token');
    // this.storage.remove('id_token');
    // this.storage.remove('expires_at');

    window.localStorage.removeItem('profile');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('expires_at');

    this.idToken = null;
    this.accessToken = null;
    this.user = null;
  }
}