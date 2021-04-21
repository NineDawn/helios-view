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
                "name": "二级菜单3",
                "level": 2,
                "url": "order",
                "parentId": 1,
                "sort": 1,
                "type": 1,
                "childMenus": []
            },
            {
                "id": 7,
                "name": "二级菜单4",
                "level": 2,
                "url": "userManager",
                "parentId": 1,
                "sort": 2,
                "type": 1,
                "childMenus": []
            }
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
                "name": "二级菜单1",
                "level": 2,
                "url": "",
                "parentId": 2,
                "sort": 2,
                "type": 1,
                "childMenus": []
            }
        ]
    }
]
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
