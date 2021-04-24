<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按姓名搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.email" placeholder="按邮箱搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.mobile" placeholder="按手机号搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="searchButton">搜索</el-button>
        </div>
        <div class="search-button">
          <el-button type="success" icon="el-icon-plus" @click="openAddUser">新增</el-button>
        </div>
      </div>
    </div>
    <div class="table-menu">
      <div class="table">
        <el-table
            v-loading="loading"
            :data="userData"
            border
            style="width: 100%">
          <el-table-column
              prop="id"
              label="ID"
              align="center">
          </el-table-column>
          <el-table-column
              prop="username"
              label="用户名"
              align="center">
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名"
              align="center">
          </el-table-column>
          <el-table-column
              prop="email"
              label="邮箱"
              align="center">
          </el-table-column>
          <el-table-column
              prop="mobile"
              label="手机号"
              align="center">
          </el-table-column>
          <el-table-column
              label="状态"
              align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 1">
                <el-tag type="success">正常</el-tag>
              </div>
              <div v-else-if="scope.row.status === 0">
                <el-tag type="danger">禁用</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <div class="link-layout">
                <el-link type="primary" @click="updateUser(scope.row)">修改信息</el-link>
                <el-link type="primary" @click="clickResetPassword(scope.row.id)">重置密码</el-link>
                <el-link type="primary" @click="clickDeleteUser(scope.row.id)">删除</el-link>
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
          @current-change="currentPageButton">
      </el-pagination>
    </div>
    <div style="position: absolute;z-index: 2;">
      <userManagerModel ref="userManagerModel" v-show="isUserManagerModelShow" v-on:closeme="closeUserManagerModel"/>
    </div>
    <div style="position: absolute;z-index: 2;">
      <addUserModel v-show="isAddUserModelShow" v-on:closeAddUser="closeAddUserModel"/>
    </div>
  </div>
</template>

<script>
import userManagerModel from "@/components/model/user_manager_model";
import addUserModel from "@/components/model/add_user";

export default {
name: "user_manager",
  data(){
    return{
      userData: [
        {
          id: 1,
          username: 'aaaaaaaaaa11',
          name: '傻逼傻逼',
          email: '111111111111@qq.com',
          mobile: '11111111111',
          workNumber: '123456',
          status: 1,
        },
        {
          id: 1,
          username: 'aaaaaaaaaa11',
          name: '郑云鹤傻逼',
          email: '111111111111@qq.com',
          mobile: '11111111111',
          workNumber: '123456',
          status: 0,
        },
        {
          id: 1,
          username: 'aaaaaaaaaa11',
          name: '傻逼傻逼',
          email: '111111111111@qq.com',
          mobile: '11111111111',
          workNumber: '123456',
          status: 3,
        }],
      currentPage: 1,
      pageSize: 9,
      pageCount: 7,
      total: 0,
      isUserManagerModelShow: false,
      isAddUserModelShow: false,
      user: {},
      searchParams: {
        name: '',
        email: '',
        mobile: '',
      },
      lastSearchParams: {},
      userRoleList: [],
      loading: true,
    }
  },
  methods:{
    closeUserManagerModel() {
      this.isUserManagerModelShow = false
    },
    updateUser(user){
      this.$refs.userManagerModel.user = {...user}
      this.$refs.userManagerModel.user.status = this.$refs.userManagerModel.user.status + ""
      this.$refs.userManagerModel.getUserRoleIds()
      this.$refs.userManagerModel.getUserDepartmentId()
      this.isUserManagerModelShow = true
    },
    closeAddUserModel(){
      this.isAddUserModelShow = false
    },
    openAddUser(){
      this.isAddUserModelShow = true
    },
    checkInput(){
      this.searchParams.name = this.searchParams.name.replace(/\s+/g,"")
      this.searchParams.mobile = this.searchParams.mobile.replace(/\s+/g,"")
      this.searchParams.email = this.searchParams.email.replace(/\s+/g,"")
    },
    searchButton(){
      this.loading = true
      let s = {}
      if(this.searchParams.name !== ''){
        s.name = this.searchParams.name
      }
      if(this.searchParams.email !== ''){
        s.email = this.searchParams.email
      }
      if(this.searchParams.mobile !== ''){
        s.mobile = this.searchParams.mobile
      }
      let p = {
        ...s,
        pageSize: this.pageSize,
        pageNumber: 1,
      }
      this.$axios({
        method : "POST",
        url: "/helios/meeting/user/query_userInfo",
        data : p
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.userData = data.userList
        this.total = data.total
        this.currentPage = p.pageNumber
        this.lastSearchParams = s
      })
    },
    currentPageButton(page){
      this.loading = true
      this.currentPage = page
      let p = {
        ...this.lastSearchParams,
        pageSize: this.pageSize,
        pageNumber: this.currentPage,
      }
      this.$axios({
        method : "POST",
        url: "/helios/meeting/user/query_userInfo",
        data : p
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.userData = data.userList
        this.total = data.total
      })
    },
    clickDeleteUser(id){
      this.$confirm('确定删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser(id)
      })
    },
    deleteUser(id){
      this.$axios({
        method:"POST",
        url: "/helios/meeting/user/delete_user",//todo
        data: {id:id}
      }).then(res=>{
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.currentPageButton()
      })
    },
    clickResetPassword(id){
      this.$confirm('确定重置该用户密码吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.resetPassword(id)
      })
    },
    resetPassword(id){
      this.$axios({
        method:"POST",
        url: "/helios/meeting/user/reset_password",//todo
        data: {id:id}
      }).then(res=>{
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.$message({
          message: '重置成功',
          type: 'success'
        });
      })
    },
  },
  components: {
    userManagerModel,
    addUserModel,
  },
  mounted(){
    this.currentPageButton()
  },
}
</script>

<style src="../assets/css/user_manager.css" scoped />

