<template>
  <div class="register">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录" style="height: 225px">
        <div class="login-input-top">
          <el-input v-model="input" placeholder="请输入用户名" style="width: 260px"></el-input>
        </div>
        <div class="login-input-next">
          <el-input v-model="input" placeholder="请输入密码" style="width: 260px"></el-input>
        </div>
        <div class="register-login-button">
          <el-button type="primary" round style="width: 135px">登录</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="注册" style="height: 260px" class="el-tabs-content-register">
        <p class="register-name">{{'用户名:'}}</p>
        <div class="register-input-next">
          <el-input v-model="registerAccount.username" placeholder="请输入用户名" style="width: 260px" clearable @input="validRegisterUsername"></el-input>
        </div>
        <p class="register-msg">{{registerUsernameMsg}}</p>
        <p class="register-name">{{'密码:'}}</p>
        <div class="register-input-next">
          <el-input v-model="registerAccount.password" placeholder="请输入密码" style="width: 260px" clearable @input="validRegisterPassword"></el-input>
        </div>
        <p class="register-msg">{{registerPasswordMsg}}</p>
        <p class="register-name">{{'重复密码:'}}</p>
        <div class="register-input-next">
          <el-input v-model="repassword" placeholder="请重复密码" style="width: 260px" clearable @input="validRepassword"></el-input>
        </div>
        <p class="register-msg">{{repasswordMsg}}</p>
        <p class="register-name">{{'姓名:'}}</p>
        <div class="register-input-next">
          <el-input v-model="registerAccount.name" placeholder="请输入姓名" style="width: 260px" clearable @input="validName"></el-input>
        </div>
        <p class="register-msg">{{nameMsg}}</p>
        <p class="register-name">{{'邮箱:'}}</p>
        <div class="register-input-next">
          <el-input v-model="registerAccount.email" placeholder="请输入电子邮箱" style="width: 260px" clearable @input="validEmail"></el-input>
        </div>
        <p class="register-msg">{{emailMsg}}</p>
        <p class="register-name">{{'手机号:'}}</p>
        <div class="register-input-next">
          <el-input v-model="registerAccount.mobile" placeholder="请输入手机号" style="width: 260px"></el-input>
        </div>
        <p class="register-msg">{{mobileMsg}}</p>
        <p class="register-name">{{'工号:'}}</p>
        <div class="register-input-next">
          <el-input v-model="registerAccount.workNumber" placeholder="请输入工号" style="width: 260px"></el-input>
        </div>
        <p class="register-msg">{{workNumberMsg}}</p>
        <p class="register-name">{{'验证码:'}}</p>
        <div class="register-input-next">
          <el-input v-model="registerAccount.captcha" placeholder="请输入验证码" style="width: 260px"></el-input>
        </div>
        <p class="register-msg">{{captchaMsg}}</p>
        <div class="register-register-button">
          <el-button type="primary" round style="width: 135px" @click="showme">注册</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <register_model v-show="showRegisterModel" v-on:closeme="closeme"/>
  </div>
</template>

<script>
import {isEmail, isMobile, isPassword, isUsername, isWorkNumber} from "@/common/util/validate";
import register_model from "@/components/register_components/register_model";

export default {
  data() {
    return {
      registerAccount: {
        username: '',
        password: '',
        name: '',
        email: '',
        mobile: '',
        workNumber: '',
        captcha: '',
        captchaId: ''
      },
      loginAccount: {
        username: '',
        email: '',
        password: '',
        captcha: ''
      },
      input: '',
      repassword: '',
      activeName: '0',
      registerUsernameMsg: '',
      registerPasswordMsg: '',
      repasswordMsg: '',
      nameMsg: '',
      emailMsg: '',
      mobileMsg:'',
      workNumberMsg: '',
      captchaMsg: '',
      registerUsernameFlag: false,
      registerPasswordFlag: false,
      repasswordFlag: false,
      nameFlag: false,
      emailFlag: false,
      mobileFlag: false,
      workNumberFlag: false,
      captchaFlag: false,
      showRegisterModel: false,
      captchaId: ''
    }
  },
  components: {
    register_model
  },
  methods:{
    showme(){
      this.showRegisterModel = true
    },
    closeme(){
      this.showRegisterModel = false
    },
    handleClick(tab){
      if (tab.index == 0){
        this.registerAccount.username = '';
        this.registerAccount.password = '';
        this.repassword = '';
        this.registerAccount.name = '';
        this.registerAccount.email = '';
        this.registerAccount.mobile = '';
        this.registerAccount.workNumber = '';
        this.registerAccount.captcha = '';
        this.registerUsernameMsg = '';
        this.registerPasswordMsg = '';
        this.repasswordMsg = '';
        this.nameMsg = '';
        this.emailMsg = '';
        this.mobileMsg ='';
        this.workNumberMsg = '';
        this.captchaMsg = '';
        this.registerUsernameFlag = false;
        this.registerPasswordFlag = false;
        this.repasswordFlag = false;
        this.nameFlag = false;
        this.emailFlag = false;
        this.mobileFlag = false;
        this.workNumberFlag = false;
        this.captchaFlag = false;
      }else if (tab.index == 1){
        this.input = '';
      }
    },
    validRegisterUsername(){
      if (!isUsername(this.registerAccount.username)){
        this.registerUsernameMsg = '用户名长度4-12位，英文开头可包含数字英文下划线'
        this.registerUsernameFlag = false
      }
      else {
        this.registerUsernameMsg = ''
        this.registerUsernameFlag = true
      }
    },
    validRegisterPassword(){
      if (!isPassword(this.registerAccount.password)){
        this.registerPasswordMsg = '密码长度6-16位，可包含数字英文特殊字符'
        this.registerPasswordFlag = false
      }
      else {
        this.registerPasswordMsg = ''
        this.registerPasswordFlag = true
      }
    },
    validRepassword(){
      if (this.repassword !== this.registerAccount.password){
        this.repasswordMsg = '两次密码不一致'
        this.repasswordFlag = false
      }
      else {
        this.repasswordMsg = ''
        this.repasswordFlag = true
      }
    },
    validName(){
      if (this.registerAccount.name == ''){
        this.nameMsg = '姓名不能为空'
        this.nameFlag = false
      }
      else {
        this.nameMsg = ''
        this.nameFlag = true
      }
    },
    validEmail(){
      if (!isEmail(this.registerAccount.email)){
        this.emailMsg = '邮箱格式不正确'
        this.emailFlag = false
      }
      else {
        this.emailMsg = ''
        this.emailFlag = true
      }
    },
    validMobile(){
      if (!isMobile(this.registerAccount.mobile)){
        this.mobileMsg = '手机号格式不正确'
        this.mobileFlag = false
      }
      else {
        this.mobileMsg = ''
        this.mobileFlag = true
      }
    },
    validWorkNumber(){
      if (!isWorkNumber(this.registerAccount.workNumber)){
        this.workNumberMsg = '工号格式不正确，'
        this.workNumberFlag = false
      }
      else {
        this.workNumberMsg = ''
        this.workNumberFlag = true
      }
    },
  }
}

</script>

<style src="../assets/css/register.css"/>
