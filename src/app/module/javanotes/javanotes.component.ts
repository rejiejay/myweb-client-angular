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

  /**
   * 随机显示部分
   */
  public randomTitle: string;
  // tslint:disable-next-line: max-line-length
  public randomImageUrl: string;
  public randomHtmlContent: string;

  /**
   * 列表部分
   */
  // 列表排序
  // @param time 时间排序 就是 默认排序
  // @param random 随机排序
  public listSortType = 'time';
  public listAll = [
    // {
    //   id: 0,
    //   title: '',
    //   imageUrl: '',
    //   htmlContent: '',
    // }
  ];
  // 分页相关
  public pageNum = 1; // 页码
  public pageTotal = 1; // 一共有多少页数据
  public pageJumpInto: number; // 页面输入跳转

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

    /**
     * 修复 kolkov/angular-editor 内联样式 高度写死问题
     */
    setTimeout(() => {
      const DOM = document.getElementsByClassName('angular-editor-textarea')[0];
      DOM.setAttribute('style', 'min-height: 350px;');
    }, 200);
  }

  /**
   * 上传图片方法
   */
  uploadImage(event: any) {
    const uploadFile = this.uploadFile.nativeElement;

    uploadFile.click();
  }

  /**
   * 刷新随机显示部分
   */
  refreshTheRandom(event: any) {
    console.log('刷新随机显示部分');
  }

  /**
   * 编辑随机显示部分
   */
  editTheRandom(event: any) {
    console.log('编辑随机显示部分');
  }

  /**
   * 删除随机显示部分
   */
  delTheRandom(event: any) {
    console.log('删除随机显示部分');
  }

  /**
   * 列表部分方法
   */
  // 页数转换为页面需要的array方法
  pageTotalToArray() {
    return new Array(this.pageTotal).fill('').map((val, key) => key);
  }
  // 页数转换为页面需要的倒数5页面array方法
  pageToRecipArray() {
    return new Array(this.pageTotal).fill('').map((val, key) => (key + 1)).slice(-5);
  }
  // 页数转换为页面需要的区间页面array方法
  pageToIntervalArray() {
    const pageNum = this.pageNum;
    const intervalArray = [];

    for (let i = -2; i <= 2; i++) {
      intervalArray.push((pageNum + i));
    }

    return intervalArray;
  }
}
