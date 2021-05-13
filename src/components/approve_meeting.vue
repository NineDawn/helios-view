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
      showData: [
        // {
        //   id: 1,
        //   name: '日新401',
        //   address: '日新楼',
        //   floor: 4,
        //   user: {
        //     name: 'sb',
        //     email: '1354541534@qq.com',
        //     mobile: '14556875335',
        //   },
        //   day: '2021-05-01',
        //   times: '8:00 - 9:00',
        //   startTime: '8:00:00',
        //   endTime: '9:00:00',
        // }
      ],
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
      // let p = {
      //   pageSize: this.pageSize,
      //   pageNumber: this.currentPage,
      // }
      this.$axios({
        method : "POST",
        url: "/helios/meeting/application/query_application", //todo
        data : {
          status: 0
        }
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        // for (let one of data.meetingRoomTime) {
        //         one.time[0] = one.time[0].substring(0,one.time[0].lastIndexOf(":"))
        //         one.time[1] = one.time[1].substring(0,one.time[1].lastIndexOf(":"))
        //   }

        const date = [
                  {
          id:data[0].id,
          name: data[0].meetingRoom.name,
          address: data[0].meetingRoom.place,
          floor: data[0].meetingRoom.floor,
          user: data[0].applicant,
          day: data[0].date,
          times: data[0].meetingRoomTime.time[0]+ "-"+data[0].meetingRoomTime.time[1],
          startTime: data[0].meetingRoomTime.time[0],
          endTime: data[0].meetingRoomTime.time[1],
          title: data[0].title,
          meetingContent: data[0].meetingContent,
          users: data[0].users
        }
        ]
        this.showData = date //todo
        console.log(this.showData)
        // this.total = data.total
      })
    },
  },
  mounted(){
    this.currentPageButton()
  },
  components:{
    approveMeetingModel,
  },
}
</script>

<style src="../assets/css/approve_meeting.css" scoped/>