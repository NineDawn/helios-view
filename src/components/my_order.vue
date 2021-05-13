<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按会议名称搜索"
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
                            :content="'地点: '+scope.row.address+' 楼层: '+scope.row.floor+'F'">
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
export default {
name: "my_order",
  data(){
    return{

    }
  },
  methods:{

  },
}
</script>

<style src="../assets/css/my_order.css" scoped/>
