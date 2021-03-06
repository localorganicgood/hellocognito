import {Component, OnInit} from '@angular/core';
import {AwsUtil} from './service/aws.service';
import {UserLoginService} from './service/user-login.service';
import {CognitoUtil, LoggedInCallback} from './service/cognito.service';

import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, LoggedInCallback {

  constructor(public awsUtil: AwsUtil, public userService: UserLoginService, public cognito: CognitoUtil, private http: Http) {
    console.log('AppComponent: constructor');
  }

  ngOnInit() {
    console.log('AppComponent: Checking if the user is already authenticated');
    console.log(Headers);
    this.userService.isAuthenticated(this);
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    console.log('AppComponent: the user is authenticated: ' + isLoggedIn);
    let mythis = this;
    this.cognito.getIdToken({
      callback() {

      },
      callbackWithParam(token: any) {
        // Include the passed-in callback here as well so that it's executed downstream
        console.log('AppComponent: calling initAwsService in callback')
        mythis.awsUtil.initAwsService(null, isLoggedIn, token);
      }
    });
  }
}
