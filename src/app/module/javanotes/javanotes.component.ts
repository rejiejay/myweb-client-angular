import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { JavaNotesService } from './javanotes.service';
import { MyServiceService } from './../../app.service';
import { TimeConvert } from './../../../utils/TimeConvert';
import { Consequencer, consequent } from './../../../utils/Consequencer';

@Component({
  selector: 'app-javanotes',
  templateUrl: './javanotes.component.html',
  styleUrls: ['./javanotes.component.less']
})
export class JavaNotesComponent implements OnInit {
  /**
   * 表单输入部分
   */
  public noteId: number;
  public title: string;
  @ViewChild('uploadFile', null) uploadFile: ElementRef;
  public urlImage: SafeUrl; // 动态给img的src赋值blob,报不安全错误
  public imageId: string; // 图片唯一标识
  public htmlContent: string;

  /**
   * 随机显示部分
   */
  public randomId: number;
  public randomTitle: string;
  // tslint:disable-next-line: max-line-length
  public randomImageKey: string;
  public randomImageUrl: string;
  public randomHtmlContent: string;

  /**
   * 列表部分
   *
   * @param time 时间排序 就是 默认排序
   * @param random 随机排序
   */
  public listSortType = 'time';
  @ViewChild('listSortSelect', null) listSortSelect: ElementRef;
  public optionSortType = [
    { value: 'time', lable: '时间排序' },
    { value: 'random', lable: '随机排序' },
  ];
  public listAll: [{
    id: number;
    title: string;
    imagekey: string;
    imageUrl: string;
    htmlContent: string;
  }];

  /**
   * 分页相关
   */
  public pageNum = 1; // 页码
  public pageTotal = 1; // 一共有多少页数据
  public pageJumpInto: number; // 页面输入跳转

  // tslint:disable-next-line: max-line-length
  constructor(public basestorage: MyServiceService, public sanitizer: DomSanitizer, public storage: JavaNotesService, public location: Location) {
  }

  ngOnInit() {
    const self = this;

    /**
     * 初始化 图片 绑定 上传文件 事件
     */
    const uploadFile = this.uploadFile.nativeElement;
    uploadFile.onchange = (event: any) => self.uploadImageOnchange(event.target.files[0], self);

    /**
     * 初始化 粘贴板上传图片
     * 因为后面会remove掉，所以这种形式实现
     */
    const uploadClipboardData = this.uploadClipboardData.bind(this);
    document.addEventListener('paste', uploadClipboardData);

    /**
     * 修复 kolkov/angular-editor 内联样式 高度写死问题
     */
    setTimeout(() => {
      const DOM = document.getElementsByClassName('angular-editor-textarea')[0];
      DOM.setAttribute('style', 'min-height: 350px;');
    }, 200);

    /**
     * 初始化列表数据
     */
    this.getNoteList(this.pageNum, this.listSortType);

    /**
     * 初始化随机获取一条数据
     */
    this.getRandomOneNotes();
  }

  OnDestroy() {
    document.removeEventListener('paste', this.uploadClipboardData);
  }

  /**
   * 初始化列表数据
   * @param pageNo 分页
   * @param sort 排序方式 time random
   */
  async getNoteList(pageNo: number, sort: string) {
    interface JavaNoteItem {
      id: number;
      title: string;
      content: string;
      imageUrl: string;
      imagekey: string;
      tag: string;
      timestamp: number;
    }

    const getNoteListResult = await this.basestorage.apiget(`/java/notes/list?pageNo=${pageNo ? pageNo : 1}&sort=${sort ? sort : 'time'}`);

    if (getNoteListResult.result !== 1) {
      return alert(`获取列表数据失败, 原因: ${getNoteListResult.message}`);
    }

    // 一共有多少页
    this.pageTotal = Math.ceil(getNoteListResult.data.total / 10);

    this.listAll = getNoteListResult.data.javaNotes.map((val: JavaNoteItem) => {
      const item = {
        id: val.id,
        title: val.title,
        imagekey: val.imagekey,
        imageUrl: '',
        htmlContent: val.content,
      };

      if (val.imagekey) {
        item.imageUrl = val.imageUrl;
      }

      return item;
    });
  }

