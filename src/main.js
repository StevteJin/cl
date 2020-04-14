import Vue from 'vue'
import './global.js'
import './date-formatter.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 拖拽排序
import VueDND from 'awe-dnd'
Vue.use(VueDND)

// 无限加载
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

//引入axios
import axios from './http'
Vue.prototype.axios = axios

import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);
//解决IE下面的promise报错
import "babel-polyfill"

import "es6-promise"

import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
