<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="input-first">
        <div class="input-name">会议名称:</div>
        <div>
          <el-input v-model="meetingRoom.title"
                    style="width: 360px" disabled></el-input>
        </div>
      </div>
      <div class="input">
        <div class="input-name">会议内容:</div>
        <div>
          <el-input v-model="meetingRoom.content" type="textarea" :autosize="{ minRows: 2}"
                    style="width: 360px" disabled></el-input>
        </div>
      </div>
      <div class="input">
        <div class="input-name">参会人员:</div>
        <div>
          <el-input v-model="meetingRoom.users" type="textarea" :autosize="{ minRows: 2}"
                    style="width: 360px" disabled></el-input>
        </div>
      </div>
      <div class="button">
        <el-button type="primary" @click="closeMyOrderModel">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "my_order_model",
  data(){
    return{
      meetingRoom:{},
    }
  },
  methods:{
    closeMyOrderModel(){
      this.$emit("closeMyOrderModel")
      this.clearData()
    },
    clearData(){
      this.meetingRoom= {}
    },
  },
}
</script>

<style src="../../assets/css/my_order_model.css" scoped/>
