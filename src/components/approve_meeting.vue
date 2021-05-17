<template>
  <div>
    <div class="table-menu">
      <div class="table">
        <el-table
            :data="showData"
            border
            style="width: 100%">
          <el-table-column
              prop="name"
              label="会议室名称"
              align="center">
          </el-table-column>
          <el-table-column
              prop="address"
              label="会议室地点"
              align="center">
          </el-table-column>
          <el-table-column
              prop="floor"
              label="会议室楼层"
              align="center">
          </el-table-column>
          <el-table-column
              label="申请人"
              align="center">
            <template slot-scope="scope">
              <div>
                <el-tooltip effect="dark" placement="bottom"
                            :content="'邮箱: '+scope.row.user.email+' 手机号: '+scope.row.user.mobile">
                  <div>{{scope.row.user.name}}</div>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="day"
              label="申请使用日期"
              align="center">
          </el-table-column>
          <el-table-column
              prop="times"
              label="申请使用时间段"
              align="center">
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click="openApproveMeetingModel(scope.row)">审批</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="block">
      <el-pagination
          :page-size="pageSize"
          :pager-count="pageCount"
          layout="prev, pager, next"
          :total="total"
          :current-page="currentPage"
          @current-change="currentPageButton">
      </el-pagination>
    </div>
    <div style="position: absolute;z-index: 2;">
      <approveMeetingModel v-show="isApproveMeetingModelShow" ref="approveMeetingModel"
                         v-on:closeApproveMeetingModel="closeApproveMeetingModel"/>
    </div>
  </div>
</template>

<script>
import approveMeetingModel from "@/components/model/approve_meeting_model"

export default {
name: "approve_meeting",
  data(){
    return{
      showData: [],
      total: 1,
      currentPage: 1,
      pageSize: 12,
      pageCount: 7,
      loading: false,
      isApproveMeetingModelShow: false,
    }
  },
  methods:{
    openApproveMeetingModel(row){
      this.$refs.approveMeetingModel.meetingRoom = {
        ...row
      }
      this.isApproveMeetingModelShow = true

    },
    closeApproveMeetingModel(){
      this.isApproveMeetingModelShow = false
    },
    currentPageButton(page){
      this.loading = true
      this.currentPage = page
       let p = {
        /* pageSize: this.pageSize,
         pageNumber: this.currentPage,*/
         status: 0
      }
      this.$axios({
        method : "POST",
        url: "/helios/meeting/application/query_application", //todo
        data : p
      }).then(res=>{
        this.loading = false
        let data = res.data.data
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }

        for (let one of data) {
          one.name = one.meetingRoom.name;
          one.address = one.meetingRoom.place;
          one.floor = one.meetingRoom.floor;
          one.user = one.applicant;
          one.day = one.date;
          one.meetingRoomTime.time[0] = one.meetingRoomTime.time[0].substring(0,one.meetingRoomTime.time[0].lastIndexOf(":"))
          one.meetingRoomTime.time[1] = one.meetingRoomTime.time[1].substring(0,one.meetingRoomTime.time[1].lastIndexOf(":"))
          one.times = one.meetingRoomTime.time[0]+ "-"+ one.meetingRoomTime.time[1];
        }

        this.showData = data //todo
        // this.total = data.total
      })
    },
  },
  mounted(){
    this.currentPageButton()
    localStorage.setItem("menuActiveName","approveMeeting")
  },
  components:{
    approveMeetingModel,
  },
}
</script>

<style src="../assets/css/approve_meeting.css" scoped/>
