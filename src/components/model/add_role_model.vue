<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="addRole-input-first">
        <div class="addRole-input-name">角色名称:</div>
        <div>
          <el-input v-model="role.name" placeholder="请输入角色名称"
                    style="width: 260px" @input="validName" clearable></el-input>
        </div>
      </div>
      <div class="addRole-msg">{{nameMsg}}</div>
      <div class="addRole-input">
        <div class="addRole-input-name">备注:</div>
        <div>
          <el-input v-model="role.remark" placeholder="请输入备注"
                    style="width: 260px" @input="validRemark"
                    maxlength="20" show-word-limit></el-input>
        </div>
      </div>
      <div class="addRole-button">
        <div class="addRole-button-left">
          <el-button type="primary" @click="closeAddRole">关闭</el-button>
        </div>
        <div class="addRole-button-right">
          <el-button type="success" @click="addRole" :disabled="addRoleButtonFlag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
name: "add_role_model",
  data(){
    return{
      role: {
        name: '',
        remark: '',
      },
      nameMsg: '',
      nameFlag: false,
      addRoleButtonFlag: true,
    }
  },
  methods:{
    closeAddRole(){
      this.$emit("closeAddRole")
      this.clearData()
    },
    clearData(){
      this.role.name = ''
      this.role.remark = ''
      this.nameMsg = ''
      this.nameFlag = false
      this.addRoleButtonFlag = true
    },
    validFlag(){
      this.addRoleButtonFlag = !(this.nameFlag)
    },
    validName(){
      this.role.name = this.role.name.replace(/\s+/g,"")
      if (this.role.name === ''){
        this.nameMsg = '角色名称不能为空'
        this.nameFlag = false
      }
      else {
        this.nameMsg = ''
        this.nameFlag = true
      }
      this.validFlag()
    },
    validRemark(){
      this.role.remark = this.role.remark.replace(/\s+/g,"")
    },
    addRole(){
      this.$axios({
        method: "POST",
        url: "/helios/meeting/role/add_role",
        data: this.role
      }).then(res=>{
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.closeAddRole()
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.$parent.searchRole()
      })
    },
  },
}
</script>

<style src="../../assets/css/add_role_model.css" scoped/>

