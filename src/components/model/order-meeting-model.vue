<template>
  <div class="modal-backdrop">
    <div class="modal">
        <div class="customize-form border-form">
          <div class="fd-form-row" style="display:flex;justify-content: center;">
              <h2>会议室预约申请</h2>
          </div>
          <div class="fd-form-row">
            <div class="fd-form-row-item">
              <div class="fd-item-label">会议标题</div>
              <div class="fd-item-content">
                <el-input
                    style="width: 260px;"
                    v-model="orderData.title"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="fd-form-row">
            <div class="fd-form-row-item">
              <div class="fd-item-label">会议内容</div>
              <div class="fd-item-content">
                <el-input
                    style="width: 260px;"
                    v-model="orderData.meetingContent"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="fd-form-row">
            <div class="fd-form-row-item">
              <div class="fd-item-label">部门查询</div>
              <div class="fd-item-content">
                <el-select
                    clearable
                    @change="changeDep"
                    v-model="departmentId"
                    placeholder="请选择"
                    style="width: 260px"
                >
                  <el-option
                      v-for="item in departmentList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="fd-form-row">
            <div class="fd-form-row-item">
              <div class="fd-item-label">参会人员</div>
              <div class="fd-item-content">
                <el-select
                    multiple
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="remoteMethod"
                    v-model="orderData.userIdList"
                    placeholder="请选择"
                    style="width: 260px"
                >
                  <el-option
                      v-for="item in userList"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="fd-form-row" style="display:flex;justify-content: center;margin-top: 10px">
            <el-button type="success" @click="submit">提交</el-button>
            <el-button type="primary" @click="closeOrderMeetingModel">取消</el-button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-meeting-model",
  data() {
    return {
      departmentList: [],
      userList: [],
      departmentId: null,
      row:{},
      orderData:{
        userIdList: [],
        title: '',
        meetingContent:'',
      },
      pageSize: 10,
      pageNumber: 1,
    };
  },
  created() {
    this.getDepartmentList();
  },
  methods: {
    submit(){
      let p = {
        ...this.orderData,
        ...this.row
      }
      this.$axios({
        method: "POST",
        url: "/helios/meeting/application/submit_application",
        data: p,
      }).then((res) => {
        if (res.data.code !== 200) {
          this.$throw(new Error(res.data.msg));
          return
        }
        this.$message({
          message: '预约成功!',
          type: 'success'
        });
        this.closeOrderMeetingModel()
      });
    },
    closeOrderMeetingModel(){
      this.$emit("closeOrderMeetingModel");
    },
    getDepartmentList() {
      this.$axios({
        method: "GET",
        url: "/helios/meeting/department/get_all_department", //todo
      }).then((res) => {
        const data = res.data.data;
        if (res.data.code !== 200) {
          this.$throw(new Error(res.data.msg));
          return
        }
        this.departmentList = data;
      });
    },
    changeDep() {
      this.searchUsers();
    },
    remoteMethod(query) {
      this.pageNumber = 1;
      this.loading = true;
      let data = {
        name: query,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
      };
      this.$axios({
        method: "POST",
        url: "/helios/meeting/user/query_userInfo",
        data: data,
      }).then((res) => {
        this.loading = false;
        const data = res.data.data;
        if (res.data.code !== 200) {
          this.$throw(new Error(res.data.msg));
          return
        }
        this.users = data.userList;
        this.userList = [];
        for (let one of this.users) {
          let u = {
            id: one.id,
            label: one.name,
          };
          this.userList.push(u);
        }
      });
    },
    searchUsers() {
      this.pageNumber = 1;
      this.loading = true;
      let data = {
        departmentId: this.departmentId,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
      };
      this.$axios({
        method: "POST",
        url: "/helios/meeting/user/query_userInfo",
        data: data,
      }).then((res) => {
        this.loading = false;
        const data = res.data.data;
        if (res.data.code !== 200) {
          this.$throw(new Error(res.data.msg));
          return
        }
        this.users = data.userList;
        this.userList = [];
        for (let one of this.users) {
          let u = {
            id: one.id,
            label: one.name,
          };
          this.userList.push(u);
        }
      });
    },
  },
};
</script>

<style src="../../assets/css/order-meeting-model.css" scoped/>
<style lang="less" scoped>
.border-form {
  padding: 30px;
}
.customize-form {
  .fd-form-row {
    display: flex;
    align-items: center;
    &-item {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .fd-item-label {
        width: 25%;
        text-align: right;
        font-size: 14px;
        letter-spacing: 1px;
        color: #000000;
        span:first-child {
          color: red;
        }
      }
      .fd-item-content {
        padding-left: 15px;
        width: 70%;
      }
    }
    &-longitem {
      width: 100%;
      align-items: flex-start;
      .fd-item-label {
        width: 12.5%;
      }
      .fd-item-content {
        width: 85%;
      }
    }
  }
}
</style>