  /**
   * 初始化随机获取一条数据
   */
  async getRandomOneNotes() {
    const gettRandomNoteResult: {
      result: number;
      data: {
        id: number;
        title: string;
        imageUrl: string;
        imagekey: string;
        content: string;
        tag: string;
        timestamp: number;
      };
      message: string;
    } = await this.basestorage.apiget('/java/notes/get/random');


    // 读取失败的情况
    if (gettRandomNoteResult.result !== 1) {
      return alert(`随机获取一条数据失败，原因：${gettRandomNoteResult.message}`);
    }

    const data = gettRandomNoteResult.data;

    this.randomId = data.id;
    this.randomTitle = data.title;
    this.randomImageKey = data.imagekey;
    this.randomImageUrl = data.imageUrl;
    this.randomHtmlContent = data.content;
  }

  /**
   * 点击图片
   */
  uploadImage(event: any) {
    const uploadFile = this.uploadFile.nativeElement;

    uploadFile.click();
  }

  /**
   * 初始化 粘贴板上传图片
   */
  uploadClipboardData(event: any) {
    const slef = this;

    const clipboardItems = event.clipboardData && event.clipboardData.items;
    let file = null;

    if (!clipboardItems || clipboardItems.length <= 0) {
      return;
    }

    // 检索剪切板items
    for (const item of clipboardItems) {
      if (item.type.indexOf('image') !== -1) {
        file = item.getAsFile();
        break;
      }
    }

    if (file === null) {
      return;
    }

    // 此时file就是剪切板中的图片文件
    slef.uploadImageOnchange(file, slef);
  }

  /**
   * 编辑一条笔记
   */
  async editNotesFrom() {
    interface EditData { id: number; title: string; imageId: string; htmlContent: string; }
    const id = this.noteId;
    const htmlContent = this.htmlContent;
    const imageId = this.imageId;
    let title = this.title;

    // 内容不可为空
    if (!htmlContent) {
      return alert('内容不能为空!');
    }

    // 如果没有输入标题, 使用默认标题即可
    if (!title) {
      title = TimeConvert.dateToYYYYmmDDhhMM00(new Date());
    }

    // 开始上传编辑
    const editData: EditData = { id, title, imageId, htmlContent };
    const editResult = await this.basestorage.apipost('/java/notes/edit', editData);

    if (editResult.result !== 1) {
      // 表示上传编辑失败
      console.log(editResult);
      return alert(editResult.message);
    }

    this.cleanNotesFrom(); // 清空正在编辑的数据

    /**
     * 重新获取一遍数据是必须的操作
     */
    this.getRandomOneNotes();
    this.getNoteList(this.pageNum, this.listSortType);
  }

  /**
   * 清空正在编辑的数据
   */
  cleanNotesFrom() {
    this.noteId = null; // 执行清空
    this.title = '';
    this.htmlContent = '';

    // 清空图片
    this.imageId = '';
    this.urlImage = '';
    this.uploadFile.nativeElement.value = '';
  }

  /**
   * 清空图片
   */
  cleanImage() {
    if (confirm('你确定要删除这张图片吗?')) {
      this.imageId = '';
      this.urlImage = '';
      this.uploadFile.nativeElement.value = '';
    }
  }

