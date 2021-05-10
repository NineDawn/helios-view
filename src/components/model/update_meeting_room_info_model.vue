<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="updateMeetingRoomInfo-input-first">
        <div class="updateMeetingRoomInfo-input-name">会议室名称:</div>
        <div>
          <el-input v-model="meetingRoom.name" placeholder="请输入会议室名称"
                    style="width: 260px" @input="validName"></el-input>
        </div>
      </div>
      <div class="updateMeetingRoomInfo-msg">{{nameMsg}}</div>
      <div class="updateMeetingRoomInfo-input">
        <div class="updateMeetingRoomInfo-input-name">会议室编号:</div>
        <div>
          <el-input v-model="meetingRoom.code" placeholder="请输入会议室编号"
                    style="width: 260px" @input="validCode"></el-input>
        </div>
      </div>
      <div class="updateMeetingRoomInfo-msg">{{codeMsg}}</div>
      <div class="updateMeetingRoomInfo-input">
        <div class="updateMeetingRoomInfo-input-name">会议室地点:</div>
        <div>
          <el-input v-model="meetingRoom.place" placeholder="请输入会议室地点"
                    style="width: 260px" @input="validPlace"></el-input>
        </div>
      </div>
      <div class="updateMeetingRoomInfo-msg">{{placeMsg}}</div>
      <div class="updateMeetingRoomInfo-input">
        <div class="updateMeetingRoomInfo-input-name">会议室楼层:</div>
        <div>
          <el-input v-model="meetingRoom.floor" placeholder="请输入会议室楼层"
                    style="width: 260px" @input="validFloor"></el-input>
        </div>
      </div>
      <div class="updateMeetingRoomInfo-msg">{{floorMsg}}</div>
      <div class="updateMeetingRoomInfo-input">
        <div class="updateMeetingRoomInfo-input-name">会议室容量:</div>
        <div>
          <el-input v-model="meetingRoom.capacity" placeholder="请输入会议室容量"
                    style="width: 260px" @input="validCapacity"></el-input>
        </div>
      </div>
      <div class="updateMeetingRoomInfo-msg">{{capacityMsg}}</div>
      <div class="updateMeetingRoomInfo-input">
        <div class="updateMeetingRoomInfo-input-name">会议室备注:</div>
        <div>
          <el-input v-model="meetingRoom.remark" placeholder="请输入会议室备注"
                    style="width: 260px" @input="validRemark"></el-input>
        </div>
      </div>
      <div class="updateMeetingRoomInfo-input-last">
        <div class="updateMeetingRoomInfo-input-name">负责人:</div>
        <div>
          <el-select
              v-model.trim="user"
              filterable
              remote
              reserve-keyword
              placeholder="无"
              :loading="loading"
              :remote-method="searchUsers"
              style="width: 260px"
              clearable
              v-loadmore="loadMore">
            <el-option
                v-for="item in usersShow"
                :key="item.id"
                :label="item.label"
                :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="updateMeetingRoomInfo-radio">
        <div class="updateMeetingRoomInfo-radio-name">会议室状态:</div>
        <div>
          <el-radio v-model="meetingRoom.status" label="1">可用</el-radio>
          <el-radio v-model="meetingRoom.status" label="0">禁用</el-radio>
        </div>
      </div>
      <div class="updateMeetingRoomInfo-button">
        <div class="updateMeetingRoomInfo-button-left">
          <el-button type="primary" @click="closeUpdateMeetingRoomInfoSelf">关闭</el-button>
        </div>
        <div class="updateMeetingRoomInfo-button-right">
          <el-button type="success" @click="updateMeetingRoomInfo"
                     :disabled="updateMeetingRoomInfoButtonFlag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isMeetingRoomCapacity, isMeetingRoomCode, isMeetingRoomFloor} from "@/common/util/validate";

