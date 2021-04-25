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
        <el-input v-model="searchParams.place" placeholder="按会议室地点搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.floor" placeholder="按会议室楼层搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="searchButton">搜索</el-button>
        </div>
        <div class="search-button">
          <el-button type="success" icon="el-icon-plus" @click="openAddMeetingRoomModel">新增</el-button>
        </div>
      </div>
    </div>
    <div class="table-menu">
      <div class="table">
        <el-table
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
              prop="place"
              label="会议室地点"
              align="center">
          </el-table-column>
          <el-table-column
              label="会议室楼层"
              align="center">
            <template slot-scope="scope">
                  <div>{{scope.row.floor}}F</div>
            </template>
          </el-table-column>
          <el-table-column
              label="会议室负责人"
              align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.user !== null">
                <el-tooltip effect="dark" placement="bottom"
                            :content="'邮箱: '+scope.row.user.email+' 手机号: '+scope.row.user.mobile">
                  <div>{{scope.row.user.name}}</div>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              label="会议室状态"
              align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 1">
                <el-tag type="success">可用</el-tag>
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
              <div class="link-layout">
                <el-link type="primary" @click="openUpdateMeetingRoomInfoModel(scope.row)">修改信息</el-link>
                <el-link type="primary" @click="clickDeleteMeetingRoom(scope.row.id)">删除</el-link>
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
      <updateMeetingRoomInfoModel ref="updateMeetingRoomInfoModel"
                                  v-show="isUpdateMeetingRoomInfoModelShow"
                                  v-on:closeUpdateMeetingRoomInfo="closeUpdateMeetingRoomInfoModel"/>
    </div>
    <div style="position: absolute;z-index: 2;">
      <addMeetingRoomModel v-show="isAddMeetingRoomModel"
                           v-on:closeAddMeetingRoom="closeAddMeetingRoomModel"/>
    </div>
  </div>
</template>

<script>
import updateMeetingRoomInfoModel from "@/components/model/update_meeting_room_info_model";
import addMeetingRoomModel from "@/components/model/add_meeting_room_model";

export default {
name: "meeting_room_info_manager",
  data(){
    return{
      searchParams: {
        name: '',
        code: '',
        place: '',
        floor: '',
      },
      loading: true,
      meetingRoomData: [
        {
          id: 1,
          name: 'sb',
          code: '13213',
          place: 'adasd',
          floor: 1,
          status: 1,
          user: {
            id: 1,
            name: 'zyh',
            email: 'sadasdasda@qq.com',
            mobile: '21311132133',
          },
        }
      ],
      currentPage: 1,
      pageSize: 9,
      pageCount: 7,
      total: 1,
      lastSearchParams: {},
      isUpdateMeetingRoomInfoModelShow: false,
      isAddMeetingRoomModel: false,
    }
  },
  methods:{
    openUpdateMeetingRoomInfoModel(meetingRoom){
      this.$refs.updateMeetingRoomInfoModel.meetingRoom = {...meetingRoom}
      this.$refs.updateMeetingRoomInfoModel.meetingRoom.status =
          this.$refs.updateMeetingRoomInfoModel.meetingRoom.status + ""
      if(meetingRoom.user !== null){
        let p = {
          id: meetingRoom.user.id,
          label: meetingRoom.user.name + ' (邮箱:' + meetingRoom.user.email + ')',
        }
        this.$refs.updateMeetingRoomInfoModel.usersShow.push(p)
        this.$refs.updateMeetingRoomInfoModel.user = 1

      }
      this.isUpdateMeetingRoomInfoModelShow = true
    },
    closeUpdateMeetingRoomInfoModel(){
      this.isUpdateMeetingRoomInfoModelShow = false
    },
    checkInput(){
      this.searchParams.name = this.searchParams.name.replace(/\s+/g,"")
      this.searchParams.code = this.searchParams.code.replace(/\s+/g,"")
      this.searchParams.place = this.searchParams.place.replace(/\s+/g,"")
      this.searchParams.floor = this.searchParams.floor.replace(/\s+/g,"")
    },
    searchButton(){
      this.loading = true
      let s = {}
      if(this.searchParams.name !== ''){
        s.name = this.searchParams.name
      }
      if(this.searchParams.code !== ''){
        s.code = this.searchParams.code
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
        url: "/helios/meeting/meeting_room/query_userInfo",//todo
        data : p
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.meetingRoomData = data.meetingRoomList
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
        url: "/helios/meeting/meeting_room/query_userInfo",
        data : p
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.meetingRoomData = data.meetingRoomList
        this.total = data.total
      })
    },

  },
  mounted(){
    this.searchButton()
  },
  components: {
    updateMeetingRoomInfoModel,
    addMeetingRoomModel,
  },
}
</script>

<style src="../assets/css/meeting_room_info_manager.css" scoped/>
