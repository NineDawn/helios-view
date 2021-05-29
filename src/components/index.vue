<template>
  <div id="index">
    <div class="mod-home">
      <h3>项目介绍</h3>
      <ul>
        <li>
          helios-view基于vue、element-ui构建开发，实现了企业级会议室管理功能，为企业预约和管理会议室
          ，提供了一套更优的解决方案
        </li>
        <li>前后端分离，通过json来进行数据交互，可独立部署
        </li>
        <li>动态菜单，通过角色管理中的菜单权限来统一管理访问路由</li>
        <li>演示地址：<a href="https://ninedawn.cn"
                    target="_blank">https://ninedawn.cn</a> (账号密码：admin/helios)
        </li>
      </ul>
      <h3>获取帮助</h3>
      <ul>
        <li>前端Git地址：<a href="https://github.com/NineDawn/helios-view" target="_blank">https://github.com/NineDawn/helios-view</a>
        </li>
        <li>后台Git地址：<a href="https://github.com/NineDawn/helios" target="_blank">https://github.com/NineDawn/helios</a>
        </li>
        <li>如需关注项目最新动态，请Watch、Star项目，同时也是对项目最好的支持</li>
      </ul>
      <h3>Power By:郑云鹤</h3>
      <ul>
        <li>QQ：1204969730</li>
        <li>WeChat：ninedawn9</li>
      </ul>
    </div>
    <div id="pic">
      <img :src="require('../assets/img/1.png')" alt="" height="100%" width="100%"/>
    </div>
  </div>

</template>

<script>
export default {
  name: "index.vue",
  mounted() {

    localStorage.setItem("menuActiveName", "home")

  },
}


</script>

<style scoped>
#pic {
  width: 40vh;
  height: 85vh;
}
.mod-home {
  line-height: 1.5;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
  font-size: 14px;
}
a {
  color: #45c2b5;
  text-decoration: none;
}
#index{
  display: flex;
}
</style>
