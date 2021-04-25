<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modifyUser-input-first">
        <div class="modifyUser-input-name">用户名:</div>
        <div>
          <el-input v-model="user.username" placeholder="请输入用户名"
                    style="width: 260px" @input="validUsername"></el-input>
        </div>
      </div>
      <div class="modifyUser-msg">{{usernameMsg}}</div>
      <div class="modifyUser-input">
        <div class="modifyUser-input-name">姓名:</div>
        <div>
          <el-input v-model="user.name" placeholder="请输入姓名"
                    style="width: 260px" @input="validName"></el-input>
        </div>
      </div>
      <div class="modifyUser-msg">{{nameMsg}}</div>
      <div class="modifyUser-input">
        <div class="modifyUser-input-name">邮箱:</div>
        <div>
          <el-input v-model="user.email" placeholder="请输入邮箱"
                    style="width: 260px" @input="validEmail"></el-input>
        </div>
      </div>
      <div class="modifyUser-msg">{{emailMsg}}</div>
      <div class="modifyUser-input">
        <div class="modifyUser-input-name">手机号:</div>
        <div>
          <el-input v-model="user.mobile" placeholder="请输入手机号"
                    style="width: 260px" @input="validMobile"></el-input>
        </div>
      </div>
      <div class="modifyUser-msg">{{mobileMsg}}</div>
      <div class="modifyUser-input">
        <div class="modifyUser-input-name">工号:</div>
        <div>
          <el-input v-model="user.workNumber" placeholder="请输入工号"
                    style="width: 260px" @input="validWorkNumber"></el-input>
        </div>
      </div>
      <div class="modifyUser-msg">{{workNumberMsg}}</div>
      <div class="modifyUser-input">
        <div class="modifyUser-input-name">部门:</div>
        <div>
          <el-select v-model="departmentId" placeholder="请选择" style="width: 260px">
            <el-option
                v-for="item in departmentList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="modifyUser-radio">
        <div class="modifyUser-radio-name">状态:</div>
        <div>
          <el-radio v-model="user.status" label="1">正常</el-radio>
          <el-radio v-model="user.status" label="0">禁用</el-radio>
        </div>
      </div>
      <div class="modifyUser-checkbox">
        <div class="modifyUser-checkbox-name">角色:</div>
        <div class="modifyUser-checkbox-view">
          <el-checkbox-group v-model="roleIdList">
            <el-checkbox
                v-for="role in userRoleList"
                :key="role.name"
                :label="role.id"
            >{{role.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="modifyUser-button">
        <div class="modifyUser-button-left">
          <el-button type="primary" @click="closeSelf">关闭</el-button>
        </div>
        <div class="modifyUser-button-right">
          <el-button type="success" @click="modifyUser" :disabled="modifyUserButtonFlag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isEmail, isMobile, isUsername, isWorkNumber} from "@/common/util/validate";

export default {
name: "user_manager_model",
  data(){
    return{
      user: {},
      roleIdList: [],
      userRoleList: [],
      userRoleList1: [
        {
          id: 1,
          name: '收拾收拾',
        },
        {
          id: 2,
          name: '顶顶顶顶',
        },
        {
          id: 3,
          name: '啊啊啊啊',
        },
        {
          id: 4,
          name: '额鹅鹅鹅',
        },
        {
          id: 5,
          name: '凄凄切切',
        },
        {
          id: 6,
          name: '哈哈哈哈',
        },
        {
          id: 7,
          name: '密密麻麻',
        },
        {
          id: 8,
          name: '一样一样',
        }
      ],
      usernameMsg: '',
      usernameFlag: true,
      nameMsg: '',
      nameFlag: true,
      emailMsg: '',
      emailFlag: true,
      mobileMsg: '',
      mobileFlag: true,
      workNumberMsg: '',
      workNumberFlag: true,
      modifyUserButtonFlag: false,
      departmentList: [{
        id: '-1',
        name: '无'
      }, {
        id: '选项2',
        name: '双皮奶'
      }, {
        id: '选项3',
        name: '蚵仔煎'
      }, {
        id: '选项4',
        name: '龙须面'
      }, {
        id: '选项5',
        name: '北京烤鸭'
      }],
      departmentId: '-1',
    }
  },
  methods:{
    closeSelf() {
      this.$emit("closeme")
      this.clearData()
    },
    getUserRoleIds(){
      this.$axios({
        method : "POST",
        url: "/helios/meeting/role/get_user_roles",//todo
        data: {id : this.user.id}
      }).then(res=>{
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.roleIdList = data
      })
    },
    getUserDepartmentId(){
      this.$axios({
        method : "POST",
        url: "/helios/meeting/department/get_user_department",//todo
        data: {id : this.user.id}
      }).then(res=>{
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.departmentId = data
      })
    },
    getRoleList(){
      this.userRoleList = this.userRoleList1
      this.$axios({
        method : "GET",
        url: "/helios/meeting/role/get_all_role",//todo
      }).then(res=>{
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.userRoleList = data.userRoleList
      })
    },
    getDepartmentList(){
      this.$axios({
        method : "GET",
        url: "/helios/meeting/department/get_all_department",//todo
      }).then(res=>{
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.departmentList = data.departmentList
      })
    },
    validFlag(){
      this.modifyUserButtonFlag = !(this.usernameFlag && this.nameFlag
          && this.emailFlag && this.mobileFlag && this.workNumberFlag)
    },
    validUsername(){
      if (!isUsername(this.user.username)){
        this.usernameMsg = '用户名长度4-12位，英文开头可包含数字英文下划线'
        this.usernameFlag = false
      }
      else {
        this.usernameMsg = ''
        this.usernameFlag = true
      }
      this.validFlag()
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
    validEmail(){
      if (!isEmail(this.user.email)){
        this.emailMsg = '邮箱格式不正确'
        this.emailFlag = false
      }
      else {
        this.emailMsg = ''
        this.emailFlag = true
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
      this.user = {}
      this.usernameMsg = ''
      this.usernameFlag = true
      this.nameMsg = ''
      this.nameFlag = true
      this.emailMsg = ''
      this.emailFlag = true
      this.mobileMsg = ''
      this.mobileFlag = true
      this.workNumberMsg = ''
      this.workNumberFlag = true
      this.modifyUserButtonFlag = false
      this.departmentId = '-1'
      this.roleIdList = []
    },
    modifyUser(){
      let p = {
        ...this.user,
        roleIdList: this.roleIdList,
        departmentId: this.departmentId
      }
      p.status = parseInt(p.status)
      this.$axios({
        method : "POST",
        url: "/helios/meeting/user/update_user",//todo
        data: p
      }).then(res=>{
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.closeSelf()
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.$parent.currentPageButton()
      })
    }
  },
  mounted(){
    this.getRoleList()
    this.getDepartmentList()
  },
}
</script>

<style src="../../assets/css/user_manager_model.css" scoped/>
