<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="home-title">
          <img src="../assets/img/logo.png" class="logo"/>
        </div>
        <div class="home-border"></div>
      </el-header>
      <el-container>
        <el-aside class="menu">
          <navbar />
        </el-aside>
        <el-main>
          <mainContent />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navbar from "../components/navbar";
import mainContent from "../components/main_content";
export default {
  data(){
    return{

    }
  },
  components:{
    navbar,
    mainContent,
  }
}
</script>

<style src="../assets/css/home.css" scoped/>

