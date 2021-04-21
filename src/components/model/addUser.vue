<template>
  <div class="modal-backdrop-addUser">
    <div class="modal">
      <div>
        <el-button type="primary" @click="closeAddUser">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "addUser",
  data(){
    return{

    }
  },
  methods:{
    closeAddUser(){
      this.$emit("closeAddUser")
    },
  }
}
</script>

<style src="../../assets/css/addUser.css" scoped />

