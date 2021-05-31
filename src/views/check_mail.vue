<template>
  <div class="main">
    <el-card class="box-card">
      <div v-if="flag!=null && flag === true">
        <div class="content">
          <i class="el-icon-success" style="font-size: 80px;color:green "></i>
          <span class="text">注册成功!</span>
        </div>
        <div class="return-login">
          <el-button type="success" @click="returnLogin" round>返回登录</el-button>
        </div>
      </div>
      <div v-else-if="flag!=null && flag === false">
      <div class="content">
        <i class="el-icon-error" style="font-size: 80px;color:red"></i>
        <span class="text">注册失败!</span>
      </div>
      <div class="return-login">
        <el-button type="primary" @click="returnLogin" round>返回注册</el-button>
      </div>
    </div>
      <div v-else-if="flag==null">
        <div class="content" style="width: 100%">
          <span style="width: 25px" v-loading = true></span>
          <span class="text">注册中...</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id:null,
      flag:null
    }
  },
  methods: {
    init(){
      var url = window.location.href ;
      var start = url.indexOf("id=")
      if (start === -1){
        this.$router.push("404")
        return
      }
      this.id = url.substr(start+3)
      this.$axios({
        url:"/helios/meeting/user/check_email?id=" + this.id,
        method:"POST"
      }).then(res=>{

        const data = res.data
        if (data.code!==200){
          this.$throw(new Error(data.msg))
          this.flag =false
        }else {
          this.flag = true
        }
      })
    },
    returnLogin(){
      this.$router.push("/")
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
.box-card {
  width: 480px;
  display: flex;
  justify-content: center;
}
.main {
  display: flex;
  justify-content: center;
  margin-top: 10%;
}
.content {
  display: flex;
}
.text{
  font-family: "PingFang SC",sans-serif;
  font-size: 60px;
  margin-left: 20px;
}
.return-login{
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
