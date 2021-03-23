<template>
  <div class="register">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="登录" style="height: 225px">
        <div class="login-input-top">
          <el-input v-model="input" placeholder="请输入用户名" style="width: 260px"></el-input>
        </div>
        <div class="login-input-next">
          <el-input v-model="input" placeholder="请输入密码" style="width: 260px"></el-input>
        </div>
        <div class="register-login-button">
          <el-button round style="width: 135px" type="primary">登录</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="注册" style="height: 260px">
        <div class="register-register-button">
          <el-button round style="width: 135px" type="primary" @click="showme">注册</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div style="position: absolute;z-index: 2;"> <!-- 这里z-index:2是为了解决 标签页被定位后 产生的覆盖问题-->
      <register_model v-show="showRegisterModel" v-on:closeme="closeme"/>
    </div>
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
  methods: {
    showme() {
      this.showRegisterModel = true
    },
    closeme() {
      this.showRegisterModel = false
    },
    handleClick(tab) {
      if (tab.index == 0) {
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
      } else if (tab.index == 1) {
        this.input = '';
      }
    },

  }
}

</script>

<style src="../assets/css/register.css"/>
