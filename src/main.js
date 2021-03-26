import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import axios from 'axios'//引入axios
import router from "@/router/router";

axios.defaults.baseURL = 'http://192.168.31.201:8081'
axios.defaults.withCredentials = true

Vue.prototype.$axios = axios;//把axios挂载到vue上
Vue.use(ElementUI) //使用elementUI

Vue.config.productionTip = false

new Vue({
  el:'#app',
  router,
  render: h => h(App),
})
