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
        <el-input
          v-model="searchParams.place"
          placeholder="按会议室地点搜索"
          style="width: 200px"
          clearable
        ></el-input>
      </div>
      <div class="search">
        <el-input
          v-model="searchParams.floor"
          placeholder="按会议室楼层搜索"
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
          <el-table-column prop="name" label="会议室名称" align="center">
          </el-table-column>
          <el-table-column prop="code" label="会议室编号" align="center">
          </el-table-column>
          <el-table-column prop="place" label="会议室地点" align="center">
          </el-table-column>
          <el-table-column label="会议室楼层" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.floor }}F</div>
            </template>
          </el-table-column>
          <el-table-column label="会议室负责人" align="center">
            <template slot-scope="scope">
              <div v-if="Object.keys(scope.row.user).length !== 0">
                <el-tooltip
                  effect="dark"
                  placement="bottom"
                  :content="
                    '邮箱: ' +
                    scope.row.user.email +
                    ' 手机号: ' +
                    scope.row.user.mobile
                  "
                >
                  <div>{{ scope.row.user.name }}</div>
                </el-tooltip>
              </div>
              <div v-else>无</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="100">
            <template slot-scope="scope">
              <div class="link-layout">
                <el-link
                  type="primary"
                  @click="openUpdateMeetingRoomInfoModel(scope.row)"
                  >报修</el-link>
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
    <el-dialog
  title="报修原因"
  :visible.sync="centerDialogVisible"
  width="30%"
  :append-to-body="true"
  :close-on-click-modal="false"
  center>
  <div>
      <el-form :model="form">
    <el-form-item >
        <el-col :span="8">
    <el-input type="textarea" v-model="form.content" style="width:300%"></el-input>
        </el-col>
  </el-form-item>
      </el-form>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="onCancel">取 消</el-button>
    <el-button type="primary" @click="onOpen">确 定</el-button>
  </span>
</el-dialog>
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
        console.log(this.form)
        const p = {
          roomName:this.form.name,
          roomCode:this.form.code,
          floor:this.form.floor,
          site:this.form.place,
          chargeName:this.form.user.name,
          chargeEmail:this.form.user.email,
          chargeMobile:this.form.user.mobile,
          content:this.form.content,
        }
        this.$axios({
        method: "POST",
        url: "/helios/meeting/maintain/submit_applicant_maintain",
        data: p,
      }).then((res) => {
        this.loading = false;
        if (res.data.code !== 200) {
          this.$throw(new Error(res.data.msg));
          return;
        }
        this.$message.success("报修成功")
        this.centerDialogVisible = false
      });
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
          this.$throw(Error(res.data.msg))
          return
        }
        this.meetingRoomData = data.meetingRoomList
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
      this.searchParams.place = this.searchParams.place.replace(/\s+/g,"")
      this.searchParams.floor = this.searchParams.floor.replace(/\s+/g,"")
    },
// 查询列表以及列表初始化
    searchButton() {
      this.loading = true;
      let s = {};
      if (this.searchParams.name !== "") {
        s.name = this.searchParams.name;
      }
      if (this.searchParams.code !== "") {
        s.code = this.searchParams.code;
      }
      if (this.searchParams.place !== "") {
        s.place = this.searchParams.place;
      }
      if (this.searchParams.floor !== "") {
        s.floor = this.searchParams.floor;
      }
      let p = {
        ...s,
        pageSize: this.pageSize,
        pageNumber: 1,
      };
      this.$axios({
        method: "POST",
        url: "/helios/meeting/room/query_meeting_room_info",
        data: p,
      }).then((res) => {
        this.loading = false;
        const data = res.data.data;
        if (res.data.code !== 200) {
          this.$throw(new Error(res.data.msg));
          return;
        }
        this.meetingRoomData = data.meetingRoomList;
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