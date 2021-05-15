<template>
    <div>
      <el-menu
          :default-active=" menuActiveName || 'home'"
          :collapseTransition="true"
          background-color="#67707a"
          text-color="#fff"
          style="width: 200px"
      >
        <el-menu-item index="home" @click="$router.push('/home')" >
          <span class="el-icon-house"/>
          <span slot="title" >首页</span>
        </el-menu-item>
        <subMenu style="width: 200px"
            v-for="menu in this.menu"
            :key="menu.id"
            :menu="menu"
        >
        </subMenu>
      </el-menu>
    </div>
</template>

<script>
import subMenu from "./sub_menu";

export default {
  components: {subMenu},
  data(){
    return{
      menu:[],
      menuActiveName:localStorage.getItem("menuActiveName")
    }
  },
  methods:{
    getUserMenu(){
      var userInfo = JSON.parse(localStorage.getItem("userInfo"))
      if (userInfo == null){
        return
      }
      this.menu = userInfo.menu || []
    }
  },
  mounted(){
    this.getUserMenu();
  }
}
</script>

<style scoped>

</style>
