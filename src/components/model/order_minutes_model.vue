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
        <el-button type="primary" @click="closeOrderMinutesModel">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "order_minutes_model",
  data(){
    return{
      meetingRoom:{},
    }
  },
  methods:{
    closeOrderMinutesModel(){
      this.$emit("closeOrderMinutesModel")
      this.clearData()
    },
    clearData(){
      this.meetingRoom= {}
    },
    getShowData(id){
      this.$axios({
        method : "POST",
        url: "/helios/meeting/user/update_user_info", //todo
        data : {id: id}
      }).then(res=>{
        const data = res.data
        if (data.code !== 200){
          throw new Error(data.msg)
        }
        this.meetingRoom = data.meetingRoom
      })
    },
  },
}
</script>

<style src="../../assets/css/order_minutes_model.css" scoped/>
