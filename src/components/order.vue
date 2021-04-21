<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchMeetingRoom.name" placeholder="按会议室名称搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchMeetingRoom.address" placeholder="按会议室地点搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchMeetingRoom.floor" placeholder="按会议室楼层搜索"
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
              prop="meetingRoomName"
              label="会议室名称"
              sortable
              width="300px"
              align="center">
          </el-table-column>
          <el-table-column
              prop="meetingRoomAddress"
              label="会议室地点"
              sortable
              width="400px"
              align="center">
          </el-table-column>
          <el-table-column
              prop="meetingRoomFloor"
              label="会议室楼层"
              sortable
              width="300px"
              align="center">
          </el-table-column>
          <el-table-column
              label="操作"
              width="100px"
              align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click="getDetails(scope.row.id)">查看详情</el-link>
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
          :total="page.total"
          :current-page="currentPage"
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
name: "order",
  data(){
    return{
      showData: [{
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '1',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '2',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        meetingRoomName: '2016-05-01',
        meetingRoomAddress: '3',
        meetingRoomFloor: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        meetingRoomName: '2016-05-03',
        meetingRoomAddress: '4',
        meetingRoomFloor: '上海市普陀区金沙江路 1516 弄',
        id: 4
      },{
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '5',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 5
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '6',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 6
      }, {
        meetingRoomName: '2016-05-01',
        meetingRoomAddress: '7',
        meetingRoomFloor: '上海市普陀区金沙江路 1519 弄',
        id: 7
      }, {
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '8',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 8
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '9',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 9
      },{
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '10',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 10
      }],
      searchMeetingRoom:{
        name: '',
        address: '',
        floor: '',
      },
      page:{
        total: 40,
      },
      currentPage: 1,
      pageSize: 10,
      pageCount: 7,
      tableData: [{
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '1',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '2',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        meetingRoomName: '2016-05-01',
        meetingRoomAddress: '3',
        meetingRoomFloor: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        meetingRoomName: '2016-05-03',
        meetingRoomAddress: '4',
        meetingRoomFloor: '上海市普陀区金沙江路 1516 弄',
        id: 4
      },{
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '5',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '6',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        meetingRoomName: '2016-05-01',
        meetingRoomAddress: '7',
        meetingRoomFloor: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '8',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '9',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        meetingRoomName: '2016-05-01',
        meetingRoomAddress: '10',
        meetingRoomFloor: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '11',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '12',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        meetingRoomName: '2016-05-01',
        meetingRoomAddress: '13',
        meetingRoomFloor: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '14',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '15',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        meetingRoomName: '2016-05-01',
        meetingRoomAddress: '16',
        meetingRoomFloor: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '17',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '18',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        meetingRoomName: '2016-05-01',
        meetingRoomAddress: '19',
        meetingRoomFloor: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '20',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '21',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        meetingRoomName: '2016-05-01',
        meetingRoomAddress: '22',
        meetingRoomFloor: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '23',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '24',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        meetingRoomName: '2016-05-01',
        meetingRoomAddress: '25',
        meetingRoomFloor: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '26',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '27',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        meetingRoomName: '2016-05-01',
        meetingRoomAddress: '28',
        meetingRoomFloor: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '29',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '30',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        meetingRoomName: '2016-05-01',
        meetingRoomAddress: '31',
        meetingRoomFloor: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '32',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '33',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        meetingRoomName: '2016-05-01',
        meetingRoomAddress: '34',
        meetingRoomFloor: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '35',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '36',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        meetingRoomName: '2016-05-01',
        meetingRoomAddress: '37',
        meetingRoomFloor: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        meetingRoomName: '2016-05-02',
        meetingRoomAddress: '38',
        meetingRoomFloor: '上海市普陀区金沙江路 1518 弄',
        id: 1
      }, {
        meetingRoomName: '2016-05-04',
        meetingRoomAddress: '39',
        meetingRoomFloor: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        meetingRoomName: '2016-05-01',
        meetingRoomAddress: '40',
        meetingRoomFloor: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }],
    }
  },
  methods:{
    checkInput(){
      this.searchMeetingRoom.name = this.searchMeetingRoom.name.replace(/\s+/g,"")
      this.searchMeetingRoom.address = this.searchMeetingRoom.address.replace(/\s+/g,"")
      this.searchMeetingRoom.floor = this.searchMeetingRoom.floor.replace(/\s+/g,"")
    },
    handleCurrentChange(currentPage){
      this.currentPage = currentPage
      let start = (this.currentPage - 1) * 10
      let end = this.currentPage * 10
      this.showData = this.tableData.slice(start, end)
    },
    getDetails(id){
      console.log(id)
    },
    checkLogin(){
      if(localStorage.getItem("userInfo") == null){
        this.$router.push('login')//todo
      }
    }
  },
  mounted(){
    // this.checkLogin()
  }
}
</script>

<style src="../assets/css/order.css" scoped/>


