<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="updatePersonalInfo-input-first">
        <div class="updatePersonalInfo-input-name">姓名:</div>
        <div>
          <el-input v-model="user.name" placeholder="请输入姓名"
                    style="width: 260px" @input="validName"></el-input>
        </div>
      </div>
      <div class="updatePersonalInfo-msg">{{nameMsg}}</div>
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
import {isMobile, isWorkNumber} from "@/common/util/validate";

export default {
name: "update_personal_info_model",
  data(){
    return{
      user: {
        name: '',
        mobile: '',
        workNumber: '',
      },
      nameMsg: '',
      nameFlag: true,
      mobileMsg: '',
      mobileFlag: true,
      workNumberMsg: '',
      workNumberFlag: true,
      updatePersonalInfoButtonFlag: false,
    }
  },
  methods:{
    validFlag(){
      this.updatePersonalInfoButtonFlag = !(this.nameFlag
          && this.mobileFlag && this.workNumberFlag)
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
      this.user.name = ''
      this.user.mobile = ''
      this.user.workNumber = ''
      this.nameMsg = ''
      this.nameFlag = true
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
        url: "/helios/meeting/user/change_user_info",
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
        let userInfo = JSON.parse(localStorage.getItem("userInfo"))
        userInfo.mobile = this.user.mobile
        userInfo.workNumber = this.user.workNumber
        userInfo.name = this.user.name
        localStorage.setItem("userInfo",JSON.stringify(userInfo))
        this.$emit("reflush")
        this.closeUpdatePersonalInfoSelf()
      })
    },
  },
}
</script>

<style src="../../assets/css/update_personal_info_model.css" scoped/>
