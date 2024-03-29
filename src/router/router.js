// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
//引入路由组件 对应页面的相对路径
import home from "../views/home";
import notfound from "../views/404"
import order from "../components/order";
import login from "@/views/login";
import userManager from "@/components/user_manager";
import departmentManager from "@/components/department_manager";
import roleManager from "@/components/role_manager";
import meetingRoomInfoManager from "@/components/meeting_room_info_manager";
import meetingRoomStatusManager from "@/components/meeting_room_status_manager"
import approveMeeting from "@/components/approve_meeting"
import orderMinutes from "@/components/order_minutes"
import myOrder from "@/components/my_order"
import checkMail from "../views/check_mail";
import index from "../components/index"
import examine from "@/components/repairs/examine"
import repairs from "@/components/repairs/repairs"
import show from "@/components/repairs/show"

// 使用VueRouter
Vue.use(VueRouter)

//定义全局路由的集合，数组类型，每个路由映射一个组件
const globalRoutes = [
    { path: "/check_mail",name: 'checkMail',component: checkMail},
    { path: "/", redirect: "/login"},
    { path: '/login', name: 'login', component: login },
    { path: '*', name: '404', component: notfound},

]

const homeRoutes = {
    path: '/home',
    component: home,
    name: 'home',
    children:[
        { path: '/order', component: order, name: 'order'},
        { path: '/userManager', component: userManager, name: 'userManager'},
        { path: '/departmentManager', component: departmentManager, name: 'departmentManager'},
        { path: '/roleManager', component: roleManager, name: 'roleManager'},
        { path: '/meetingRoomInfoManager', component: meetingRoomInfoManager, name: 'meetingRoomInfoManager'},
        { path: '/meetingRoomStatusManager', component: meetingRoomStatusManager, name: 'meetingRoomStatusManager'},
        { path: '/approveMeeting', component: approveMeeting, name: 'approveMeeting'},
        { path: '/orderMinutes', component: orderMinutes, name: 'orderMinutes'},
        { path: '/myOrder', component: myOrder, name: 'myOrder'},
        { path:'/examine',name:'examine',component:examine},
        { path:'/repairs',name:'repairs',component:repairs},
        { path:'/show',name:'show',component:show},
        { path: '/home', component: index, name: 'home'},
    ]
}

//实例化VueRouter
const router = new VueRouter({
    mode:'hash',
    routes: globalRoutes.concat(homeRoutes)
})
export default router
