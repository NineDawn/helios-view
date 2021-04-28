<template>
  <div class="modal-backdrop">
    <div class="modal">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item>
          <el-button @click="addDomain">新增时间段</el-button>
          <el-button @click="a">s</el-button>
        </el-form-item>
        <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'时间段' + (index + 1)"
            :key="index"
            :prop="'domains.' + index + '.value'">
          <el-time-picker
              is-range
              v-model="domain.value"
              format='HH:mm'
              value-format="HH:mm"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              >
          </el-time-picker>
          <i style="font-size: 25px;margin-left: 15px" class="el-icon-remove-outline"
             @click.prevent="removeDomain(domain)"></i>
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
        domains: [
          {value: []}
        ],
      },
      times:[['11:20']]
    }
  },
  mounted(){
    this.a();
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
    a(){
      for(let time of this.)
      var value = [];
      for (let one of time) {
        var times = one.split(":");
        var now = new Date();
        now.setHours(parseInt(times[0]));
        now.setMinutes(parseInt(times[1]))
        value.push(now)
      }
      time = value;
      console.log(value)
    },
  },
}
</script>

<style src="../../assets/css/choose_time_model.css" scoped/>