export default {
name: "update_meeting_room_info_model",
  data(){
    return {
      user: null,
      usersShow: [],
      users: [],
      pageSize: 10,
      pageNumber: 1,
      loading: false,
      meetingRoom: {},
      nameMsg: '',
      nameFlag: true,
      codeMsg: '',
      codeFlag: true,
      placeMsg: '',
      placeFlag: true,
      floorMsg: '',
      floorFlag: true,
      capacityMsg: '',
      capacityFlag: true,
      updateMeetingRoomInfoButtonFlag: false,
      lastInput : null,
    }
  },
  methods:{
    closeUpdateMeetingRoomInfoSelf(){
      this.$emit("closeUpdateMeetingRoomInfo")
      this.clearData()
    },
    validFlag(){
      this.updateMeetingRoomInfoButtonFlag = !(this.nameFlag && this.codeFlag
          && this.placeFlag && this.floorFlag && this.capacityFlag)
    },
    validName(){
      this.meetingRoom.name = this.meetingRoom.name.replace(/\s+/g,"")
      if (this.meetingRoom.name == ''){
        this.nameMsg = '会议室名称不能为空'
        this.nameFlag = false
      }
      else {
        this.nameMsg = ''
        this.nameFlag = true
      }
      this.validFlag()
    },
    validCode(){
      if (!isMeetingRoomCode(this.meetingRoom.code)){
        this.codeMsg = '会议室编号格式不正确'
        this.codeFlag = false
      }
      else {
        this.codeMsg = ''
        this.codeFlag = true
      }
      this.validFlag()
    },
    validPlace(){
      this.meetingRoom.place = this.meetingRoom.place.replace(/\s+/g,"")
      if (this.meetingRoom.place == ''){
        this.placeMsg = '会议室地点不能为空'
        this.placeFlag = false
      }
      else {
        this.placeMsg = ''
        this.placeFlag = true
      }
      this.validFlag()
    },
    validFloor(){
      if (!isMeetingRoomFloor(this.meetingRoom.floor)){
        this.floorMsg = '会议室楼层必须为数字'
        this.floorFlag = false
      }
      else {
        this.floorMsg = ''
        this.floorFlag = true
      }
      this.validFlag()
    },
    validCapacity(){
      if (!isMeetingRoomCapacity(this.meetingRoom.capacity)){
        this.capacityMsg = '会议室容量必须为数字'
        this.capacityFlag = false
      }
      else {
        this.capacityMsg = ''
        this.capacityFlag = true
      }
      this.validFlag()
    },
    validRemark(){
      this.meetingRoom.remark = this.meetingRoom.remark.replace(/\s+/g,"")
    },
    searchUsers(input){
      this.pageNumber = 1
      input = input.replace(/\s+/g,"")
      if(input === ''){
        return
      }
      this.loading = true
      this.lastInput = input
      let p = {
        name: input,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
      }
      this.$axios({
        method : "POST",
        url: "/helios/meeting/user/query_userInfo",
        data : p
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.users = data.userList
        this.usersShow = []
        for(let one of this.users){
          let u = {
            id: one.id,
            label: one.name + ' (' + one.email + ')'
          }
          this.usersShow.push(u)
        }
      })
    },
    loadMore(){
      if (this.usersShow.length < this.pageNumber * this.pageSize){
        return ;
      }
      this.pageNumber = this.pageNumber + 1;
      let p = {
        name: this.lastInput,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
      }
      this.$axios({
        method : "POST",
        url: "/helios/meeting/user/query_userInfo",
        data : p
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.users = data.userList
        for(let one of this.users){
          let u = {
            id: one.id,
            label: one.name + ' (' + one.email + ')'
          }
          this.usersShow.push(u)
        }
      })
    },
    clearData(){
      this.meetingRoom = {}
      this.user = null
      this.usersShow = []
      this.users = []
      this.nameMsg = ''
      this.nameFlag = true
      this.codeMsg = ''
      this.codeFlag =  true
      this.placeMsg = ''
      this.placeFlag = true
      this.floorMsg = ''
      this.floorFlag = true
      this.capacityMsg = ''
      this.capacityFlag = true
      this.updateMeetingRoomInfoButtonFlag = false
      this.lastInput = null
      this.pageNumber = 1
    },
    updateMeetingRoomInfo(){
      if (this.user === ''){
        this.user = null
      }
      let p = {
        id: this.meetingRoom.id,
        name: this.meetingRoom.name,
        code: this.meetingRoom.code,
        place: this.meetingRoom.place,
        floor: parseInt(this.meetingRoom.floor),
        capacity: parseInt(this.meetingRoom.capacity),
        status: parseInt(this.meetingRoom.status),
        remark: this.meetingRoom.remark,
        userId: this.user
      }
      this.$axios({
        method : "POST",
        url: "/helios/meeting/room/update_meeting_room_info", //todo
        data: p
      }).then(res=>{
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.closeUpdateMeetingRoomInfoSelf()
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.$parent.currentPageButton(this.$parent.currentPage)
      })
    },
  },
}
</script>

<style src="../../assets/css/update_meeting_room_info_model.css" scoped/>
