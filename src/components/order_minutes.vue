<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.title" placeholder="按会议名称搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按会议室名称搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="table-menu">
      <div class="table">
        <el-table
            :data="showData"
            border
            style="width: 100%">
          <el-table-column
              prop="title"
              label="会议名称"
              align="center">
          </el-table-column>
          <el-table-column
              label="会议室名称"
              align="center">
            <template slot-scope="scope">
              <div>
                <el-tooltip effect="dark" placement="bottom"
                            :content="'地点: '+scope.row.place+' 楼层: '+scope.row.floor+'F'">
                  <div>{{scope.row.name}}</div>
                </el-tooltip>
              </div>
            </template>
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
              label="日期"
              align="center">
            <template slot-scope="scope">
              <div>
                <el-tooltip effect="dark" placement="bottom"
                            :content="'时间: '+scope.row.times">
                  <div>{{scope.row.day}}</div>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              label="审批人"
              align="center">
            <template slot-scope="scope">
              <div>
                <el-tooltip effect="dark" placement="bottom"
                            :content="'邮箱: '+scope.row.operator.email+' 手机号: '+scope.row.operator.mobile">
                  <div>{{scope.row.operator.name}}</div>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click="openOrderMinutesModel(scope.row.id)">查看详情</el-link>
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
      <orderMinutesModel v-show="isOrderMinutesModelShow" ref="orderMinutesModel"
                         v-on:closeOrderMinutesModel="closeOrderMinutesModel"/>
    </div>
  </div>
</template>

<script>
import orderMinutesModel from "@/components/model/order_minutes_model";

export default {
name: "order_minutes",
  data(){
    return{
      showData: [
        {
          id: 1,
          title: '1',
          name: '日新401',
          place: '日新',
          floor: 4,
          user: {
            name: 'sb',
            email: '15314345135@qq.com',
            mobile: '15354584355',
          },
          operator: {
            name: '郑云鹤',
            email: '15314345135@qq.com',
            mobile: '15354584355',
          },
          day: '2021-05-01',
          times: '8:00 - 9:00',
          startTime: '8:00:00',
          endTime: '9:00:00',
        }
      ],
      searchParams: {
        title: '',
        name: '',
      },
      lastSearchParams: {},
      total: 1,
      currentPage: 1,
      pageSize: 11,
      pageCount: 7,
      loading: false,
      isOrderMinutesModelShow: false,
    }
  },
  methods:{
    openOrderMinutesModel(id){
      this.$refs.orderMinutesModel.getShowData(id)
      this.isOrderMinutesModelShow = true
    },
    closeOrderMinutesModel(){
      this.isOrderMinutesModelShow = false
    },
    checkInput(){
      this.searchParams.title = this.searchParams.title.replace(/\s+/g,"")
      this.searchParams.name = this.searchParams.name.replace(/\s+/g,"")
    },
    searchButton(){
      this.loading = true
      let s = {}
      if(this.searchParams.title !== ''){
        s.title = this.searchParams.title
      }
      if(this.searchParams.name !== ''){
        s.name = this.searchParams.name
      }
      let p = {
        ...s,
        pageSize: this.pageSize,
        pageNumber: 1,
      }
      this.$axios({
        method : "POST",
        url: "/helios/meeting/room/search_meeting_room", //todo
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
        url: "/helios/meeting/room/search_meeting_room", //todo
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
  },
  components: {
    orderMinutesModel
  },
}
</script>

<style src="../assets/css/order_minutes.css" scoped/>
