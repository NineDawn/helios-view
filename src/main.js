import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import axios from 'axios'//引入axios
import router from "@/router/router";
import common from "./common/common";

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true

Vue.prototype.$axios = axios;//把axios挂载到vue上
Vue.use(ElementUI) //使用elementUI
Vue.prototype.$common = common;
Vue.config.productionTip = false;

new Vue({
  el:'#app',
  router,
  render: h => h(App),
})
