<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="table-menu">
        <div class="table">
          <el-table
              :data="showData"
              v-loading="loading"
              border
              style="width: 100%">
            <el-table-column
                label="时间段"
                align="center">
              <template slot-scope="scope">
                <div>{{scope.row.time[0]}} — {{scope.row.time[1]}} :</div>
              </template>
            </el-table-column>
            <el-table-column
                label="状态"
                align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.status" placeholder="请选择" @change="updateMeetingRoomStatus(scope.row)">
                  <el-option
                      v-for="item in options"
                      :key="item.status"
                      :label="item.label"
                      :value="item.status">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
<!--      <div class="choose-status" v-for="one in showData" :key="one.id">
        <div class="choose-status-name">{{one.time[0]}} — {{one.time[1]}} :</div>
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
      </div>-->
      <div class="updateMeetingRoomStatus-button">
          <el-button type="primary" @click="closeUpdateMeetingRoomStatusSelf">关闭</el-button>
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
      showData: [],
      loading: false,
      day:null,
      options: [
        {
          status: 0,
          label: '可用'
        },
        {
          status: 1,
          label: '已被预约'
        },
        {
          status: 2,
          label: '使用中'
        },
        {
          status: 3,
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
    getShowData(id,day){
      this.loading = true
      this.id = id;
      this.day = day;
      this.$axios({
        method : "GET",
        url: "/helios/meeting/room/get_meeting_room_time?id=" + id,
      }).then(res=>{
        const data = res.data.data
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.$axios({
          method: "POST",
          url: "/helios/meeting/room/query_meeting_room_status",
          data: {meetingRoomId:id,date:day}
        }).then(res=>{
          this.loading = false
          const statusData = res.data.data
          if (res.data.code !== 200){
            this.$throw(new Error(res.data.msg))
            return
          }
          for (let one of statusData) {
            for (let datum of data) {
              if (datum.id === one.meetingRoomTimeId){
                datum.time[0] = datum.time[0].substring(0,datum.time[0].lastIndexOf(":"))
                datum.time[1] = datum.time[1].substring(0,datum.time[1].lastIndexOf(":"))
                datum.status = one.status
              }
            }
          }
          this.showData = data
        })
      })
    },
    updateMeetingRoomStatus(){
      let p = []
      for(let one of this.showData){
        p.push({date:this.day,meetingRoomId:this.id,meetingRoomTimeId: one.id,status: one.status})
      }
      this.$axios({
        method : "POST",
        url: "/helios/meeting/room/change_meeting_room_status",
        data : [...p]
      }).then(res=>{
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
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
