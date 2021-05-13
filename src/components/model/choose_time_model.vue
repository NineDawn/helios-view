<template>
  <div class="modal-backdrop">
    <div class="modal">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item>
          <div class="form-button">
            <el-button type="success" icon="el-icon-plus" @click="addDomain">新增</el-button>
          </div>
        </el-form-item>
        <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'时间段' + (index + 1)"
            :key="index"
            :prop="'domains.' + index + '.value'">
          <div class="time-picker-icon">
            <el-time-picker
                is-range
                v-model="domain.value"
                format='HH:mm'
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
            >
            </el-time-picker>
            <i style="font-size: 25px;margin-left: 15px" class="el-icon-remove-outline"
               @click.prevent="removeDomain(domain)"></i>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="chooseTime-button">
              <el-button type="primary" @click="closeChooseTimeSelf">关闭</el-button>
              <el-button type="success" @click="chooseTime">确认</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
name: "choose_time_model",
  data(){
    return{
      dynamicValidateForm: {
        domains: [],
      },
      id: null,
    }
  },
  mounted(){

  },
  methods:{
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
      });
    },
    closeChooseTimeSelf(){
      this.$emit("closeChooseTime")
      this.clearData()
    },
    changeTime(data){
      let newList = []
      let newFList = []
      for(let i of data){
        for(let j = 0 ;j <i.value.length;j++){
          const time = i.value[j].getHours() + ':' + i.value[j].getMinutes();
          newFList.push(time)
        }
        newList.push(newFList.splice(0,2))
      }
      return newList;
    },
    chooseTime(){
      if(this.dynamicValidateForm.domains <= 0){
        this.$message({
          message: '至少设置一个时间段',
          type: 'warning'
        });
        return
      }
      for(let one of this.dynamicValidateForm.domains){
        if(one.value === ''){
          this.$message({
            message: '至少设置一个时间段',
            type: 'warning'
          });
          return
        }
      }
      this.$axios({
        method: "POST",
        url: "/helios/meeting/room/change_meeting_room_time",//todo
        data: {
          meetingRoomId: this.id,
          time: this.changeTime(this.dynamicValidateForm.domains),
        }
      }).then(res=>{
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      })
    },
    getMeetingRoomAvailableTime(){
      this.$axios({
        method: "GET",
        url: "/helios/meeting/room/get_meeting_room_time?id=" + this.id, //todo
      }).then(res=>{
        const data = res.data.data
        if (res.data.code !== 200){
          throw new Error(res.data.msg)
        }
        for(let one of data){
          var value = [];
          for (let time of one.time) {
            var times = time.split(":");
            var now = new Date();
            now.setHours(parseInt(times[0]));
            now.setMinutes(parseInt(times[1]))
            value.push(now)
          }
          this.dynamicValidateForm.domains.push({value: value})
        }
      })
    },
    clearData(){
      this.dynamicValidateForm.domains = []
      this.id = null
    },
  },
}
</script>

<style src="../../assets/css/choose_time_model.css" scoped/>
