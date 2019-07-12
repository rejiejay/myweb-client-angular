cnpm install -g @angular/cli -d
- y ( Would you like to share anonymous usage data with the Angular Team at Google under Google’s Privacy Policy at https://policies.google.com privacy? For more details and how to change this setting, see http://angular.io/analytics.)

ng new myweb-client-angular
- y (Would you like to add Angular routing?
- Less

# 解决跨域
新建 proxy.conf.json
{
    "/api": {
        "target": "http://127.0.0.1:1938",
        "secure": false
    }
}

改写package.json
ng serve --open --proxy-config proxy.conf.json

ng add ng-zorro-antd
- y (? Add icon assets [ Detail: https://ng.ant.design/components/icon/en ] (y/N)
- N (Set up custom theme file [ Detail: https://ng.ant.design/docs/customize-theme/en ] (y/N)
- zh_CN (Choose your locale code
- blank (Choose template to create project: (Use arrow keys)

npm install crypto-js --save -d
npm install uuid --save -d

npm install @kolkov/angular-editor --save
