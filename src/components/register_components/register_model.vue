<template>
  <div class="modal-backdrop" >
    <div class="modal">
      <div class="register-line-first">
        <div class="register-name">{{'用户名:'}}</div>
        <div class="register-right">
          <div class="register-input-next">
            <el-input v-model="registerAccount.username" placeholder="请输入用户名" style="width: 260px" clearable @input="validRegisterUsername"></el-input>
          </div>
          <div class="register-msg">{{registerUsernameMsg}}</div>
        </div>
      </div>
      <div class="register-line">
        <div class="register-name">{{'密码:'}}</div>
        <div class="register-right">
          <div class="register-input-next">
            <el-input v-model="registerAccount.password" placeholder="请输入密码" style="width: 260px" clearable @input="validRegisterPassword"></el-input>
          </div>
          <div class="register-msg">{{registerPasswordMsg}}</div>
        </div>
      </div>
      <div class="register-line">
        <div class="register-name">{{'重复密码:'}}</div>
        <div class="register-right">
          <div class="register-input-next">
            <el-input v-model="repassword" placeholder="请重复密码" style="width: 260px" clearable @input="validRepassword"></el-input>
          </div>
          <div class="register-msg">{{repasswordMsg}}</div>
        </div>
      </div>
      <div class="register-line">
        <div class="register-name">{{'姓名:'}}</div>
        <div class="register-right">
          <div class="register-input-next">
            <el-input v-model="registerAccount.name" placeholder="请输入姓名" style="width: 260px" clearable @input="validName"></el-input>
          </div>
          <div class="register-msg">{{nameMsg}}</div>
        </div>
      </div>
      <div class="register-line">
        <div class="register-name">{{'邮箱:'}}</div>
        <div class="register-right">
          <div class="register-input-next">
            <el-input v-model="registerAccount.email" placeholder="请输入电子邮箱" style="width: 260px" clearable @input="validEmail"></el-input>
          </div>
          <div class="register-msg">{{emailMsg}}</div>
        </div>
      </div>
      <div class="register-line">
        <div class="register-name">{{'手机号:'}}</div>
        <div class="register-right">
          <div class="register-input-next">
            <el-input v-model="registerAccount.mobile" placeholder="请输入手机号" style="width: 260px"></el-input>
          </div>
          <div class="register-msg">{{mobileMsg}}</div>
        </div>
      </div>
      <div class="register-line">
        <div class="register-name">{{'工号:'}}</div>
        <div class="register-right">
          <div class="register-input-next">
            <el-input v-model="registerAccount.workNumber" placeholder="请输入工号" style="width: 260px"></el-input>
          </div>
          <div class="register-msg">{{workNumberMsg}}</div>
        </div>
      </div>
      <div class="register-line">
        <div class="register-name">{{'验证码:'}}</div>
        <div class="register-right">
          <div class="register-input-next">
            <el-input v-model="registerAccount.captcha" placeholder="请输入验证码" style="width: 260px"></el-input>
          </div>
          <div class="register-msg">{{captchaMsg}}</div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-close" @click="closeSelf">关闭</button>
        <button type="button" class="btn-confirm" @click="confirm">确认</button>
      </div>
    </div>

  </div>

</template>

<script>
import {isEmail, isMobile, isPassword, isUsername, isWorkNumber} from "@/common/util/validate";

export default {
name: "register_model",
  props: {

  },
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
      repassword: '',
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
      captchaId: ''
    }
  },
  methods: {
    closeSelf() {
      this.$emit("closeme");
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

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background-color: #fff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x:auto;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  width: 500px;
  height: 700px;
}
.modal-header {
  border-bottom: 1px solid #eee;
  color: #313131;
  justify-content: space-between;
  padding: 15px;
  display: flex;
}
.modal-footer {
  justify-content: center;
  padding: 15px;
  display: flex;
}

.btn-close, .btn-confirm {
  border-radius: 18px;
  margin-left:12px;
  margin-right: 12px;
  width:70px;
  height: 36px;
  border:none;
  cursor: pointer;
}
.btn-close {
  color: #313131;
  background-color:transparent;
}
.btn-confirm {
  color: #fff;
  background-color: #2d8cf0;
}

.register-name{
  width: 70px;
  height: 40px;
  margin-top: 8px;
  text-align: right;
  margin-right: 5px;
}
.register-right{
  margin-left: 5px;
}
.register-line,.register-line-first{
  display: flex;
  justify-content: center;
}
.register-line-first{
  margin-top: 40px;
}
</style>