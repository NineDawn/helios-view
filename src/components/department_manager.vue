<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按部门名称搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.code" placeholder="按部门编号搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="searchDepartment">搜索</el-button>
        </div>
        <div class="search-button">
          <el-button type="success" icon="el-icon-plus" @click="openAddDepartment">新增</el-button>
        </div>
      </div>
    </div>
    <div class="table-menu">
      <div class="table">
        <el-table
            v-loading="loading"
            :data="showList"
            border
            style="width: 100%">
          <el-table-column
              prop="id"
              label="ID"
              align="center">
          </el-table-column>
          <el-table-column
              prop="name"
              label="部门名称"
              align="center">
          </el-table-column>
          <el-table-column
              prop="code"
              label="部门编号"
              align="center">
          </el-table-column>
          <el-table-column
              prop="remark"
              label="备注"
              align="center">
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <div class="link-layout">
                <el-link type="primary" @click="openUpdateDepartment(scope.row)">修改</el-link>
                <el-link type="primary" @click="clickDeleteDepartment(scope.row.id)">删除</el-link>
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
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <div style="position: absolute;z-index: 2;">
      <addDepartmentModel v-show="isAddDepartmentModelShow" v-on:closeAddDepartment="closeAddDepartmentModel"/>
    </div>
    <div style="position: absolute;z-index: 2;">
      <updateDepartmentModel v-show="isUpdateDepartmentModelShow" ref="updateDepartmentModel"
                             v-on:closeUpdateDepartment="closeUpdateDepartmentModel"/>
    </div>
  </div>
</template>

<script>
import addDepartmentModel from "@/components/model/add_department";
import updateDepartmentModel from "@/components/model/update_department"

export default {
name: "department_manager",
  data(){
    return{
      searchParams: {
        name: '',
        code: '',
      },
      currentPage: 1,
      pageSize: 11,
      pageCount: 7,
      total: 0,
      showList: [

      ],
      departmentList: [],
      isAddDepartmentModelShow: false,
      isUpdateDepartmentModelShow: false,
      department: {},
      loading:true,
    }
  },
  methods:{
    closeAddDepartmentModel(){
      this.isAddDepartmentModelShow = false
    },
    openAddDepartment(){
      this.isAddDepartmentModelShow = true
    },
    closeUpdateDepartmentModel(){
      this.isUpdateDepartmentModelShow = false
    },
    openUpdateDepartment(department){
      this.$refs.updateDepartmentModel.department = {...department}
      this.isUpdateDepartmentModelShow = true
    },
    checkInput(){
      this.searchParams.name = this.searchParams.name.replace(/\s+/g,"")
      this.searchParams.code = this.searchParams.code.replace(/\s+/g,"")
    },
    handleCurrentChange(page){
      this.currentPage = page
      let start = (this.currentPage - 1) * 11
      let end = this.currentPage * 11
      this.showList = this.departmentList.slice(start, end)
    },
    searchDepartment(){
      this.loading = true
      this.$axios({
        method: "POST",
        url: "/helios/meeting/department/query_department",
        data: this.searchParams
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.departmentList = data
        this.total = this.departmentList.length
        this.handleCurrentChange(1)
      })
    },
    clickDeleteDepartment(id){
      this.$confirm('确定删除该部门吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteDepartment(id)
      })
    },
    deleteDepartment(id){
      this.$axios({
        method:"POST",
        url: "/helios/meeting/department/delete_department",
        data: {id:id}
      }).then(res=>{
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.searchDepartment()
      })
    },
  },
  mounted(){
    this.searchDepartment()
    localStorage.setItem("menuActiveName","departmentManager")
  },
  components: {
    addDepartmentModel,
    updateDepartmentModel,
  },
}
</script>

<style src="../assets/css/department_manager.css" scoped/>
