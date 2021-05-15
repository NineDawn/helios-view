<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="approveMeeting-input-first">
        <div class="approveMeeting-input-name">会议名称:</div>
        <div>
          <el-input v-model="meetingRoom.title"
                    style="width: 360px" disabled></el-input>
        </div>
      </div>
      <div class="approveMeeting-input">
        <div class="approveMeeting-input-name">会议内容:</div>
        <div>
          <el-input v-model="meetingRoom.meetingContent" type="textarea" :autosize="{ minRows: 2}"
                    style="width: 360px" disabled></el-input>
        </div>
      </div>
      <div class="approveMeeting-input">
        <div class="approveMeeting-input-name">参会人员:</div>
        <div>
          <el-input v-model="meetingRoom.users" type="textarea" :autosize="{ minRows: 2}"
                    style="width: 360px" disabled></el-input>
        </div>
      </div>
      <div class="approveMeeting-button">
        <div class="left"><el-button type="primary" @click="closeApproveMeetingSelf">关闭</el-button></div>
        <div><el-button type="success" @click="agreeApproveMeeting">同意</el-button></div>
        <div class="right"><el-button type="danger" @click="refuseApproveMeeting">拒绝</el-button></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "approve_meeting_model",
  data(){
    return{
      code:"",
      meetingRoom:{

      },
    }
  },
  methods:{
    closeApproveMeetingSelf(){
      this.$emit("closeApproveMeetingModel")
      this.clearData()
    },
    clearData(){
      this.meetingRoom.id = null
      this.meetingRoom.title = ''
      this.meetingRoom.content = ''
      this.meetingRoom.users = []
    },
    getShowData(id){
      this.$axios({
        method : "POST",
        url: "/helios/meeting/user/update_user_info", //todo
        data : {id: id}
      }).then(res=>{
        const data = res.data
        if (data.code !== 200){
          throw new Error(data.msg)
        }
        this.meetingRoom = data.meetingRoom
      })
    },
    agreeApproveMeeting(){
      this.$axios({
        method : "POST",
        url: "/helios/meeting/application/accept_application?applicationCode=" + this.meetingRoom.applicationCode, //todo
      }).then(res=>{
        const data = res.data
        if (data.code !== 200){
          throw new Error(data.msg)
        }
        this.$message({
          type: 'success',
          message: '申请已同意'
        })
      })
    },
    refuseApproveMeeting(){
      this.$prompt('请输入拒绝原因', '拒绝', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: this.checkMessageBox,
        inputErrorMessage: '拒绝原因不能为空'
      }).then(({value}) => {
        this.$axios({
          method : "POST",
          url: "/helios/meeting/application/rejected_application", //todo
          data : {remark: value,applicationCode:this.meetingRoom.applicationCode}
        }).then(res=>{
          const data = res.data
          if (data.code !== 200){
            throw new Error(data.msg)
          }
          this.$message({
            type: 'success',
            message: '申请已拒绝'
          })
        })
      })
    },
    checkMessageBox(value){
      if(value.length < 1){
        return false
      }
      else {
        return true
      }
    },
  },
}
</script>

<style src="../../assets/css/approve_meeting_model.css" scoped/>
