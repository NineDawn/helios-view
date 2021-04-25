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
export default {
name: "update_meeting_room_info_model",
  data(){
    return {
      user: '',
      usersShow: [],
      users: [
        {
          id: 1,
          name: 'wa',
          email: '13231321@qq.com',
        },
        {
          id: 2,
          name: 'saawdas',
          email: '79798465661@qq.com',
        },
      ],
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
      updateMeetingRoomInfoButtonFlag: false,
      lastInput : null,
    }
  },
  methods:{
    closeUpdateMeetingRoomInfoSelf(){
      this.$emit("closeUpdateMeetingRoomInfo")
      this.clearData()
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
      this.user = ''
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
      this.updateMeetingRoomInfoButtonFlag = false
      this.lastInput = null
      this.pageNumber = 1
    },
  },
}
</script>

<style src="../../assets/css/update_meeting_room_info_model.css" scoped/>
