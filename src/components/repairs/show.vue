<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input
          v-model="searchParams.name"
          placeholder="按会议室名称搜索"
          style="width: 200px"
          clearable
        ></el-input>
      </div>
      <div class="search">
        <el-input
          v-model="searchParams.code"
          placeholder="按会议室编号搜索"
          style="width: 200px"
          clearable
        ></el-input>
      </div>
      <div class="search">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="searchButton"
            >搜索</el-button
          >
        </div>
      </div>
    </div>
    <div class="table-menu">
      <div class="table">
        <el-table
          :data="meetingRoomData"
          border
          v-loading="loading"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            align="center"
            width="80"
          >
          </el-table-column>
          <el-table-column prop="roomName" label="会议室名称" align="center">
          </el-table-column>
          <el-table-column prop="roomCode" label="会议室编号" align="center">
          </el-table-column>
          <el-table-column prop="site" label="会议室地点" align="center">
          </el-table-column>
          <el-table-column label="会议室楼层" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.floor }}F</div>
            </template>
          </el-table-column>
          <el-table-column label="会议室负责人" align="center">
            <template slot-scope="scope">
              <div>
                <el-tooltip
                  effect="dark"
                  placement="bottom"
                  :content="
                    '邮箱: ' +
                    scope.row.chargeEmail +
                    ' 手机号: ' +
                    scope.row.chargeMobile
                  "
                >
                  <div>{{ scope.row.chargeName }}</div>
                </el-tooltip>
              </div>
              <!-- <div v-else>无</div> -->
            </template>
          </el-table-column>
          <el-table-column label="会议室状态" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 3">
                <el-tag type="danger">已拒绝</el-tag>
              </div>
              <div v-if="scope.row.status === 2">
                <el-tag type="success">处理完成</el-tag>
              </div>
              <div v-if="scope.row.status === 1">
                <el-tag>待处理</el-tag>
              </div>
              <div v-else-if="scope.row.status === 0">
                <el-tag type="warning">待审批</el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="block">
      <!-- <el-pagination
        :page-size="pageSize"
        :pager-count="pageCount"
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        @current-change="currentPageButton"
      >
      </el-pagination> -->
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchParams: {},
      meetingRoomData: [],
      indexMethod: 1,
      currentPage: 1,
      pageSize: 9,
      pageCount: 7,
      total: 1,
      centerDialogVisible:false,
      form:{

      }
    };
  },
  created(){
      this.searchButton()
  },
  methods: {
      onCancel(){
          this.centerDialogVisible = false
          this.form = {}
          this.searchButton()
      },
      onOpen(){
          this.centerDialogVisible = false
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
        url: "/helios/meeting/maintain/query_applicant_maintain",
        data : p
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          this.$throw(Error(res.data.msg))
          return
        }
        this.meetingRoomData = data
        for (let one of this.meetingRoomData){
          if (one.remark[0] === ''){
            one.remark = [];
          }
        }
        this.total = data.total
      })
    },
       
       checkInput(){
      this.searchParams.name = this.searchParams.name.replace(/\s+/g,"")
      this.searchParams.code = this.searchParams.code.replace(/\s+/g,"")
    },
// 查询列表以及列表初始化
    searchButton() {
      this.loading = true;
      let s = {};
      if (this.searchParams.name !== "") {
        s.roomName = this.searchParams.name;
      }
      if (this.searchParams.code !== "") {
        s.roomCode = this.searchParams.code;
      }
      let p = {
        ...s,
        pageSize: this.pageSize,
        pageNumber: 1,
      };
      this.$axios({
        method: "POST",
        url: "/helios/meeting/maintain/query_applicant_maintain",
        data: p,
      }).then((res) => {
        this.loading = false;
        const data = res.data.data;
        if (res.data.code !== 200) {
          this.$throw(new Error(res.data.msg));
          return;
        }
        this.meetingRoomData = data;
        for (let one of this.meetingRoomData) {
          if (one.remark[0] === "") {
            one.remark = [];
          }
        }
        this.total = data.total;
        this.currentPage = p.pageNumber;
        this.lastSearchParams = s;
      });
    },
// 报修按钮方法
    openUpdateMeetingRoomInfoModel(row){
        this.centerDialogVisible = true
        this.form = row
    }
  },
};
</script>
<style lang="less">
</style>
<style src="../../assets/css/meeting_room_info_manager.css" scoped/>