<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按会议室名称搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.code" placeholder="按会议室编号搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-select v-model="searchParams.day" placeholder="请选择">
          <el-option
              v-for="item in days"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="searchButton">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="table-menu">
      <div class="table">
        <el-table
            v-loading="loading"
            :data="meetingRoomData"
            border
            style="width: 100%">
          <el-table-column
              prop="id"
              label="ID"
              align="center">
          </el-table-column>
          <el-table-column
              prop="name"
              label="会议室名称"
              align="center">
          </el-table-column>
          <el-table-column
              prop="code"
              label="会议室编号"
              align="center">
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <div class="link-layout">
                <el-link type="primary" @click="openUpdateMeetingRoomStatusModel(scope.row.id)">修改</el-link>
              </div>
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
      <updateMeetingRoomStatusModel ref="updateMeetingRoomStatusModel"
                                    v-show="isUpdateMeetingRoomStatusModelShow"
                                    v-on:closeUpdateMeetingRoomStatus="closeUpdateMeetingRoomStatusModel"/>
    </div>
  </div>
</template>

<script>
import updateMeetingRoomStatusModel from "@/components/model/update_meeting_room_status_model";

export default {
  name: "meeting_room_status_manager",
  data() {
    return {
      searchParams: {
        name: '',
        code: '',
        day: null,
      },
      days: [],
      meetingRoomData: [],
      currentPage: 1,
      pageSize: 11,
      pageCount: 7,
      total: 1,
      lastSearchParams: {},
      loading: false,
      isUpdateMeetingRoomStatusModelShow: false,
    }
  },
  methods: {
    openUpdateMeetingRoomStatusModel(id) {
      this.$refs.updateMeetingRoomStatusModel.getShowData(id,this.searchParams.day)
      this.isUpdateMeetingRoomStatusModelShow = true
    },
    closeUpdateMeetingRoomStatusModel() {
      this.isUpdateMeetingRoomStatusModelShow = false
    },
    checkInput() {
      this.searchParams.name = this.searchParams.name.replace(/\s+/g, "")
      this.searchParams.code = this.searchParams.code.replace(/\s+/g, "")
    },
    getDays() {
      var now = new Date().getTime();
      for (let i = 0;i < 7;i++){
        var time = new Date(now + 86400000 * i)
        this.days.push({value: time.getFullYear()+'-'+(time.getMonth() + 1) + '-' + time.getDate(),
          label: (time.getMonth() + 1) + '月' + time.getDate() + '日'})
      }
      this.searchParams.day = this.days[0].value
      this.searchButton()
    },
    searchButton() {
      this.loading = true
      let s = {}
      if (this.searchParams.name !== '') {
        s.name = this.searchParams.name
      }
      if (this.searchParams.code !== '') {
        s.code = this.searchParams.code
      }
      s.day = this.searchParams.day
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
        this.meetingRoomData = data.meetingRoomList
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
        this.meetingRoomData = data.meetingRoomList
        this.total = data.total
      })
    },
  },
  mounted() {
    this.getDays()
    localStorage.setItem("menuActiveName","meetingRoomStatusManager")
  },
  components: {
    updateMeetingRoomStatusModel,
  },
}
</script>

<style src="../assets/css/meeting_room_status_manager.css" scoped/>
