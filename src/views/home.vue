<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="home-title">
          <img src="../assets/img/logo.png" class="logo"/>
        </div>
        <div class="home-border">
          <div class="user-dropdown">
            <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              欢迎 , {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">个人信息</el-dropdown-item>
                <el-dropdown-item command="b">修改密码</el-dropdown-item>
                <el-dropdown-item command="c">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div style="position: absolute;z-index: 2;">
          <updatePersonalInfoModel ref="updatePersonalInfoModel"
                                        v-show="isUpdatePersonalInfoModelShow"
                                        v-on:closeUpdatePersonalInfoModel="closeUpdatePersonalInfoModel"
                                        v-on:reflush="getUserInfo"/>
        </div>
        <div style="position: absolute;z-index: 2;">
          <updatePasswordModel ref="updatePasswordModel"
                                   v-show="isUpdatePasswordModelShow"
                                   v-on:closeUpdatePasswordModel="closeUpdatePasswordModel"/>
        </div>
      </el-header>
      <el-container>
        <el-aside class="menu">
          <navbar />
        </el-aside>
        <el-main>
          <mainContent />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navbar from "../components/navbar";
import mainContent from "../components/main_content";
import updatePersonalInfoModel from "../components/model/update_personal_info_model"
import updatePasswordModel from  "../components/model/update_password_model"

export default {
  data(){
    return{
      isUpdatePersonalInfoModelShow: false,
      isUpdatePasswordModelShow: false,
      user: {
        name:''
      },
    }
  },
  methods:{
    handleCommand(command){
      if(command === 'a'){
        this.openUpdatePersonalInfoModel()
      }
      if(command === 'b'){
        this.openUpdatePasswordModel()
      }
      if(command === 'c'){
        this.$axios({
          method : "Get",
          url: "/helios/meeting/user/logout",
        }).then(res=>{
          const data = res.data
          if (data.code !== 200){
            this.$throw(new Error(data.msg))
            return
          }
          localStorage.removeItem("userInfo")
          this.$router.push('login')
        })
      }
    },
    openUpdatePersonalInfoModel(){
      this.getUserInfo()
      this.$refs.updatePersonalInfoModel.user.name = this.user.name
      this.$refs.updatePersonalInfoModel.user.mobile = this.user.mobile
      this.$refs.updatePersonalInfoModel.user.workNumber = this.user.workNumber
      this.isUpdatePersonalInfoModelShow = true
    },
    closeUpdatePersonalInfoModel(){
      this.isUpdatePersonalInfoModelShow = false
    },
    openUpdatePasswordModel(){
      this.isUpdatePasswordModelShow = true
    },
    closeUpdatePasswordModel(){
      this.isUpdatePasswordModelShow = false
    },
    getUserInfo(){
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo == null){
        throw new Error("用户未登录!")
      }
      this.user =  userInfo
    },
  },
  mounted(){
    this.getUserInfo()
  },
  components:{
    navbar,
    mainContent,
    updatePersonalInfoModel,
    updatePasswordModel,
  }
}
</script>

<style src="../assets/css/home.css" scoped/>

