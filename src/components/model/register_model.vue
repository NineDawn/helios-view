<template>
  <div class="modal-backdrop" >
    <div class="modal">
      <div class="register-title">
        <span class="title-text">注册账号</span>
      </div>
      <div class="register-line-first">
        <div class="register-name">{{'用户名:'}}</div>
        <div class="register-right">
            <el-input v-model="registerAccount.username" placeholder="请输入用户名" style="width: 260px" clearable
                      @input="validRegisterUsername"></el-input>
        </div>
      </div>
      <div class="register-msg">{{registerUsernameMsg}}</div>
      <div class="register-line">
        <div class="register-name">{{'密码:'}}</div>
        <div class="register-right">
            <el-input v-model="registerAccount.password" placeholder="请输入密码" type="password" style="width: 260px" clearable
                      @input="validRegisterPassword"></el-input>
        </div>
      </div>
      <div class="register-msg">{{registerPasswordMsg}}</div>
      <div class="register-line">
        <div class="register-name">{{'重复密码:'}}</div>
        <div class="register-right">
            <el-input v-model="repassword" placeholder="请重复密码" type="password" style="width: 260px" clearable
                      @input="validRepassword"></el-input>
        </div>
      </div>
      <div class="register-msg">{{repasswordMsg}}</div>
      <div class="register-line">
        <div class="register-name">{{'姓名:'}}</div>
        <div class="register-right">
            <el-input v-model="registerAccount.name" placeholder="请输入姓名" style="width: 260px" clearable
                      @input="validName"></el-input>
        </div>
      </div>
      <div class="register-msg">{{nameMsg}}</div>
      <div class="register-line">
        <div class="register-name">{{'邮箱:'}}</div>
        <div class="register-right">
            <el-input v-model="registerAccount.email" placeholder="请输入电子邮箱" style="width: 260px" clearable
                      @input="validRegisterEmail"></el-input>
        </div>
      </div>
      <div class="register-msg">{{registerEmailMsg}}</div>
      <div class="register-line">
        <div class="register-name">{{'手机号:'}}</div>
        <div class="register-right">
            <el-input v-model="registerAccount.mobile" placeholder="请输入手机号" style="width: 260px" clearable
                      @input="validMobile"></el-input>
        </div>
      </div>
      <div class="register-msg">{{mobileMsg}}</div>
      <div class="register-line">
        <div class="register-name">{{'工号:'}}</div>
        <div class="register-right">
            <el-input v-model="registerAccount.workNumber" placeholder="请输入工号" style="width: 260px" clearable
                      @input="validWorkNumber"></el-input>
        </div>
      </div>
      <div class="register-msg">{{workNumberMsg}}</div>
      <div class="register-line">
        <div class="register-name">{{'验证码:'}}</div>
        <div class="register-right">
            <el-input v-model="registerAccount.captchaCode" placeholder="请输入验证码" style="width: 130px"
                      @input="validRegisterCaptcha"></el-input>
        </div>
        <img :src="captchaImg" @click="getCaptcha" alt="" class="captcha-img"/>
      </div>
      <div class="register-msg">{{registerCaptchaMsg}}</div>
      <div class="modal-footer">
        <button type="button" class="btn-close" @click="closeSelf">关闭</button>
        <button type="button" class="btn-confirm" @click="registerGoGoGo" :disabled="registerButtonFlag">确认</button>
      </div>
    </div>

  </div>

</template>

<script>
import {isEmail, isMobile, isPassword, isUsername, isWorkNumber} from "@/common/util/validate";
import {getUUID} from "@/common/util/util"

