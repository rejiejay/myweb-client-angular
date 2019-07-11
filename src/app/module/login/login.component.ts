import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { LoginService } from './login.service';
import { MyLoading } from './../../../utils/MyLoading';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public password = ''; // 表单里面输入的密码

  constructor(public storage: LoginService, public location: Location) {
  }

  ngOnInit() {
  }

  /**
   * 提交表单数据
   */
  loginSubmit() {
    const password = this.password;
    const location = this.location;

    interface LoginResult {
      result: number;
      data: {
        token: string;
        tokenexpired: number;
      };
      message: string;
    }

    if (password.length < 6) {
      return alert('密码不能小于6位数');
    }

    MyLoading.show();
    this.storage.loginSubmit(password).subscribe(
      (val: LoginResult) => {
        MyLoading.hide();
        if (val.result === 1) {
          localStorage.setItem('x-rejiejay-password', password);
          localStorage.setItem('x-rejiejay-token', val.data.token);
          localStorage.setItem('x-rejiejay-token-expired', val.data.tokenexpired.toString());
          location.back();
        } else {
          alert(val.message);
        }
      },
      error => {
        MyLoading.hide();
        alert(error);
      }
    );
  }
}
