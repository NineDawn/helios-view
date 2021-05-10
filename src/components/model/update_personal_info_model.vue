<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="updatePersonalInfo-input-first">
        <div class="updatePersonalInfo-input-name">用户名:</div>
        <div>
          <el-input v-model="user.username" placeholder="请输入用户名"
                    style="width: 260px" @input="validUsername"></el-input>
        </div>
      </div>
      <div class="updatePersonalInfo-msg">{{usernameMsg}}</div>
      <div class="updatePersonalInfo-input">
        <div class="updatePersonalInfo-input-name">姓名:</div>
        <div>
          <el-input v-model="user.name" placeholder="请输入姓名"
                    style="width: 260px" @input="validName"></el-input>
        </div>
      </div>
      <div class="updatePersonalInfo-msg">{{nameMsg}}</div>
      <div class="updatePersonalInfo-input">
        <div class="updatePersonalInfo-input-name">邮箱:</div>
        <div>
          <el-input v-model="user.email" placeholder="请输入邮箱"
                    style="width: 260px" @input="validEmail"></el-input>
        </div>
      </div>
      <div class="updatePersonalInfo-msg">{{emailMsg}}</div>
      <div class="updatePersonalInfo-input">
        <div class="updatePersonalInfo-input-name">手机号:</div>
        <div>
          <el-input v-model="user.mobile" placeholder="请输入手机号"
                    style="width: 260px" @input="validMobile"></el-input>
        </div>
      </div>
      <div class="updatePersonalInfo-msg">{{mobileMsg}}</div>
      <div class="updatePersonalInfo-input">
        <div class="updatePersonalInfo-input-name">工号:</div>
        <div>
          <el-input v-model="user.workNumber" placeholder="请输入工号"
                    style="width: 260px" @input="validWorkNumber"></el-input>
        </div>
      </div>
      <div class="updatePersonalInfo-msg">{{workNumberMsg}}</div>
      <div class="updatePersonalInfo-button">
        <div class="updatePersonalInfo-button-left">
          <el-button type="primary" @click="closeUpdatePersonalInfoSelf">关闭</el-button>
        </div>
        <div class="updatePersonalInfo-button-right">
          <el-button type="success" @click="updatePersonalInfo" :disabled="updatePersonalInfoButtonFlag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isEmail, isMobile, isUsername, isWorkNumber} from "@/common/util/validate";

export default {
name: "update_personal_info_model",
  data(){
    return{
      user: {
        id: null,
        username: '',
        name: '',
        email: '',
        mobile: '',
        workNumber: '',
      },
      usernameMsg: '',
      usernameFlag: true,
      nameMsg: '',
      nameFlag: true,
      emailMsg: '',
      emailFlag: true,
      mobileMsg: '',
      mobileFlag: true,
      workNumberMsg: '',
      workNumberFlag: true,
      updatePersonalInfoButtonFlag: false,
    }
  },
  methods:{
    validFlag(){
      this.updatePersonalInfoButtonFlag = !(this.usernameFlag && this.nameFlag
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
      this.user.id = null
      this.user.username = ''
      this.user.name = ''
      this.user.email = ''
      this.user.mobile = ''
      this.user.workNumber = ''
      this.usernameMsg = ''
      this.usernameFlag = true
      this.nameMsg = ''
      this.nameFlag = true
      this.emailMsg = ''
      this.emailFlag = true
      this.mobileMsg = ''
      this.mobileFlag = true
      this.workNumberMsg = ''
      this.workNumberFlag = true
      this.updatePersonalInfoButtonFlag = false
    },
    closeUpdatePersonalInfoSelf(){
      this.$emit("closeUpdatePersonalInfoModel")
      this.clearData()
    },
    updatePersonalInfo(){
      this.$axios({
        method : "POST",
        url: "/helios/meeting/user/update_user_info", //todo
        data : {...this.user}
      }).then(res=>{
        const data = res.data
        if (data.code !== 200){
          throw new Error(data.msg)
        }
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        localStorage.removeItem("userInfo")
        localStorage.setItem("userInfo",JSON.stringify(data.data))
        this.$parent.getUserInfo()
        this.closeUpdatePersonalInfoSelf()
      })
    },
  },
}
</script>

<style src="../../assets/css/update_personal_info_model.css" scoped/>
