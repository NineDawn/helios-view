<template>
  <div class="register">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录" style="height: 215px">
        <div class="register-login-top">
          <el-input v-model="input" placeholder="请输入用户名" style="width: 260px"></el-input>
        </div>
        <div class="register-input-next">
          <el-input v-model="input" placeholder="请输入密码" style="width: 260px"></el-input>
        </div>
        <div class="register-login-button">
          <el-button type="primary" round style="width: 135px">登录</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="注册" style="height: 250px" class="el-tabs-content-register">
        <div class="register-input-top">
          <el-input v-model="account.username" placeholder="请输入用户名" style="width: 260px"></el-input>
        </div>
        <div class="register-input-next">
          <el-input v-model="account.password" placeholder="请输入密码" style="width: 260px"></el-input>
        </div>
        <div class="register-input-next">
          <el-input v-model="repassword" placeholder="请重复密码" style="width: 260px"></el-input>
        </div>
        <div class="register-input-next">
          <el-input v-model="account.name" placeholder="请输入姓名" style="width: 260px"></el-input>
        </div>
        <div class="register-input-next">
          <el-input v-model="account.email" placeholder="请输入电子邮箱" style="width: 260px"></el-input>
        </div>
        <div class="register-input-next">
          <el-input v-model="account.mobile" placeholder="请输入手机号" style="width: 260px"></el-input>
        </div>
        <div class="register-input-next">
          <el-input v-model="account.workNumber" placeholder="请输入工号" style="width: 260px"></el-input>
        </div>
        <div class="register-input-next">
          <el-input v-model="account.captcha" placeholder="请输入验证码" style="width: 260px"></el-input>
        </div>
        <div class="register-register-button">
          <el-button type="primary" round style="width: 135px">注册</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        name: '',
        workNumber: '',
        captcha: ''
      },
      input: '',
      repassword: '',
      activeName: '0'
    }
  },
  methods:{
    handleClick(tab){
      if (tab.index == 0){
        this.account.username = '';
        this.account.password = '';
        this.repassword = '';
        this.account.name = '';
        this.account.email = '';
        this.account.mobile = '';
        this.account.workNumber = '';
        this.account.captcha = '';
      }else if (tab.index == 1){
        this.input = '';
      }
    }
  }
}

</script>

<style src="../assets/css/register.css"/>
