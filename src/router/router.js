// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
//引入路由组件 对应页面的相对路径
import home from "../views/home";
import notfound from "../views/404"
import test from "../components/test";
import login from "@/views/login"


// 使用VueRouter
Vue.use(VueRouter)

//定义全局路由的集合，数组类型，每个路由映射一个组件
const globalRoutes = [
    { path: '/login', name: 'login', component: login },
    { path: '/404' , name: '404', component: notfound}
]

const homeRoutes = {
    path: '/home',
    component: home,
    name: 'home',
    children:[
        { path: '/test', component: test, name: 'test'},
    ]
}

//实例化VueRouter
const router = new VueRouter({
    mode:'hash',
    routes: globalRoutes.concat(homeRoutes)
})
export default router
