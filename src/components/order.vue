<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按会议室名称搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.place" placeholder="按会议室地点搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.floor" placeholder="按会议室楼层搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-button type="primary" icon="el-icon-search" @click="searchButton">搜索</el-button>
      </div>
    </div>
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
              prop="place"
              label="会议室地点"
              align="center">
          </el-table-column>
          <el-table-column
              prop="floor"
              label="会议室楼层"
              align="center">
          </el-table-column>
          <el-table-column
              label="会议室状态"
              align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 1">
                <el-tag type="success">正常</el-tag>
              </div>
              <div v-else-if="scope.row.status === 0">
                <el-tag type="danger">禁用</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <el-link v-if="scope.row.status === 1" type="primary" @click="openOrderDetailsModel(scope.row)">查看详情</el-link>
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
      <orderDetailsModel v-show="isOrderDetailsModelShow" ref="orderDetailsModel"
                             v-on:closeOrderDetailsModel="closeOrderDetailsModel"
                             @openOrderMeetingModel="openOrderMeetingModel(arguments)"/>
    </div>
    <div style="position: absolute;z-index: 3;">
      <orderMeetingModel v-show="isOrderMeetingModelShow" ref="orderMeetingModel"
                         v-on:closeOrderMeetingModel="closeOrderMeetingModel"/>
    </div>
  </div>
</template>

<script>
import orderDetailsModel from "@/components/model/order_details_model";
import orderMeetingModel from "@/components/model/order-meeting-model"

export default {
name: "order",
  data(){
    return{
      showData: [],
      searchParams:{
        name: '',
        place: '',
        floor: '',
      },
      lastSearchParams: {},
      total: 1,
      currentPage: 1,
      pageSize: 11,
      pageCount: 7,
      loading: false,
      isOrderDetailsModelShow: false,
      isOrderMeetingModelShow: false,
    }
  },
  methods:{
    openOrderMeetingModel(p){
      this.isOrderMeetingModelShow = true
      console.log(p[0])
      this.$refs.orderMeetingModel.row = {...p[0]}
    },
    closeOrderMeetingModel(){
      this.isOrderMeetingModelShow = false
    },
    openOrderDetailsModel(meetingRoom){
      this.$refs.orderDetailsModel.meetingRoom.id = meetingRoom.id
      this.$refs.orderDetailsModel.getShowData()
      this.$refs.orderDetailsModel.meetingRoom.name = meetingRoom.name
      this.$refs.orderDetailsModel.meetingRoom.code = meetingRoom.code
      this.$refs.orderDetailsModel.meetingRoom.place = meetingRoom.place
      this.$refs.orderDetailsModel.meetingRoom.floor = meetingRoom.floor
      this.$refs.orderDetailsModel.meetingRoom.capacity = meetingRoom.capacity
      this.$refs.orderDetailsModel.meetingRoom.user = {...meetingRoom.user}
      if(meetingRoom.remark !== ''){
        this.$refs.orderDetailsModel.meetingRoom.remark = meetingRoom.remark
      }
      else{
        this.$refs.orderDetailsModel.meetingRoom.remark = '无'
      }
      this.$refs.orderDetailsModel.getDays()
      this.isOrderDetailsModelShow = true
    },
    closeOrderDetailsModel(){
      this.isOrderDetailsModelShow = false
    },
    checkInput(){
      this.searchParams.name = this.searchParams.name.replace(/\s+/g,"")
      this.searchParams.place = this.searchParams.place.replace(/\s+/g,"")
      this.searchParams.floor = this.searchParams.floor.replace(/\s+/g,"")
    },
    searchButton(){
      this.loading = true
      let s = {}
      if(this.searchParams.name !== ''){
        s.name = this.searchParams.name
      }
      if(this.searchParams.place !== ''){
        s.place = this.searchParams.place
      }
      if(this.searchParams.floor !== ''){
        s.floor = this.searchParams.floor
      }
      let p = {
        ...s,
        pageSize: this.pageSize,
        pageNumber: 1,
      }
      this.$axios({
        method : "POST",
        url: "/helios/meeting/room/query_meeting_room_info",
        data : p
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.showData = data.meetingRoomList
        this.total = data.total
        this.currentPage = p.pageNumber
        this.lastSearchParams = s
      })
    },
    currentPageButton(page){
      this.loading = true
      this.currentPage = page
      let p = {
        ...this.lastSearchParams,
        pageSize: this.pageSize,
        pageNumber: this.currentPage,
      }
      this.$axios({
        method : "POST",
        url: "/helios/meeting/room/query_meeting_room_info",
        data : p
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.showData = data.meetingRoomList
        this.total = data.total
      })
    },
    checkLogin(){
      if(localStorage.getItem("userInfo") == null){
        this.$router.push('login')//todo
      }
    }
  },
  mounted(){
    // this.checkLogin()
    this.searchButton()
    localStorage.setItem("menuActiveName","order")
  },
  components: {
    orderDetailsModel,
    orderMeetingModel,
  },
}
</script>

<style src="../assets/css/order.css" scoped/>


