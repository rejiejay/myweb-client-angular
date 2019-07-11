# 个人网站 前端 第N期 angular.js 版 

此项目与JAVA spring boot 项目互相进行配合

## 项目预览

[https://www.rejiejay.cn/](http://119.29.140.46/)

## 项目搭建
见 angular搭建文档.md

## 常用
- 新建模块
ng g module module/login1 --routing

## 项目启动
```cmd
npm start
```

## 单元测试
- –code-coverage -cc 代码覆盖率报告, 默认这个是不开启的, 因为生成报告的速度还是比较慢的. 
- –colors 输出结果使用各种颜色 默认开启 
- –single-run -sr 执行测试, 但是不检测文件变化 默认不开启 
- –progress 把测试的过程输出到控制台 默认开启 
- –sourcemaps -sm 生成sourcemaps 默认开启 
- –watch -w 运行测试一次, 并且检测变化 默认开启
```cmd
ng test
```

## 全局变量
localStorage.setItem('x-rejiejay-password', password);
localStorage.setItem('x-rejiejay-authorization', val.data.token);
localStorage.setItem('x-rejiejay-authorization-expired', val.data.tokenexpired.toString());