  /**
   * 上传图片方法
   */
  async uploadImageOnchange(file: any, self: any) {
    /**
     * 读取base64位图片的方法
     */
    const imgReaderResult = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(consequent.success(reader.result, 'successful'));
      };
      reader.onerror = (error: any) => {
        reject(consequent.error(error, null, null));
      };
    }).then(
      (resolve: Consequencer) => resolve,
      (error: Consequencer) => error
    );

    // 读取失败的情况
    if (imgReaderResult.result !== 1) {
      alert(`读取图片数据失败，原因：${imgReaderResult.message}`);
      return;
    }

    const uploaResult = await this.basestorage.uploadImageByBase64('/upload/', imgReaderResult.data);

    // 上传失败的情况
    if (uploaResult.result !== 1) {
      alert(`上传图片数据失败，原因：${uploaResult.message}`);
      return;
    }

    self.imageId = uploaResult.data.fileId;

    // 动态给img的src赋值blob,报不安全错误
    self.urlImage = self.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));

    self.uploadFile.nativeElement.value = ''; // 因为考虑到用户会重复上传, 重复上传不会触发 onchange 所以要清空一下
  }

  /**
   * 新增一条笔记
   */
  async addJavaNotes() {
    interface UploadData { title: string; imageId: string; htmlContent: string; }
    const htmlContent = this.htmlContent;
    const imageId = this.imageId;
    let title = this.title;

    // 内容不可为空
    if (!htmlContent) {
      return alert('内容不能为空!');
    }

    // 如果没有输入标题, 使用默认标题即可
    if (!title) {
      title = TimeConvert.dateToYYYYmmDDhhMM00(new Date());
    }

    // 开始上传
    const uploadData: UploadData = { title, imageId, htmlContent };
    const uploaResult = await this.basestorage.apipost('/java/notes/add', uploadData);

    if (uploaResult.result !== 1) {
      // 表示上传失败
      console.log(uploaResult);
      return alert(uploaResult.message);
    }

    // 表示上传成功
    this.cleanNotesFrom(); // 清空正在编辑的数据

    /**
     * 重新获取一遍数据
     */
    this.getNoteList(this.pageNum, this.listSortType);
  }

  /**
   * 随机部分方法
   */
  // 编辑随机显示部分
  editTheRandom(event: any) {
    this.noteId = this.randomId;
    this.title = this.randomTitle;
    this.urlImage = this.randomImageUrl;
    this.imageId = this.randomImageKey;
    this.htmlContent = this.randomHtmlContent;
  }
  // 删除随机显示部分
  async delTheRandom(event: any) {
    interface DelJavaData { id: number; }
    const delJavaData: DelJavaData = { id: this.randomId };

    if (confirm('确定要删除这条数据吗?')) {
      const delJavaResult = await this.basestorage.apipost('/java/notes/del', delJavaData);

      if (delJavaResult.result !== 1) {
        // 表示删除失败
        console.log(delJavaResult);
        return alert(delJavaResult.message);
      }

      /**
       * 删除成功的情况
       */
      if (this.noteId === this.randomId) { // 需要判断一下正在编辑的表单输入是否有删除的数据
        this.cleanNotesFrom();
      }

      // 重新获取一遍数据是必须的操作
      this.getRandomOneNotes();
      this.getNoteList(this.pageNum, this.listSortType);
    }
  }

  /**
   * 列表部分方法
   */
  // 随机获取10条数据刷新页面
  getNoteListRandom() {
    this.pageNum = 1;
    this.listSortType = 'random';
    this.getNoteList(this.pageNum, this.listSortType);
  }
  // 选中一条数据
  selectJavaNote(item: {
    id: number;
    title: string;
    imagekey: string;
    imageUrl: string;
    htmlContent: string;
  }) {
    this.randomId = item.id;
    this.randomTitle = item.title;
    this.randomImageKey = item.imagekey;
    this.randomImageUrl = item.imageUrl;
    this.randomHtmlContent = item.htmlContent;
  }
  // 选择排序方法
  selectSortType(event: any) {
    const sortType = event.target.value;
    this.listSortType = sortType;

    // 如果切换为随机排序 当前页面改为 1页
    if (sortType === 'random') {
      this.pageNum = 1;
    }

    // 重新获取一遍列表数据
    this.getNoteList(this.pageNum, this.listSortType);
  }
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

  /**
   * 分页相关
   */
  // 返回上一页
  jumpPrePage() {
    const pageNum = this.pageNum;

    if (pageNum > 1) {
      this.pageNum = pageNum - 1;
    }

    this.getNoteList(this.pageNum, this.listSortType);
  }
  // 跳转某一页
  jumpPageBy(PageNo: number) {
    if (this.pageNum !== PageNo) {
      this.pageNum = PageNo;

      this.getNoteList(this.pageNum, this.listSortType);
    }
  }
  // 下一页
  jumpNexPage() {
    this.pageNum = this.pageNum + 1;
    this.getNoteList(this.pageNum, this.listSortType);
  }
  // 跳转输入
  pageJumpDataSubmit() {
    const pageTotal = this.pageTotal;
    const pageJumpInto = this.pageJumpInto;

    if (pageJumpInto >= pageTotal) {
      this.pageJumpInto = pageTotal;
    }

    if (pageJumpInto <= 0) {
      this.pageJumpInto = 1;
    }

    this.pageNum = this.pageJumpInto;
    this.getNoteList(this.pageNum, 'time');
  }
}
