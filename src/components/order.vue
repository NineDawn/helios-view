<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.name" clearable
                  placeholder="按会议室名称搜索" style="width: 200px" @input="checkInput"></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.place" clearable
                  placeholder="按会议室地点搜索" style="width: 200px" @input="checkInput"></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.floor" clearable
                  placeholder="按会议室楼层搜索" style="width: 200px" @input="checkInput"></el-input>
      </div>
      <div class="search">
        <el-button icon="el-icon-search" type="primary" @click="searchButton">搜索</el-button>
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
              align="center"
              label="会议室名称"
              prop="name">
          </el-table-column>
          <el-table-column
              align="center"
              label="会议室地点"
              prop="place">
          </el-table-column>
          <el-table-column
              align="center"
              label="会议室楼层"
              prop="floor">
          </el-table-column>
          <el-table-column
              align="center"
              label="标签"
              prop="remark">
            <template v-if="scope.row.remark[0]!==''" slot-scope="scope">
              <el-tag
                  v-for="tag in scope.row.remark"
                  :key="tag"
                  :disable-transitions="false">
                {{ tag }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
              align="center"
              label="会议室状态">
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
              align="center"
              label="操作">
            <template slot-scope="scope">
              <el-link v-if="scope.row.status === 1" type="primary" @click="openOrderDetailsModel(scope.row)">查看详情
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="block">
      <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :pager-count="pageCount"
          :total="total"
          layout="prev, pager, next"
          @current-change="currentPageButton">
      </el-pagination>
    </div>
    <div style="position: absolute;z-index: 2;">
      <orderDetailsModel v-show="isOrderDetailsModelShow" ref="orderDetailsModel"
                         @openOrderMeetingModel="openOrderMeetingModel(arguments)"
                         v-on:closeOrderDetailsModel="closeOrderDetailsModel"/>
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
  data() {
    return {
      showData: [],
      searchParams: {
        name: '',
        place: '',
        floor: '',
      },
      lastSearchParams: {},
      total: 1,
      currentPage: 1,
      pageSize: 11,
      pageCount: 7,
      loading: true,
      isOrderDetailsModelShow: false,
      isOrderMeetingModelShow: false,
    }
  },
  methods: {
    openOrderMeetingModel(p) {
      this.isOrderMeetingModelShow = true
      console.log(p[0])
      this.$refs.orderMeetingModel.row = {...p[0]}
    },
    closeOrderMeetingModel() {
      this.isOrderMeetingModelShow = false
      this.$refs.orderDetailsModel.getShowData()
    },
    openOrderDetailsModel(meetingRoom) {
      this.$refs.orderDetailsModel.meetingRoom.id = meetingRoom.id
      this.$refs.orderDetailsModel.getShowData()
      this.$refs.orderDetailsModel.meetingRoom.name = meetingRoom.name
      this.$refs.orderDetailsModel.meetingRoom.code = meetingRoom.code
      this.$refs.orderDetailsModel.meetingRoom.place = meetingRoom.place
      this.$refs.orderDetailsModel.meetingRoom.floor = meetingRoom.floor
      this.$refs.orderDetailsModel.meetingRoom.capacity = meetingRoom.capacity
      this.$refs.orderDetailsModel.meetingRoom.user = {...meetingRoom.user}
      if (meetingRoom.remark !== '') {
        this.$refs.orderDetailsModel.meetingRoom.remark = meetingRoom.remark
      } else {
        this.$refs.orderDetailsModel.meetingRoom.remark = '无'
      }
      this.$refs.orderDetailsModel.getDays()
      this.isOrderDetailsModelShow = true
    },
    closeOrderDetailsModel() {
      this.isOrderDetailsModelShow = false
    },
    checkInput() {
      this.searchParams.name = this.searchParams.name.replace(/\s+/g, "")
      this.searchParams.place = this.searchParams.place.replace(/\s+/g, "")
      this.searchParams.floor = this.searchParams.floor.replace(/\s+/g, "")
    },
    searchButton() {
      this.loading = true
      let s = {}
      if (this.searchParams.name !== '') {
        s.name = this.searchParams.name
      }
      if (this.searchParams.place !== '') {
        s.place = this.searchParams.place
      }
      if (this.searchParams.floor !== '') {
        s.floor = this.searchParams.floor
      }
      let p = {
        ...s,
        pageSize: this.pageSize,
        pageNumber: 1,
      }
      this.$axios({
        method: "POST",
        url: "/helios/meeting/room/query_meeting_room_info",
        data: p
      }).then(res => {
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200) {
          this.$throw(new Error(res.data.msg))
          return
        }
        this.showData = data.meetingRoomList
        this.total = data.total
        this.currentPage = p.pageNumber
        this.lastSearchParams = s
      })
    },
    currentPageButton(page) {
      this.loading = true
      this.currentPage = page
      let p = {
        ...this.lastSearchParams,
        pageSize: this.pageSize,
        pageNumber: this.currentPage,
      }
      this.$axios({
        method: "POST",
        url: "/helios/meeting/room/query_meeting_room_info",
        data: p
      }).then(res => {
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200) {
          this.$throw(new Error(res.data.msg))
          return
        }
        this.showData = data.meetingRoomList
        this.total = data.total
      })
    },
    checkLogin() {
      if (localStorage.getItem("userInfo") == null) {
        this.$router.push('login')
      }
    }
  },
  mounted() {
    this.checkLogin()
    this.searchButton()
    localStorage.setItem("menuActiveName", "order")
  },
  components: {
    orderDetailsModel,
    orderMeetingModel,
  },
}
</script>

<style scoped src="../assets/css/order.css"/>


