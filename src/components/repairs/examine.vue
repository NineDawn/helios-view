<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input
          v-model="searchParams.roomName"
          placeholder="按会议室名称搜索"
          style="width: 200px"
          clearable
        ></el-input>
      </div>
      <div class="search">
        <el-input
          v-model="searchParams.roomCode"
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
          <el-table-column label="操作" align="center" min-width="100">
            <template slot-scope="scope">
              <div class="link-layout" v-if="scope.row.status === 1">
                <el-link
                  type="primary"
                  @click="processing(scope.row)"
                  >处理完成</el-link>
              </div>
              <div class="link-layout" v-else>
                <el-link
                  type="primary"
                  @click="onsuccess(scope.row)"
                  >同意</el-link>
                  <el-link
                  type="primary"
                  @click="unsuccess(scope.row)"
                  >不同意</el-link>
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
  width="35%"
  label-width="10%"
  :append-to-body="true"
  :close-on-click-modal="false"
  center>
  <div>
      <el-form :model="form">
            <el-form-item prop="checkRadio">
       <el-radio-group v-model="form.checkRadio">
    <el-radio :label="1">影响正常使用</el-radio>
    <el-radio :label="2">不影响正常使用</el-radio>
  </el-radio-group>
    </el-form-item>
  <el-form-item label="预计可用时间" v-if="form.checkRadio === 1">
    <el-col :span="8">
         <el-date-picker
      v-model="form.estimateTime"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
      style="width:300px">
    </el-date-picker>
   </el-col>
  </el-form-item>
      </el-form>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="onCancel">取 消</el-button>
    <el-button type="primary" @click="onOpen">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="是否确认"
  :visible.sync="flag"
  width="35%"
  label-width="10%"
  :append-to-body="true"
  :close-on-click-modal="false">
  <div>
    确认处理完成？
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="open">确 定</el-button>
  </span>
</el-dialog>
    <el-dialog
  title="拒绝原因"
  :visible.sync="showFlag"
  width="35%"
  label-width="10%"
  :append-to-body="true"
  :close-on-click-modal="false"
  center>
  <div>
      <!-- <el-form :model="formEd">
    <el-form-item >
        <el-col :span="8">
    <el-input type="textarea" v-model="formEd.name" style="width:300%"></el-input>
        </el-col>
  </el-form-item>
      </el-form> -->
      是否拒绝该会议室报修申请？
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="onCancelEd">取 消</el-button>
    <el-button type="primary" @click="onOpenEd">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>
<script>
export default {
  data() {
    return {
      flag:false,
      searchParams: {},
      meetingRoomData: [],
      indexMethod: 1,
      currentPage: 1,
      pageSize: 9,
      pageCount: 7,
      total: 1,
      showFlag:false,
      centerDialogVisible:false,
      form:{

      },
      formEd:{

      },
      formUp:{}
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
        const p = {
          applicationCode:this.form.applicationCode,
          estimateTime:this.form.estimateTime,
          roomCode:this.form.roomCode
        }
               this.$axios({
        method : "POST",
        url: "/helios/meeting/maintain/accepted_charge_maintain",
        data : p
      }).then(res=>{
        this.loading = false
        if (res.data.code !== 200){
          this.$throw(Error(res.data.msg))
          return
        }
        this.centerDialogVisible = false
        this.searchButton()
      })
      },
      onCancelEd(){
          this.showFlag = false
          this.formEd = {}
          this.searchButton()
      },
      onOpenEd(){
        const p = {
        applicationCode:this.formEd.applicationCode
      }
           this.$axios({
        method: "POST",
        url: "/helios/meeting/maintain/rejected_charge_maintain",
        data: p,
      }).then((res) => {
        if (res.data.code !== 200) {
          this.$throw(new Error(res.data.msg));
          return;
        }
        this.showFlag = false
        this.searchButton()
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
        url: "/helios/meeting/maintain/query_charge_maintain",
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
      if (this.searchParams.roomName !== "") {
        s.roomName = this.searchParams.roomName;
      }
      if (this.searchParams.roomCode !== "") {
        s.roomCode = this.searchParams.roomCode;
      }
      console.log(s)
      let p = {
        ...s,
        pageSize: this.pageSize,
        pageNumber: 1,
      };
      this.$axios({
        method: "POST",
        url: "/helios/meeting/maintain/query_charge_maintain",
        data: p,
      }).then((res) => {
        console.log(res.data)
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
// 同意按钮方法
    onsuccess(row){
        this.centerDialogVisible = true
        this.form = row
        // this.form.estimateTime = ''
    },
  unsuccess(row){
        this.showFlag = true
        this.formEd = row
    },
    processing(row){
        // finished_charge_maintain
        this.flag = true
        this.formUp = row
        console.log(this.formUp)
    },
    open(){
      const p = {
        applicationCode:this.formUp.applicationCode
      }
           this.$axios({
        method: "POST",
        url: "/helios/meeting/maintain/finished_charge_maintain",
        data: p,
      }).then((res) => {
        if (res.data.code !== 200) {
          this.$throw(new Error(res.data.msg));
          return;
        }
        this.flag = false
        this.searchButton()
      });
    },
    cancel(){
      this.flag = false
      this.searchButton()
    }
  },
};
</script>
<style lang="less">
</style>
<style src="../../assets/css/meeting_room_info_manager.css" scoped/>
