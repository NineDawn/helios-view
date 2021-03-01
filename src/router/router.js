// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
//引入路由组件 对应页面的相对路径
import register from "@/views/register"

// 使用VueRouter
Vue.use(VueRouter)

//定义routes路由的集合，数组类型，每个路由映射一个组件
const routes = [
    //单个路由均为对象类型，path代表的是路径与to属性对应，component代表路由组件
    { path: '/', component: register }
]

//实例化VueRouter
const router = new VueRouter({
    mode:'hash',
    routes:routes
})
export default router