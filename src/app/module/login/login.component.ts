import { Component, OnInit } from '@angular/core';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public password = ''; // 表单里面输入的密码

  constructor(public storage: LoginService) {
  }

  ngOnInit() {
  }

  /**
   * 提交表单数据
   */
  loginSubmit() {
    const password = this.password;

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

    this.storage.loginSubmit(password).subscribe(
      (val: LoginResult) => {
        if (val.result === 1) {
          localStorage.setItem('x-rejiejay-authorization', val.data.token);
          localStorage.setItem('x-rejiejay-authorization-expired', val.data.tokenexpired.toString());
        } else {
          alert(val.message);
        }
      },
      error => {
        alert(error);
      }
    );
  }
}
