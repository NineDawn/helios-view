<template>
  <el-submenu
      v-if="menu.childMenus && menu.childMenus.length >= 1"
      :index="menu.id + ''"
      >
    <template slot="title">
      <span>{{ menu.name }}</span>
    </template>
    <sub-menu
        v-for="item in menu.childMenus"
        :key="item.url"
        :menu="item"
    >
    </sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="menu.url + ''" @click="gotoRouteHandle(menu.url)">
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>

import subMenu from './sub_menu'
export default {
  name: 'subMenu',
  props: {
    menu: {
      type: Object,
      required: true
    },
  },
  components: {
    subMenu
  },methods: {
    gotoRouteHandle (url) {
      this.$router.push({ name: url })
    }
  }
}
</script>
