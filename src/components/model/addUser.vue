<template>
  <div class="modal-backdrop-addUser">
    <div class="modal">
      <div class="addUser-input-first">
        <div class="addUser-input-name">用户名:</div>
        <div>
          <el-input v-model="user.username" placeholder="请输入用户名"
                    style="width: 260px" @input="validUsername"></el-input>
        </div>
      </div>
      <div class="addUser-msg">{{usernameMsg}}</div>
      <div class="addUser-input">
        <div class="addUser-input-name">姓名:</div>
        <div>
          <el-input v-model="user.name" placeholder="请输入姓名"
                    style="width: 260px" @input="validName"></el-input>
        </div>
      </div>
      <div class="addUser-msg">{{nameMsg}}</div>
      <div class="addUser-input">
        <div class="addUser-input-name">邮箱:</div>
        <div>
          <el-input v-model="user.email" placeholder="请输入邮箱"
                    style="width: 260px" @input="validEmail"></el-input>
        </div>
      </div>
      <div class="addUser-msg">{{emailMsg}}</div>
      <div class="addUser-input">
        <div class="addUser-input-name">手机号:</div>
        <div>
          <el-input v-model="user.mobile" placeholder="请输入手机号"
                    style="width: 260px" @input="validMobile"></el-input>
        </div>
      </div>
      <div class="addUser-msg">{{mobileMsg}}</div>
      <div class="addUser-input">
        <div class="addUser-input-name">工号:</div>
        <div>
          <el-input v-model="user.workNumber" placeholder="请输入工号"
                    style="width: 260px" @input="validWorkNumber"></el-input>
        </div>
      </div>
      <div class="addUser-msg">{{workNumberMsg}}</div>
      <div class="addUser-button">
        <div class="addUser-button-left">
          <el-button type="primary" @click="closeAddUser">关闭</el-button>
        </div>
        <div class="addUser-button-right">
          <el-button type="success" @click="addUser" :disabled="addUserButtonFlag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isEmail, isMobile, isUsername, isWorkNumber} from "@/common/util/validate";

export default {
name: "addUser",
  data(){
    return{
      user: {
        username: '',
        name: '',
        email: '',
        mobile: '',
        workNumber: '',
      },
      usernameMsg: '',
      usernameFlag: false,
      nameMsg: '',
      nameFlag: false,
      emailMsg: '',
      emailFlag: false,
      mobileMsg: '',
      mobileFlag: false,
      workNumberMsg: '',
      workNumberFlag: false,
      addUserButtonFlag: true,
    }
  },
  methods:{
    closeAddUser(){
      this.$emit("closeAddUser")
      this.clearData()
    },
    validFlag(){
      this.addUserButtonFlag = !(this.usernameFlag && this.nameFlag
          && this.emailFlag && this.mobileFlag && this.workNumberFlag)
    },
    validUsername(){
      if (!isUsername(this.user.username)){
        this.usernameMsg = '用户名长度4-12位，英文开头可包含数字英文下划线'
        this.usernameFlag = false
      }
      else {
        this.usernameMsg = ''
        this.usernameFlag = true
      }
      this.validFlag()
    },
    validName(){
      this.user.name = this.user.name.replace(/\s+/g,"")
      if (this.user.name == ''){
        this.nameMsg = '姓名不能为空'
        this.nameFlag = false
      }
      else {
        this.nameMsg = ''
        this.nameFlag = true
      }
      this.validFlag()
    },
    validEmail(){
      if (!isEmail(this.user.email)){
        this.emailMsg = '邮箱格式不正确'
        this.emailFlag = false
      }
      else {
        this.emailMsg = ''
        this.emailFlag = true
      }
      this.validFlag()
    },
    validMobile(){
      if (!isMobile(this.user.mobile)){
        this.mobileMsg = '手机号格式不正确'
        this.mobileFlag = false
      }
      else {
        this.mobileMsg = ''
        this.mobileFlag = true
      }
      this.validFlag()
    },
    validWorkNumber(){
      if (!isWorkNumber(this.user.workNumber)){
        this.workNumberMsg = '工号格式不正确'
        this.workNumberFlag = false
      }
      else {
        this.workNumberMsg = ''
        this.workNumberFlag = true
      }
      this.validFlag()
    },
    clearData(){
      this.user.username = ''
      this.user.name = ''
      this.user.email = ''
      this.user.mobile = ''
      this.user.workNumber = ''
      this.usernameMsg = ''
      this.usernameFlag = false
      this.nameMsg = ''
      this.nameFlag = false
      this.emailMsg = ''
      this.emailFlag = false
      this.mobileMsg = ''
      this.mobileFlag = false
      this.workNumberMsg = ''
      this.workNumberFlag = false
      this.addUserButtonFlag = true
    },
    addUser(){
      this.$axios({
        method: "POST",
        url: "/helios/meeting/user/add_user",
        data: this.user
      }).then(res=>{
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.closeAddUser()
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.$parent.currentPageButton(this.$parent.currentPage)
      })
    }
  }
}
</script>

<style src="../../assets/css/addUser.css" scoped />

