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
            <el-input v-model="meetingRoom.address" placeholder=""
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
          <div class="order-details-input-name">会议室备注:</div>
          <div>
            <el-input v-model="meetingRoom.remark" placeholder=""
                      style="width: 260px" disabled></el-input>
          </div>
        </div>
      </div>
      <div class="order-details-select">
        <div class="order-details-input">
          <div class="order-details-input-name-first">负责人:</div>
          <div>
            <el-input v-model="meetingRoom.user" placeholder=""
                      style="width: 260px" disabled></el-input>
          </div>
        </div>
        <div class="order-details-input-name">会议室时间:</div>
        <div>
          <el-select v-model="day" placeholder="请选择" style="width: 260px">
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
                <div v-if="scope.row.status === 1">可用</div>
                <div v-if="scope.row.status === 2">已被预约</div>
                <div v-if="scope.row.status === 4">停用</div>
              </template>
            </el-table-column>
            <el-table-column
                prop="user"
                label="会议室预约人"
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
      loading: false,
      meetingRoom:{
        id: null,
        name: '',
        address: '',
        floor: null,
        capacity: null,
        remark: '',
        user: '',
      },
      day: '',
      days: [],
      showData: [
        {
          times: '8:00 - 9:00',
          startTime: '8:00:00',
          endTime: '9:00:00',
          status: 1,
          user: {
            name: 'sb',
            email: '1651313131@qq.com',
            mobile: '15555555555',
          }
        }
      ],
    }
  },
  methods:{
    openOrderMeetingModel(meetingRoom){
      if(meetingRoom.status !== 1){
        this.$message.error('该时间段目前无法预约')
        return
      }
      this.$emit("openOrderMeetingModel")
    },
    getShowData(){
      this.loading = true
      this.$axios({
        method : "POST",
        url: "/helios/meeting/room/get_meeting_room_time", //todo
        data : {
          id: this.meetingRoom.id,
          date: this.day,
        }
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.showData = data.userList //todo
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
    },
  },
}
</script>

<style src="../../assets/css/order_details_model.css" scoped/>
