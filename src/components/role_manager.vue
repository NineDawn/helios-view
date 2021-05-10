<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按角色名称搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="searchRole">搜索</el-button>
        </div>
        <div class="search-button">
          <el-button type="success" icon="el-icon-plus" @click="openAddRole">新增</el-button>
        </div>
      </div>
    </div>
    <div class="table-menu">
      <div class="table">
        <el-table
            v-loading="loading"
            :data="showList"
            border
            style="width: 100%">
          <el-table-column
              prop="id"
              label="ID"
              align="center">
          </el-table-column>
          <el-table-column
              prop="name"
              label="角色名称"
              align="center">
          </el-table-column>
          <el-table-column
              prop="remark"
              label="备注"
              align="center">
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <div class="link-layout">
                <el-link type="primary" @click="openUpdateRole(scope.row)">修改</el-link>
                <el-link type="primary" @click="clickDeleteRole(scope.row.id)">删除</el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="block">
      <el-pagination
          :page-size="pageSize"
          :pager-count="pageCount"
          layout="prev, pager, next"
          :total="total"
          :current-page="currentPage"
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <div style="position: absolute;z-index: 2;">
      <addRoleModel v-show="isAddRoleModelShow" v-on:closeAddRole="closeAddRoleModel"/>
    </div>
    <div style="position: absolute;z-index: 2;">
      <updateRoleModel ref="updateRoleModel" v-show="isUpdateRoleModelShow"
                             v-on:closeUpdateRole="closeUpdateRoleModel"/>
    </div>
  </div>
</template>

<script>
import addRoleModel from "./model/add_role_model";
import updateRoleModel from "./model/update_role_model";

export default {
name: "role_manager",
  data(){
    return{
      searchParams: {
        name: '',
      },
      currentPage: 1,
      pageSize: 11,
      pageCount: 7,
      total: 0,
      showList: [],
      roleList:[],
      isAddRoleModelShow: false,
      isUpdateRoleModelShow: false,
      loading:true,
    }
  },
  methods:{
    closeAddRoleModel(){
      this.isAddRoleModelShow = false
    },
    openAddRole(){
      this.isAddRoleModelShow = true
    },
    closeUpdateRoleModel(){
      this.isUpdateRoleModelShow = false
    },
    openUpdateRole(role){
      this.$refs.updateRoleModel.role = {...role}
      this.$refs.updateRoleModel.getRoleMenuIds()
      this.$refs.updateRoleModel.getRolePermissionIds()
      this.isUpdateRoleModelShow = true
    },
    checkInput(){
      this.searchParams.name = this.searchParams.name.replace(/\s+/g,"")
    },
    handleCurrentChange(page){
      this.currentPage = page
      let start = (this.currentPage - 1) * 11
      let end = this.currentPage * 11
      this.showList = this.roleList.slice(start, end)
    },
    searchRole(){
      this.loading = true
      this.$axios({
        method: "POST",
        url: "/helios/meeting/role/query_role",
        data: this.searchParams
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.roleList = data
        this.total = this.roleList.length
        this.handleCurrentChange(1)
      })
    },
    clickDeleteRole(id){
      this.$confirm('确定删除该角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRole(id)
      })
    },
    deleteRole(id){
      this.$axios({
        method:"POST",
        url: "/helios/meeting/role/delete_role",
        data: {id:id}
      }).then(res=>{
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.searchRole()
      })
    },
  },
  mounted(){
    this.searchRole()
  },
  components: {
    addRoleModel,
    updateRoleModel,
  },
}
</script>

<style src="../assets/css/role_manager.css" scoped/>

