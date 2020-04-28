import '@/lib/polyfill';
import 'animate.css'
import Vue from 'vue'
import App from './App'
import store from './store'
import {initApi} from './plugin/api';

Vue.config.productionTip = false

App.mpType = 'app'

// 注册拦截器，防止uni hook promise方法返回数组
uni.addInterceptor(uni.interceptors.promiseInterceptor);
// 挂载一下工具方法到uni这个全局变量上，方便调用
initApi();

const app = new Vue({
  ...App
})
app.$mount()
Vue.prototype.$store = store
