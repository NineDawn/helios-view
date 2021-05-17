import Vue from 'vue'
import App from './App.vue'
import ElementUI, {Message} from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import axios from 'axios'//引入axios
import router from "@/router/router";

axios.defaults.baseURL = 'https://ninedawn.cn'
axios.defaults.withCredentials = true

Vue.prototype.$axios = axios;//把axios挂载到vue上
Vue.use(ElementUI) //使用elementUI
Vue.config.productionTip = false;

Vue.directive('loadmore', {
  bind (el, binding) {
    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    SELECTWRAP_DOM.addEventListener('scroll', function () {

      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
      if (CONDITION) {
        binding.value()
      }
    })
  }
})

new Vue({
  el:'#app',
  router,
  render: h => h(App),
})

const errorHandler = err => {

  if(err.message === "用户未登录!"){
    if (localStorage.getItem("userInfo") == null){
      Message({
        message:  "请在登录后使用!",
        type: 'error'
      })
    }else {
      Message({
        message:  "登录已过期，请重新登录!",
        type: 'error'
      })
    }
    localStorage.removeItem("userInfo")
    localStorage.removeItem("menuActiveName")
    router.push('login')
  }
  else {
    Message({
      message:  err.message || '未知错误',
      type: 'error'
    })
  }
}

Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error)=> errorHandler(error,this);
