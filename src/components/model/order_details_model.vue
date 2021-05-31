<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="order-details-input-out-first">
        <div class="order-details-input">
          <div class="order-details-input-name-first">会议室名称:</div>
          <div>
            <el-input v-model="meetingRoom.name" placeholder=""
                      style="width: 260px" disabled></el-input>
          </div>
        </div>
        <div class="order-details-input">
          <div class="order-details-input-name">会议室编号:</div>
          <div>
            <el-input v-model="meetingRoom.code" placeholder=""
                      style="width: 260px" disabled></el-input>
          </div>
        </div>
        <div class="order-details-input">
          <div class="order-details-input-name">会议室地点:</div>
          <div>
            <el-input v-model="meetingRoom.place" placeholder=""
                      style="width: 260px" disabled></el-input>
          </div>
        </div>
      </div>
      <div class="order-details-input-out">
        <div class="order-details-input">
          <div class="order-details-input-name-first">会议室楼层:</div>
          <div>
            <el-input v-model="meetingRoom.floor" placeholder=""
                      style="width: 260px" disabled></el-input>
          </div>
        </div>
        <div class="order-details-input">
          <div class="order-details-input-name">会议室容量:</div>
          <div>
            <el-input v-model="meetingRoom.capacity" placeholder=""
                      style="width: 260px" disabled></el-input>
          </div>
        </div>
        <div class="order-details-input">
          <div class="order-details-input-name">负责人:</div>
          <div>
            <el-input v-model="meetingRoom.user.name" placeholder=""
                      style="width: 260px" disabled></el-input>
          </div>
        </div>
      </div>
      <div class="order-details-select">

        <div class="order-details-input-name">会议室时间:</div>
        <div>
          <el-select v-model="day" placeholder="请选择" style="width: 260px" @change="getStatus(showData)">
            <el-option
                v-for="item in days"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="text-align: center">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="table-menu">
        <div class="table">
          <el-table
              :data="showData"
              border
              v-loading="loading"
              style="width: 100%">
            <el-table-column
                prop="times"
                label="会议室时间段"
                align="center">
            </el-table-column>
            <el-table-column
                label="会议室状态"
                align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.status === 0">可用</div>
                <div v-if="scope.row.status === 1">已被预约</div>
                <div v-if="scope.row.status === 3">停用</div>
              </template>
            </el-table-column>
            <el-table-column
                prop="user"
                label="操作人"
                align="center">
              <template slot-scope="scope">
                <div v-if="Object.keys(scope.row.user).length !== 0">
                  <el-tooltip effect="dark" placement="bottom"
                              :content="'邮箱: '+scope.row.user.email+' 手机号: '+scope.row.user.mobile">
                    <div>{{scope.row.user.name}}</div>
                  </el-tooltip>
                </div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column
                label="操作"
                align="center">
              <template slot-scope="scope">
                  <el-link type="primary" @click="openOrderMeetingModel(scope.row)">预约</el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="order-details-button">
        <div class="updateMeetingRoomInfo-button-left">
          <el-button type="primary" @click="closeOrderDetailsSelf">关闭</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "order_details_model",
  data(){
    return{
      loading: true,
      meetingRoom:{
        id: null,
        name: '',
        place: '',
        floor: null,
        capacity: null,
        remark: '',
        user: '',
      },
      day: '',
      days: [],
      showData: [],
    }
  },
  methods:{
    openOrderMeetingModel(row){
      if(row.status !== 0){
        this.$message.error('该时间段当前状态无法预约')
        return
      }
      let p ={
        meetingRoomId: this.meetingRoom.id,
        meetingRoomTimeId: row.id,
        date : this.day
      }
      this.$emit("openOrderMeetingModel",p)
    },
    getShowData(){
      this.loading = true
      this.$axios({
        method : "GET",
        url: "/helios/meeting/room/get_meeting_room_time?id=" + this.meetingRoom.id, //todo
      }).then(res=>{
        let data = res.data.data
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        for (let datum of data) {
          datum.time[0] = datum.time[0].substring(0,datum.time[0].lastIndexOf(":"))
          datum.time[1] = datum.time[1].substring(0,datum.time[1].lastIndexOf(":"))
          datum.times = datum.time[0] + ' ~ ' + datum.time[1]
        }
        this.getStatus(data)
      })
    },
    getStatus(list){
      this.loading = true
      this.$axios({
        method : "POST",
        url: "/helios/meeting/room/query_meeting_room_status", //todo
        data : {
          meetingRoomId: this.meetingRoom.id,
          date: this.day,
        }
      }).then(res=>{
        const data = res.data.data
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        for(let i = 0;i < list.length;i++){
          list[i].status = data[i].status
          list[i].user = data[i].user || {}
        }
        this.showData = list
        this.loading = false
      })
    },
    getDays(){
      var now = new Date().getTime();
      for (let i = 0;i < 7;i++){
        var time = new Date(now + 86400000 * i)
        this.days.push({value: time.getFullYear()+'-'+(time.getMonth() + 1) + '-' + time.getDate(),
          label: (time.getMonth() + 1) + '月' + time.getDate() + '日'})
      }
      this.day = this.days[0].value
    },
    closeOrderDetailsSelf(){
      this.$emit("closeOrderDetailsModel")
      this.clearData()
    },
    clearData(){
      this.meetingRoom.id = null
      this.meetingRoom.name = ''
      this.meetingRoom.address = ''
      this.meetingRoom.floor = null
      this.meetingRoom.capacity = null
      this.meetingRoom.remark = ''
      this.meetingRoom.user = ''
      this.day = ''
      this.days = []
      this.showData = []
    },
  },
}
</script>

<style src="../../assets/css/order_details_model.css" scoped/>
