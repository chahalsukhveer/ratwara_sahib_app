import { Injectable, NgZone } from '@angular/core';
import * as Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';
import { GlobalVariable } from '../../globals';
import { Storage } from '@ionic/storage';

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
  // auth0 = new Auth0.WebAuth(auth0Config);
  Auth0 = new auth0.WebAuth(auth0Config);
  Client = new Auth0Cordova(auth0Config);
  accessToken: string;
  idToken: string;
  user: any;
  loggedIn: boolean;
  loading = true;

  constructor(public zone: NgZone, private storage: Storage) {
        console.log("auth0");

        this.storage.get('profile').then(user => this.user = user);
        this.storage.get('access_token').then(token => this.accessToken = token);
        this.storage.get('expires_at').then(exp => {
          this.loggedIn = Date.now() < JSON.parse(exp);
          this.loading = false;
        });
  
  }

  login() {
    this.loading = true;
    const options = {
      scope: 'openid profile offline_access'
    };
    // Authorize login request with Auth0: open login page and get auth results
    this.Client.authorize(options, (err, authResult) => {
      if (err) {
        throw err;
      }
      // Set Access Token
      this.storage.set('access_token', authResult.accessToken);
      this.accessToken = authResult.accessToken;
      // Set Access Token expiration
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      this.storage.set('expires_at', expiresAt);
      // Set logged in
      this.loading = false;
      this.loggedIn = true;
      // Fetch user's profile info
      this.Auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (err) {
          throw err;
        }
        this.storage.set('profile', profile).then(val =>
          this.zone.run(() => this.user = profile)
        );
      });
    });
  }

  logout() {
    this.storage.remove('profile');
    this.storage.remove('access_token');
    this.storage.remove('expires_at');
    this.accessToken = null;
    this.user = null;
    this.loggedIn = false;
  }
}