export default {
name: "register_model",
  data() {
    return {
      registerAccount: {
        username: '',
        password: '',
        name: '',
        email: '',
        mobile: '',
        workNumber: '',
        captchaCode: '',
        captchaUUID: ''
      },
      repassword: '',
      registerUsernameMsg: '',
      registerPasswordMsg: '',
      repasswordMsg: '',
      nameMsg: '',
      registerEmailMsg: '',
      mobileMsg:'',
      workNumberMsg: '',
      registerCaptchaMsg: '',
      registerUsernameFlag: false,
      registerPasswordFlag: false,
      repasswordFlag: false,
      nameFlag: false,
      registerEmailFlag: false,
      mobileFlag: false,
      workNumberFlag: false,
      registerCaptchaFlag: false,
      captchaImg: '',
      registerButtonFlag: true,
    }
  },
  methods: {
    closeSelf() {
      this.$emit("closeme");
      this.registerAccount.username = '';
      this.registerAccount.password = '';
      this.repassword = '';
      this.registerAccount.name = '';
      this.registerAccount.email = '';
      this.registerAccount.mobile = '';
      this.registerAccount.workNumber = '';
      this.registerAccount.captchaCode = '';
      this.registerUsernameMsg = '';
      this.registerPasswordMsg = '';
      this.repasswordMsg = '';
      this.nameMsg = '';
      this.registerEmailMsg = '';
      this.mobileMsg ='';
      this.workNumberMsg = '';
      this.registerCaptchaMsg = '';
      this.registerUsernameFlag = false;
      this.registerPasswordFlag = false;
      this.repasswordFlag = false;
      this.nameFlag = false;
      this.registerEmailFlag = false;
      this.mobileFlag = false;
      this.workNumberFlag = false;
      this.registerCaptchaFlag = false;
      this.registerButtonFlag = true;
    },
    registerGoGoGo(){
      const params = JSON.stringify(this.registerAccount);
      this.$axios({
        method : "POST",
        url: "/helios/meeting/user/register",
        data : {
          ...JSON.parse(params)
        }
      }).then(res=>{
        const data = res.data
        if (data.code !== 200){
          this.getCaptcha()
          this.registerAccount.captchaCode = ''
          this.$throw(new Error(data.msg))
          return
        }
        this.$message({
          message: '发送成功，请前往邮箱查看',
          type: 'success'
        });
      })
    },
    validRegisterFlag(){
      this.registerButtonFlag = !(this.registerUsernameFlag && this.registerPasswordFlag
          && this.repasswordFlag && this.nameFlag && this.registerEmailFlag && this.mobileFlag
          && this.workNumberFlag && this.registerCaptchaFlag)
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
      this.validRegisterFlag()
    },
    validRegisterPassword(){
      this.repassword = ''
      this.repasswordMsg = ''
      this.repasswordFlag = false
      if (!isPassword(this.registerAccount.password)){
        this.registerPasswordMsg = '密码长度6-16位，可包含数字英文特殊字符'
        this.registerPasswordFlag = false
      }
      else {
        this.registerPasswordMsg = ''
        this.registerPasswordFlag = true
      }
      this.validRegisterFlag()
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
      this.validRegisterFlag()
    },
    validName(){
      this.registerAccount.name = this.registerAccount.name.replace(/\s+/g,"")
      if (this.registerAccount.name == ''){
        this.nameMsg = '姓名不能为空'
        this.nameFlag = false
      }
      else {
        this.nameMsg = ''
        this.nameFlag = true
      }
      this.validRegisterFlag()
    },
    validRegisterEmail(){
      if (!isEmail(this.registerAccount.email)){
        this.registerEmailMsg = '邮箱格式不正确'
        this.registerEmailFlag = false
      }
      else {
        this.registerEmailMsg = ''
        this.registerEmailFlag = true
      }
      this.validRegisterFlag()
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
      this.validRegisterFlag()
    },
    validWorkNumber(){
      if (!isWorkNumber(this.registerAccount.workNumber)){
        this.workNumberMsg = '工号格式不正确'
        this.workNumberFlag = false
      }
      else {
        this.workNumberMsg = ''
        this.workNumberFlag = true
      }
      this.validRegisterFlag()
    },
    validRegisterCaptcha(){
      this.registerAccount.captchaCode = this.registerAccount.captchaCode.replace(/\s+/g,"")
      if(this.registerAccount.captchaCode == ''){
        this.registerCaptchaMsg = '验证码不能为空'
        this.registerCaptchaFlag = false
      }
      else {
        this.registerCaptchaMsg = ''
        this.registerCaptchaFlag = true
      }
      this.validRegisterFlag()
    },
    getCaptcha(){
      this.registerAccount.captchaUUID = getUUID()
      this.captchaImg = this.$axios.defaults.baseURL +  "/helios/meeting/user/captcha.jpg?uuid=" + this.registerAccount.captchaUUID
      console.log(this.captchaImg)
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
  width: 580px;
  height: 640px;
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
  margin-top: 5px;
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
  height: 40px;
}
.register-line-first{
  margin-top: 20px;
}
.register-line{
  margin-top: 10px;
}
.register-msg{
  height: 10px;
  font-size: 7px;
  color: crimson;
  text-align: left;
  margin-left: 203px;
  margin-top: 0;
}
.register-title{
  font-size: 35px;
  margin-top: 20px;
  font-family: Fangsong;
  color:  #5959AB;
}
.captcha-img{
  width: 120px;
  margin-left: 10px;
}
</style>
<style lang="scss" scoped>
$color1: white;
$color2: black;
html, body {
  background: linear-gradient(to bottom, #000428, #004e92);
}
p {color: white; text-align: center;}
.title-text {
  background: url(../../assets/img/font_img.jpg);
  -webkit-background-clip: text;
  background-size: contain;
  width: 100%;
  text-align: center;
  color: transparent;
  font-weight: 900;
  &::before {
    content: attr(data-heading);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: linear-gradient(45deg, rgba(255,255,255,0) 45%,rgba(255,255,255,0.8) 50%,rgba(255,255,255,0) 55%,rgba(255,255,255,0) 100%);
    -webkit-background-clip: text;
    color: transparent;
    mix-blend-mode: screen;
    animation: shine 1s infinite;
    background-size: 200%;
    text-shadow:
        2px 2px 10px rgba(#000, 0.2),
        -2px 2px 10px rgba(#000, 0.2),
        -2px -2px 10px rgba(#000, 0.2);
  }
}
@keyframes shine {
  0% {background-position: -100%;}
  100% {background-position: 100%;}
}
/* Not needed for demo */
@font-face {
  font-family:'frozen';
  src:url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/Ice%20kingdom%20-%20Bold%20-%20Por%20Kustren.woff');
}
html, body {
  height: 100%;
}
.title-text {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  margin: 0;
  font-family: 'frozen', serif;
  font-weight: 700;
}
</style>
