<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="mp"></div>
      <div class="choose-status" v-for="one in showData" :key="one.id">
        <div class="choose-status-name">{{one.times[0]}} — {{one.times[1]}} :</div>
        <div class="choose-status-select">
          <el-select v-model="one.status" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.status"
                :label="item.label"
                :value="item.status">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="updateMeetingRoomStatus-button">
        <div class="updateMeetingRoomStatus-button-left">
          <el-button type="primary" @click="closeUpdateMeetingRoomStatusSelf">关闭</el-button>
        </div>
        <div class="updateMeetingRoomStatus-button-right">
          <el-button type="success" @click="updateMeetingRoomStatus">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "update_meeting_room_status_model",
  data(){
    return{
      id: null,
      showData: [
        {
          id:1,
          times: ['8:00','9:00'],
          status: 3,
        },
        {
          id:2,
          times: ['9:00','10:00'],
          status: 2,
        },
        {
          id:3,
          times: ['10:00','11:00'],
          status: 2,
        },
        {
          id:4,
          times: ['11:00','12:00'],
          status: 2,
        },
        {
          id:5,
          times: ['12:00','13:00'],
          status: 1,
        },
        {
          id:6,
          times: ['13:00','14:00'],
          status: 1,
        },
        {
          id:7,
          times: ['14:00','15:00'],
          status: 1,
        },
        {
          id:8,
          times: ['15:00','16:00'],
          status: 1,
        }
      ],
      options: [
        {
          status: 1,
          label: '可用'
        },
        {
          status: 2,
          label: '已被预约'
        },
        {
          status: 3,
          label: '使用中'
        },
        {
          status: 4,
          label: '停用'
        }
      ],
    }
  },
  methods:{
    closeUpdateMeetingRoomStatusSelf(){
      this.$emit("closeUpdateMeetingRoomStatus")
      this.clearData()
    },
    clearData(){
      this.id = null
      this.showData = []
    },
    getTimesStatus(id){
      this.$axios({
        method : "POST",
        url: "/helios/meeting/room/query_meeting_room_time", //todo
        data : {id: id}
      }).then(res=>{
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.showData = data.meetingRoomList
        this.id = id
      })
    },
    updateMeetingRoomStatus(){
      let p = []
      for(let one of this.showData){
        p.push({id: one.id,status: one.status})
      }
      this.$axios({
        method : "POST",
        url: "/helios/meeting/room/query_meeting_room_time", //todo
        data : {p}
      }).then(res=>{
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.closeUpdateMeetingRoomStatusSelf()
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

<style src="../../assets/css/update_meeting_room_status_model.css" scoped/>
