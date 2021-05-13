const common = {}
// 页面文档可视高度(随窗口改变大小)
common.documentClientHeight= 0;
// 侧边栏, 折叠状态
common.sidebarFold=false
// 侧边栏, 菜单
common.menuList=[
    {
        "id": 1,
        "name": "一级菜单1",
        "level": 1,
        "url": "",
        "parentId": 0,
        "sort": 1,
        "type": 1,
        "childMenus": [
            {
                "id": 5,
                "name": "预约会议",
                "level": 2,
                "url": "order",
                "parentId": 1,
                "sort": 1,
                "type": 1,
                "childMenus": []
            },
            {
                "id": 7,
                "name": "用户管理",
                "level": 2,
                "url": "userManager",
                "parentId": 1,
                "sort": 2,
                "type": 1,
                "childMenus": []
            },
            {
                "id": 8,
                "name": "部门管理",
                "level": 2,
                "url": "departmentManager",
                "parentId": 1,
                "sort": 3,
                "type": 1,
                "childMenus": []
            },
            {
                "id": 9,
                "name": "角色管理",
                "level": 2,
                "url": "roleManager",
                "parentId": 1,
                "sort": 4,
                "type": 1,
                "childMenus": []
            },
            {
                "id": 10,
                "name": "信息管理",
                "level": 2,
                "url": "meetingRoomInfoManager",
                "parentId": 1,
                "sort": 5,
                "type": 1,
                "childMenus": []
            },
            {
                "id": 11,
                "name": "状态管理",
                "level": 2,
                "url": "meetingRoomStatusManager",
                "parentId": 1,
                "sort": 6,
                "type": 1,
                "childMenus": []
            },
            {
                "id": 12,
                "name": "审批会议",
                "level": 2,
                "url": "approveMeeting",
                "parentId": 1,
                "sort": 7,
                "type": 1,
                "childMenus": []
            },
            {
                "id": 13,
                "name": "预约记录",
                "level": 2,
                "url": "orderMinutes",
                "parentId": 1,
                "sort": 8,
                "type": 1,
                "childMenus": []
            },
        ]
    },
    {
        "id": 2,
        "name": "一级菜单2",
        "level": 1,
        "url": "",
        "parentId": 0,
        "sort": 2,
        "type": 1,
        "childMenus": [
            {
                "id": 4,
                "name": "二级菜单2",
                "level": 2,
                "url": "",
                "parentId": 2,
                "sort": 1,
                "type": 1,
                "childMenus": [
                    {
                        "id": 6,
                        "name": "三级菜单1",
                        "level": 3,
                        "url": "",
                        "parentId": 4,
                        "sort": 1,
                        "type": 1,
                        "childMenus": []
                    }
                ]
            },
            {
                "id": 3,
                "name": "角色管理",
                "level": 2,
                "url": "roleManager",
                "parentId": 2,
                "sort": 2,
                "type": 1,
                "childMenus": []
            }
        ]
    }
]

common.permissionList = [{
    name: "用户管理",
    permissions : [{
        id : 1,
        name : "新增"
    },{
        id : 2,
        name : "修改"
    },{
        id : 3,
        name : "删除"
    }]
},{
    name: "角色管理",
    permissions : [{
        id : 4,
        name : "新增"
    },{
        id : 5,
        name : "修改"
    },{
        id : 6,
        name : "删除"
    }]
},{
    name: "部门管理",
    permissions : [{
        id : 7,
        name : "新增"
    },{
        id : 8,
        name : "修改"
    },{
        id : 9,
        name : "删除"
    }]
}]

common.menuActiveName=''
// 内容, 是否需要刷新
common.contentIsNeedRefresh=false
// 主入口标签页
common.mainTabs=[]
common.mainTabsActiveName=''
common.router = []
common.reset = function (){
    common.documentClientHeight= 0
    common.sidebarFold=false
    common.menuList=[]
    common.menuActiveName=''
    common.contentIsNeedRefresh=false
    common.mainTabs=[]
    common.mainTabsActiveName=''
}

export default common
