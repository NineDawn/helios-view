<template>
    <div>
      <el-menu
          :default-active="this.$common.menuActiveName || 'home'"
          :collapse="this.$common.sidebarFold"
          :collapseTransition="true"
          background-color="#545c64"
          text-color="#fff"
          style="width: 200px"
      >
        <el-menu-item index="home" @click="$router.push('/home')" >
          <span class="el-icon-house"/>
          <span slot="title" >首页</span>
        </el-menu-item>
        <subMenu style="width: 200px"
            v-for="menu in this.$common.menuList"
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

    }
  },
}
</script>

<style scoped>

</style>
