<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="order-details-">
        <div class="updateMeetingRoomInfo-input">
          <div class="updateMeetingRoomInfo-input-name">会议室名称:</div>
          <div>
            <el-input v-model="meetingRoom.name" placeholder="请输入会议室名称"
                      style="width: 260px" disabled></el-input>
          </div>
        </div>
        <div class="updateMeetingRoomInfo-input">
          <div class="updateMeetingRoomInfo-input-name">会议室编号:</div>
          <div>
            <el-input v-model="meetingRoom.code" placeholder="请输入会议室编号"
                      style="width: 260px" disabled></el-input>
          </div>
        </div>
        <div class="updateMeetingRoomInfo-input">
          <div class="updateMeetingRoomInfo-input-name">会议室地点:</div>
          <div>
            <el-input v-model="meetingRoom.address" placeholder="请输入会议室地点"
                      style="width: 260px" disabled></el-input>
          </div>
        </div>
      </div>
      <div class="updateMeetingRoomInfo-input-first">
        <div class="updateMeetingRoomInfo-input-name">会议室名称:</div>
        <div>
          <el-input v-model="meetingRoom.name" placeholder="请输入会议室名称"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="updateMeetingRoomInfo-input">
        <div class="updateMeetingRoomInfo-input-name">会议室编号:</div>
        <div>
          <el-input v-model="meetingRoom.code" placeholder="请输入会议室编号"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="updateMeetingRoomInfo-input">
        <div class="updateMeetingRoomInfo-input-name">会议室地点:</div>
        <div>
          <el-input v-model="meetingRoom.address" placeholder="请输入会议室地点"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="updateMeetingRoomInfo-input">
        <div class="updateMeetingRoomInfo-input-name">会议室楼层:</div>
        <div>
          <el-input v-model="meetingRoom.floor" placeholder="请输入会议室楼层"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="updateMeetingRoomInfo-input">
        <div class="updateMeetingRoomInfo-input-name">会议室容量:</div>
        <div>
          <el-input v-model="meetingRoom.capacity" placeholder="请输入会议室容量"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="updateMeetingRoomInfo-input">
        <div class="updateMeetingRoomInfo-input-name">会议室备注:</div>
        <div>
          <el-input v-model="meetingRoom.remark" placeholder="请输入会议室备注"
                    style="width: 260px" disabled></el-input>
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
      meetingRoom:{
        id: null,
        name: '',
        address: '',
        floor: null,
        capacity: null,
        remark: '',
      },
    }
  },
  methods:{

  },
}
</script>

<style src="../../assets/css/order_details_model.css" scoped/>
