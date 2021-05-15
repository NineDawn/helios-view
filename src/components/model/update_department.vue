<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="updateDepartment-input-first">
        <div class="updateDepartment-input-name">部门名称:</div>
        <div>
          <el-input v-model="department.name" placeholder="部门名称"
                    style="width: 260px" @input="validName"></el-input>
        </div>
      </div>
      <div class="updateDepartment-msg">{{nameMsg}}</div>
      <div class="updateDepartment-input">
        <div class="updateDepartment-input-name">部门编号:</div>
        <div>
          <el-input v-model="department.code" placeholder="请输入部门编号"
                    style="width: 260px" @input="validCode"></el-input>
        </div>
      </div>
      <div class="updateDepartment-msg">{{codeMsg}}</div>
      <div class="updateDepartment-input">
        <div class="updateDepartment-input-name">备注:</div>
        <div>
          <el-input v-model="department.remark" placeholder="请输入备注"
                    style="width: 260px" @input="validRemark"
                    maxlength="20" show-word-limit></el-input>
        </div>
      </div>
      <div class="updateDepartment-button">
        <div class="updateDepartment-button-left">
          <el-button type="primary" @click="closeUpdateDepartment">关闭</el-button>
        </div>
        <div class="updateDepartment-button-right">
          <el-button type="success" @click="updateDepartment" :disabled="updateDepartmentButtonFlag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isDepartmentCode} from "@/common/util/validate";

export default {
name: "update_department",
  data(){
    return{
      department: {},
      nameMsg: '',
      nameFlag: true,
      codeMsg: '',
      codeFlag: true,
      updateDepartmentButtonFlag: false,
    }
  },
  methods:{
    closeUpdateDepartment(){
      this.$emit("closeUpdateDepartment")
      this.clearData()
    },
    clearData(){
      this.department = {}
      this.nameMsg = ''
      this.nameFlag = true
      this.codeMsg = ''
      this.codeFlag = true
      this.updateDepartmentButtonFlag = false
    },
    validFlag(){
      this.updateDepartmentButtonFlag = !(this.nameFlag && this.codeFlag)
    },
    validName(){
      this.department.name = this.department.name.replace(/\s+/g,"")
      if (this.department.name == ''){
        this.nameMsg = '部门名称不能为空'
        this.nameFlag = false
      }
      else {
        this.nameMsg = ''
        this.nameFlag = true
      }
      this.validFlag()
    },
    validCode(){
      if (!isDepartmentCode(this.department.code)){
        this.codeMsg = '部门编号格式不正确'
        this.codeFlag = false
      }
      else {
        this.codeMsg = ''
        this.codeFlag = true
      }
      this.validFlag()
    },
    validRemark(){
      this.department.remark = this.department.remark.replace(/\s+/g,"")
    },
    updateDepartment(){
      this.$axios({
        method: "POST",
        url: "/helios/meeting/department/update_department",//todo
        data: this.department
      }).then(res=>{
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.closeUpdateDepartment()
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$parent.searchDepartment()
      })
    },
  },
}
</script>

<style src="../../assets/css/update_department.css" scoped/>
