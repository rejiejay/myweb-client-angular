import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './assets/js/http.js'
import 'lib-flexible/flexible.js'
Vue.prototype.$http = axios

Vue.config.productionTip = false
import $ from 'jquery'
import './assets/css/base.styl'
import 'mint-ui/lib/style.css'
/* eslint-disable no-new */

if (process.env.type === 'test'||process.env.NODE_ENV === 'development') { // 如果是测试环境, 则生成控制台
  require.ensure([], require => { // 异步加载控制台
    let VConsole = require('vconsole');

    let defaultPlugins = ['system', 'network', 'element', 'storage'];
    if (window.location.host === 'localhost:8000') { // 本地测试不需要 system 输出
      defaultPlugins = ['network', 'element', 'storage']
    }
    new VConsole({
      defaultPlugins: defaultPlugins
    });
  });
}
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
