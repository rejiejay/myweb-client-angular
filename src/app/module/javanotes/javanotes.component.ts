import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { JavaNotesService } from './javanotes.service';

@Component({
  selector: 'app-javanotes',
  templateUrl: './javanotes.component.html',
  styleUrls: ['./javanotes.component.less']
})
export class JavaNotesComponent implements OnInit {
  /**
   * 表单输入部分
   */
  public title: string;
  public urlImage: SafeUrl; // 动态给img的src赋值blob,报不安全错误
  public htmlContent: string;

  @ViewChild('uploadFile', null) uploadFile: ElementRef;

  constructor(public sanitizer: DomSanitizer, public storage: JavaNotesService, public location: Location) {
  }

  ngOnInit() {
    const self = this;
    const uploadFile = this.uploadFile.nativeElement;

    // 初始化 绑定 上传文件 事件
    uploadFile.onchange = (event: any) => {
      const file = event.target.files[0];

      // 动态给img的src赋值blob,报不安全错误
      self.urlImage = self.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));

      // uploadFile.value = ''; // 因为考虑到用户会重复上传, 重复上传不会触发 onchange 所以要清空一下
    };
  }

  /**
   * 上传图片方法
   */
  uploadImage(event: any) {
    const uploadFile = this.uploadFile.nativeElement;

    uploadFile.click();
  }
}
