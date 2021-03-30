<template>
  <div>
    <el-container>
      <el-header>
        <p>root</p>
      </el-header>
      <el-container>
        <el-aside width="201px" style="background-color: rgb(238, 241, 246)">
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
    mainContent
  }
}
</script>

<style scoped>

</style>
