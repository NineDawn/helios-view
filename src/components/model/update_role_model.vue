<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="updateRole-input-first">
        <div class="updateRole-input-name">角色名称:</div>
        <div>
          <el-input v-model="role.name" placeholder="角色名称"
                    style="width: 450px" @input="validName"></el-input>
        </div>
      </div>
      <div class="updateRole-msg">{{nameMsg}}</div>
      <div class="updateRole-input">
        <div class="updateRole-input-name">备注:</div>
        <div>
          <el-input v-model="role.remark" placeholder="请输入备注"
                    style="width: 450px" @input="validRemark"
                    maxlength="20" show-word-limit></el-input>
        </div>
      </div>
      <div class="menu-permission">
        <div class="updateRole-input-name">菜单权限:</div>
        <div class="menu-permission-tree">
          <el-tree
              :data="menuList"
              show-checkbox
              node-key="id"
              ref="menuPermissionTree"
              :default-expand-all = "isExpand"
              :default-checked-keys="roleMenuIds"
              :props="menuProps">
          </el-tree>
        </div>
      </div>
      <div class="menu-permission">
        <div class="updateRole-input-name">功能权限:</div>
        <div class="menu-permission-tree">
          <el-tree
              :data="permissionList"
              show-checkbox
              node-key="id"
              ref="functionPermissionTree"
              :default-expand-all = "isExpand"
              :default-checked-keys="rolePermissionIds"
              :props="permissionProps">
          </el-tree>
        </div>
      </div>
      <div class="updateRole-button">
        <div class="updateRole-button-left">
          <el-button type="primary" @click="closeUpdateRole">关闭</el-button>
        </div>
        <div class="updateRole-button-right">
          <el-button type="success" @click="updateRole" :disabled="updateRoleButtonFlag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "update_role_model",
  props: {
    role: Object
  },
  data(){
    return{
      isExpand : true,
      menuList: [],
      permissionList : this.$common.permissionList,
      roleMenuIds: [],
      rolePermissionIds: [],
      nameMsg: '',
      nameFlag: true,
      updateRoleButtonFlag: false,
      menuProps:{
        label : "name",
        children : "childMenus"
      },
      permissionProps:{
        label : "name",
        children: "permissions"
      },
    }
  },
  mounted(){
    this.getMenuList()
    this.getPermissionList()
  },
  methods:{
    closeUpdateRole(){
      this.$emit("closeUpdateRole")
      this.clearData()
    },
    clearData(){
      this.role = {}
      this.nameMsg = ''
      this.nameFlag = false
      this.updateRoleButtonFlag = true
    },
    getRoleMenuIds(){
      this.$axios({
        method: "POST",
        url: "/helios/meeting/menu/get_role_menus",
        data: {id: this.role.id}
      }).then(res=>{
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.roleMenuIds = data
      })
    },
    getRolePermissionIds(){
      this.$axios({
        method: "POST",
        url: "/helios/meeting/permission/get_role_permissions",
        data: {id: this.role.id}
      }).then(res=>{
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.rolePermissionIds = data
      })
    },
    validFlag(){
      this.updateRoleButtonFlag = !(this.nameFlag)
    },
    validName(){
      this.role.name = this.role.name.replace(/\s+/g,"")
      if (this.role.name === ''){
        this.nameMsg = '角色名称不能为空'
        this.nameFlag = false
      }
      else {
        this.nameMsg = ''
        this.nameFlag = true
      }
      this.validFlag()
    },
    validRemark(){
      this.role.remark = this.role.remark.replace(/\s+/g,"")
    },
    getMenuList(){
      this.$axios({
        url: "/helios/meeting/menu/get_all_menu",
        method :"GET"
      }).then(res=>{
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.menuList = data
      })
    },
    getPermissionList(){
      this.$axios({
        url: "/helios/meeting/permission/get_all_permission",
        method :"GET"
      }).then(res=>{
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.permissionList = data
      })
    },
    updateRole(){
      this.role.menuList = this.$refs.menuPermissionTree.getCheckedKeys()
      this.role.permissionList = []
      let permissions = this.$refs.functionPermissionTree.getCheckedKeys()
      for (let permission of permissions) {
        if (permission != null){
          this.role.permissionList.push(permission)
        }
      }
      this.$axios({
        method: "POST",
        url: "/helios/meeting/role/update_role",
        data: this.role
      }).then(res=>{
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.closeUpdateRole()
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.$parent.searchRole()
      })
    },
  },
}
</script>

<style src="../../assets/css/update_role_model.css" scoped/>

