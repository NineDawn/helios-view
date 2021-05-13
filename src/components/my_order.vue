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
        <el-select v-model="searchParams.status" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
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
  </div>
</template>

<script>
export default {
name: "my_order",
  data(){
    return{
      showData: [],
      options: [
        {
          value: 4,
          label: '查看全部'
        },
        {
          value: 0,
          label: '待审核'
        },
        {
          value: 1,
          label: '已通过'
        },
        {
          value: 2,
          label: '被拒绝'
        },
      ],
      searchParams: {
        name: '',
        title: '',
        status: 4,
      },
      lastSearchParams: {},
      total: 1,
      currentPage: 1,
      pageSize: 11,
      pageCount: 7,
      loading: false,
    }
  },
  methods:{
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
      if(this.searchParams.status !== 4){
        s.status = this.searchParams.status
      }
      let p = {
        ...s,
        pageSize: this.pageSize,
        pageNumber: 1,
      }
      this.$axios({
        method : "POST",
        url: "/helios/meeting/application/user_query_application",
        data : p
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
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
        url: "/helios/meeting/application/user_query_application",
        data : p
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.showData = data.meetingRoomList
        this.total = data.total
      })
    },
  },
  mounted(){
    this.searchButton()
  },
}
</script>

<style src="../assets/css/my_order.css" scoped/>
