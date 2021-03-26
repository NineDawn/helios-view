<template>
  <div class="register">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="用户名登录" style="height: 220px">
        <div class="login-input-top">
          <el-input v-model="loginAccount.username" placeholder="请输入用户名" style="width: 260px"
                    @input="vaildLoginUsername"></el-input>
        </div>
        <div class="login-input-next">
          <el-input v-model="loginAccount.password" placeholder="请输入密码" style="width: 260px"
                    @input="validLoginPassword"></el-input>
        </div>
        <div class="login-button">
          <el-button round style="width: 85px" type="primary" @click="showme">注册</el-button>
          <el-button round style="width: 85px" type="primary">登录</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="邮箱登录" style="height: 220px">
        <div class="login-input-top">
          <el-input v-model="loginAccount.email" placeholder="请输入邮箱" style="width: 260px"
                    @input="vaildLoginEmail"></el-input>
        </div>
        <div class="login-input-next-button">
          <el-input v-model="loginAccount.captcha" placeholder="请输入验证码" style="width: 150px"
                    @input="vaildLoginCaptcha"></el-input>
          <button type="button" class="login-captcha-button-on" id="btnEmailCaptcha" @click="getEmailCaptcha"
                  :disabled="captchaButtonFlag">获取验证码
          </button>
        </div>
        <div class="login-button">
          <el-button round style="width: 85px" type="primary" @click="showme">注册</el-button>
          <el-button round style="width: 85px" type="primary">登录</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div style="position: absolute;z-index: 2;"> <!-- 这里z-index:2是为了解决 标签页被定位后 产生的覆盖问题-->
      <register_model ref="registerModel" v-show="showRegisterModel" v-on:closeme="closeme"/>
    </div>
  </div>
</template>

<script>

import register_model from "@/components/register_components/register_model";

var idx = 60;
var timer;

export default {
  data() {
    return {
      loginAccount: {
        username: '',
        email: '',
        password: '',
        captcha: ''
      },
      activeName: '0',
      showRegisterModel: false,
      captchaButtonFlag: false,
      loginUsernameFlag: false,
      loginPasswordFlag: false,
      loginEmailFlag: false,
      loginCaptchaFlag: false,
    }
  },
  components: {
    register_model
  },
  methods: {
    showme() {
      this.$refs.registerModel.getCaptcha()
      this.showRegisterModel = true
    },
    closeme() {
      this.showRegisterModel = false
    },
    handleClick(tab) {
      if (tab.index == 0) {
        this.loginAccount.email = '';
        this.loginAccount.captcha = '';
        this.loginEmailFlag = false;
        this.loginCaptchaFlag = false;
      } else if (tab.index == 1) {
        this.loginAccount.username = '';
        this.loginAccount.password = '';
        this.loginUsernameFlag = false;
        this.loginPasswordFlag = false;
      }
    },
    captchaTimer() {
      if (idx > 1) {
        idx--;
        document.getElementById("btnEmailCaptcha").innerText = idx + "秒";
      } else {
        this.closeTimer();
      }
    },
    getEmailCaptcha() {
      this.$axios({
        method: "post",
        url: "/helios/meeting/user/get_email_login_captcha",
        data: {
          email: this.loginAccount.email
        }
      }).then(res => {
        const data = res.data
        if (data.code !== 200) {
          throw new Error(data.msg)
        }
        this.captchaButtonFlag = true;
        document.getElementById("btnEmailCaptcha").setAttribute('class', 'login-captcha-button-off');
        this.captchaTimer();
        timer = setInterval(this.captchaTimer, 1000);
      })
    },
    closeTimer() {
      window.clearInterval(timer);
      timer = undefined;
      idx = 60;
      document.getElementById("btnEmailCaptcha").setAttribute('class', 'login-captcha-button-on');
      document.getElementById("btnEmailCaptcha").innerText = "获取验证码";
      this.captchaButtonFlag = false;
    },
    vaildLoginUsername(){
      this.loginAccount.username = this.loginAccount.username.replace(/\s+/g,"")
      if(this.loginAccount.username == ''){
        this.loginUsernameFlag = false
      }
      else {
        this.loginUsernameFlag = true
      }
    },
    usernameLogin(){
      const params = JSON.stringify(this.loginAccount);
      this.$axios({
        method : "POST",
        url: "/helios/meeting/user/username_login",
        data : {
          ...JSON.parse(params)
        }
      }).then(res=>{
          const data = res.data
          if (data.code !== 200){
            throw new Error(data.msg)
          }
          localStorage.setItem("userInfo",JSON.stringify(data.data))
          alert("success")
      })
    }
    validLoginPassword(){
      this.loginAccount.password = this.loginAccount.password.replace(/\s+/g,"")
      if(this.loginAccount.password == ''){
        this.loginPasswordFlag = false
      }
      else {
        this.loginPasswordFlag = true
      }
    },
    vaildLoginEmail(){
      this.loginAccount.email = this.loginAccount.email.replace(/\s+/g,"")
      if(this.loginAccount.email == ''){
        this.loginEmailFlag = false
      }
      else {
        this.loginEmailFlag = true
      }
    },
    vaildLoginCaptcha(){
      this.loginAccount.captcha = this.loginAccount.captcha.replace(/\s+/g,"")
      if(this.loginAccount.captcha == ''){
        this.loginCaptchaFlag = false
      }
      else {
        this.loginCaptchaFlag = true
      }
    },
  }
}

</script>

<style src="../assets/css/register.css"/>
