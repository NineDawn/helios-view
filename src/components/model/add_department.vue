<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="addDepartment-input-first">
        <div class="addDepartment-input-name">部门名称:</div>
        <div>
          <el-input v-model="department.name" placeholder="请输入部门名称"
                    style="width: 260px" @input="validName" clearable></el-input>
        </div>
      </div>
      <div class="addDepartment-msg">{{nameMsg}}</div>
      <div class="addDepartment-input">
        <div class="addDepartment-input-name">部门编号:</div>
        <div>
          <el-input v-model="department.code" placeholder="请输入部门编号"
                    style="width: 260px" @input="validCode" clearable></el-input>
        </div>
      </div>
      <div class="addDepartment-msg">{{codeMsg}}</div>
      <div class="addDepartment-input">
        <div class="addDepartment-input-name">备注:</div>
        <div>
          <el-input v-model="department.remark" placeholder="请输入备注"
                    style="width: 260px" @input="validRemark"
                    maxlength="20" show-word-limit></el-input>
        </div>
      </div>
      <div class="addDepartment-button">
        <div class="addDepartment-button-left">
          <el-button type="primary" @click="closeAddDepartment">关闭</el-button>
        </div>
        <div class="addDepartment-button-right">
          <el-button type="success" @click="addDepartment" :disabled="addDepartmentButtonFlag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isDepartmentCode} from "@/common/util/validate";

export default {
name: "add_department",
  data(){
    return{
      department: {
        name: '',
        code: '',
        remark: '',
      },
      nameMsg: '',
      nameFlag: false,
      codeMsg: '',
      codeFlag: false,
      addDepartmentButtonFlag: true,
    }
  },
  methods:{
    closeAddDepartment(){
      this.$emit("closeAddDepartment")
      this.clearData()
    },
    clearData(){
      this.department.name = ''
      this.department.code = ''
      this.department.remark = ''
      this.nameMsg = ''
      this.nameFlag = false
      this.codeMsg = ''
      this.codeFlag = false
      this.addDepartmentButtonFlag = true
    },
    validFlag(){
      this.addDepartmentButtonFlag = !(this.nameFlag && this.codeFlag)
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
    addDepartment(){
      this.$axios({
        method: "POST",
        url: "/helios/meeting/department/add_department",
        data: this.department
      }).then(res=>{
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.closeAddDepartment()
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.$parent.searchDepartment()
      })
    },
  },
}
</script>

<style src="../../assets/css/add_department.css" scoped/>
