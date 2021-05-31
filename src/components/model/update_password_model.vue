<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="updatePassword-line-first">
        <div class="updatePassword-name">{{'原密码:'}}</div>
        <div class="updatePassword-right">
          <el-input v-model="user.password" placeholder="请输入原密码" style="width: 260px" clearable
                    @input="validPassword"></el-input>
        </div>
      </div>
      <div class="updatePassword-link">
        <el-link type="primary" @click="forgetPassword">忘记密码?</el-link>
      </div>
      <div class="updatePassword-line">
        <div class="updatePassword-name">{{'新密码:'}}</div>
        <div class="updatePassword-right">
          <el-input v-model="user.newPassword" placeholder="请输入新密码" style="width: 260px" clearable
                    @input="validNewPassword"></el-input>
        </div>
      </div>
      <div class="updatePassword-msg">{{passwordMsg}}</div>
      <div class="updatePassword-line">
        <div class="updatePassword-name">{{'重复密码:'}}</div>
        <div class="updatePassword-right">
          <el-input v-model="repassword" placeholder="请重复密码" style="width: 260px" clearable
                    @input="validRepassword"></el-input>
        </div>
      </div>
      <div class="updatePassword-msg">{{repasswordMsg}}</div>
      <div class="updatePassword-button">
        <div class="updatePassword-button-left">
          <el-button type="primary" @click="closeUpdatePasswordSelf">关闭</el-button>
        </div>
        <div class="updatePassword-button-right">
          <el-button type="success" @click="updatePassword" :disabled="updatePasswordButtonFlag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isPassword} from "@/common/util/validate";

export default {
name: "update_password",
  data(){
    return{
      user:{
        password: '',
        newPassword: '',
      },
      repassword: '',
      passwordMsg: '',
      passwordFlag: false,
      repasswordMsg: '',
      repasswordFlag: false,
      updatePasswordButtonFlag: true,
    }
  },
  methods:{
    forgetPassword(){
      this.$message({
        message: '请联系管理员修改密码',
      });
    },
    closeUpdatePasswordSelf(){
      this.$emit("closeUpdatePasswordModel")
      this.user.password = ''
      this.user.newPassword = ''
      this.repassword = ''
      this.passwordMsg = ''
      this.passwordFlag = false
      this.repasswordMsg = ''
      this.repasswordFlag = false
      this.updatePasswordButtonFlag = true
    },
    validPassword(){
      this.user.password = this.user.password.replace(/\s+/g,"")
    },
    validNewPassword(){
      this.repassword = ''
      this.repasswordMsg = ''
      this.repasswordFlag = false
      if (!isPassword(this.user.newPassword)){
        this.passwordMsg = '密码长度6-16位，可包含数字英文特殊字符'
        this.passwordFlag = false
      }
      else {
        this.passwordMsg = ''
        this.passwordFlag = true
      }
      this.validButtonFlag()
    },
    validRepassword(){
      if (this.repassword !== this.user.newPassword){
        this.repasswordMsg = '两次密码不一致'
        this.repasswordFlag = false
      }
      else {
        this.repasswordMsg = ''
        this.repasswordFlag = true
      }
      this.validButtonFlag()
    },
    validButtonFlag(){
      this.updatePasswordButtonFlag = !(this.passwordFlag && this.repasswordFlag)
    },
    updatePassword(){
      this.$axios({
        method : "POST",
        url: "/helios/meeting/user/update_password",
        data : {
          password: this.user.newPassword,
        }
      }).then(res=>{
        const data = res.data
        if (data.code !== 200){
          this.$throw(new Error(data.msg))
          return
        }
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.closeUpdatePasswordSelf()
        localStorage.removeItem("userInfo")
        this.$router.push('login')
      })
    },
  },
}
</script>

<style src="../../assets/css/update_password_model.css" scoped/>
