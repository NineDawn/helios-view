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
<!--        <p class="register-name">{{'用户名:'}}</p>
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
        <p class="register-msg">{{captchaMsg}}</p>-->
        <div class="register-register-button">
          <el-button type="primary" round style="width: 135px" @click="showme">注册</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <register_model v-show="showRegisterModel" v-on:closeme="closeme"/>
  </div>
</template>

<script>

import register_model from "@/components/register_components/register_model";

export default {
  data() {
    return {
      loginAccount: {
        username: '',
        email: '',
        password: '',
        captcha: ''
      },
      input: '',
      activeName: '0',
      showRegisterModel: false,
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
        /*this.registerAccount.username = '';
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
        this.captchaFlag = false;*/
        this.inout = '';
      }else if (tab.index == 1){
        this.input = '';
      }
    },

  }
}

</script>

<style src="../assets/css/register.css"/>
