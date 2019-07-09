import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public password = ''; // 表单里面输入的密码

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * 提交表单数据
   */
  loginSubmit() {

  }
}
