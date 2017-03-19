import { Storage } from '@ionic/storage';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable, NgZone } from '@angular/core';
import { GlobalVariable } from '../../globals';
import { Auth0Lock } from 'auth0-lock';
import { Auth0 } from 'auth0-js';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();
  auth0 = new Auth0.WebAuth({clientID: GlobalVariable.AUTH0_CLIENT_ID, domain: GlobalVariable.AUTH0_DOMAIN });
  lock = new Auth0Lock(GlobalVariable.AUTH0_CLIENT_ID, GlobalVariable.AUTH0_DOMAIN, {
    auth: {
      redirect: false,
      params: {
        scope: 'openid profile offline_access',
        device: 'my-device'
      },
      sso: false
    }
  });

  storage: Storage = new Storage();
  user: Object;
  idToken: string;
  accessToken: string;
  refreshSubscription: any;
  zoneImpl: NgZone;

  constructor(private authHttp: AuthHttp, zone: NgZone) {
    this.zoneImpl = zone;
    console.log('auth');
    // If there is a profile saved in storage storage
    this.storage.get('profile').then(profile => {
      console.log(profile);
      this.user = JSON.parse(profile);
    }).catch(error => {
      console.log(error);
    });

    this.storage.get('access_token').then(token => {
      this.accessToken = token;
    });

   this.lock.on('authenticated', authResult => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.storage.set('access_token', authResult.accessToken);
        this.storage.set('id_token', authResult.idToken);
        this.storage.set('refresh_token', authResult.refreshToken);
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;

        // Fetch profile information
        this.lock.getUserInfo(this.accessToken, (error, profile) => {
          if (error) {
            // Handle error
            alert(error);
            return;
          }

          profile.user_metadata = profile.user_metadata || {};
          this.storage.set('profile', JSON.stringify(profile));
          this.user = profile;
        });

        this.lock.hide();

        this.zoneImpl.run(() => this.user = authResult.profile);
        // Schedule a token refresh
        this.scheduleRefresh();
      }

    });    

  }

  public authenticated() {
    // Check if there's an unexpired JWT
    console.log('authenticated');
    return tokenNotExpired('id_token', this.idToken );
  }

  public login() {
    // Show the Auth0 Lock widget
    this.lock.show();
  }

  public logout() {
    this.storage.remove('profile');
    this.storage.remove('access_token');
    this.storage.remove('id_token');
    this.idToken = null;
    this.storage.remove('refresh_token');
    this.zoneImpl.run(() => this.user = null);
    // Unschedule the token refresh
    this.unscheduleRefresh();
  }
  
  public scheduleRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token

    let source = Observable.of(this.idToken).flatMap(
      token => {
        // The delay to generate in this case is the difference
        // between the expiry time and the issued at time
        let jwtIat = this.jwtHelper.decodeToken(token).iat;
        let jwtExp = this.jwtHelper.decodeToken(token).exp;
        let iat = new Date(0);
        let exp = new Date(0);
        
        let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));
        
        return Observable.interval(delay);
      });
     
    this.refreshSubscription = source.subscribe(() => {
      this.getNewJwt();
    });
  }
  
  public startupTokenRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    if (this.authenticated()) {
      let source = Observable.of(this.idToken).flatMap(
        token => {
          // Get the expiry time to generate
          // a delay in milliseconds
          let now: number = new Date().valueOf();
          let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
          let exp: Date = new Date(0);
          exp.setUTCSeconds(jwtExp);
          let delay: number = exp.valueOf() - now;
          
          // Use the delay in a timer to
          // run the refresh at the proper time
          return Observable.timer(delay);
        });
      
       // Once the delay time from above is
       // reached, get a new JWT and schedule
       // additional refreshes
       source.subscribe(() => {
         this.getNewJwt();
         this.scheduleRefresh();
       });
    }
  }
  
  public unscheduleRefresh() {
    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
  
  public getNewJwt() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage
    this.storage.get('refresh_token').then(token => {
      this.auth0.getClient().refreshToken(token, (err, delegationRequest) => {
        if (err) {
          alert(err);
        }
        this.storage.set('id_token', delegationRequest.id_token);
        this.idToken = delegationRequest.id_token;
      });
    }).catch(error => {
      console.log(error);
    });
    
  }
}
