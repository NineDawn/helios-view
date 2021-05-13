<template>
  <div class="modal-backdrop">
    <div class="modal">
      <el-form :model="formData" class="customize-form border-form">
        <div class="fd-form-row">
          <div class="fd-form-row-item">
            <div class="fd-item-label"><span>*</span>部门名称</div>
            <div class="fd-item-content">
              <el-select
                clearable
                @change="changeDep"
                v-model="formData.departmentId"
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
            <div class="fd-item-label"><span>*</span>人员名称</div>
            <div class="fd-item-content">
              <!-- <el-input v-model="formData.name" @blur="searchUsers"/> -->
              <el-select
                multiple
                filterable
                remote
                reserve-keyword
                :remote-method="remoteMethod"
                v-model="formData.name"
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
      </el-form>
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
      formData: {
        departmentId: "",
      },
      pageSize: 10,
      pageNumber: 1,
    };
  },
  created() {
    this.getDepartmentList();
  },
  methods: {
    getDepartmentList() {
      this.$axios({
        method: "GET",
        url: "/helios/meeting/department/get_all_department", //todo
      }).then((res) => {
        const data = res.data.data;
        if (res.data.code !== 200) {
          throw new Error(res.data.msg);
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
        departmentId: this.formData.departmentId,
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
          throw new Error(res.data.msg);
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
        departmentId: this.formData.departmentId,
        // name: this.formData.name,
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
          throw new Error(res.data.msg);
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