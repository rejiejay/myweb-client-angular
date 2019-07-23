import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing';
import { FormsModule } from '@angular/forms';

// import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,

    // NzButtonModule, // 引入 ng-zorro-antd 组件

    LoginRoutingModule
  ]
})
export class LoginModule { }
