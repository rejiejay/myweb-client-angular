import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment  } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  loginSubmit(password: string) {
    interface Body {
      password: string;
    }

    const body: Body = {
      password
    };

    const headers = new HttpHeaders().set(
      'Content-type',
      'application/json; charset=UTF-8'
    );

    return this.http.post(`${environment.baseUrl}/login/rejiejay`, body, { headers });
  }
}
