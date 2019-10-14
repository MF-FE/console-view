<template>
  <div class="not-found">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="14">
        <img class="img404" :src="img404" />
      </el-col>
      <el-col :xs="24" :sm="10">
        <div class="title">啊欧！</div>
        <div class="subtitle">未找到该页面...</div>
        <router-link to="/" class="link">
          <el-button type="primary" size="small">回到首页</el-button>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import img404 from "@/assets/404.png";
export default {
  data() {
    return {
      img404
    };
  },
  mounted(){
  }
};
</script>
<style lang="scss" scoped>
.not-found {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%,-50%);
  .title {
    font-size: 40px;
    color: #409eff;
    margin-top: 50px;
  }
  .subtitle {
    margin: 20px auto 60px;
    font-size: 16px;
    color: #409eff;
  }
  .img404 {
    max-width: 500px;
    width: 100%;
    display: inline-block;
    float: right;
  }
  .link {
    text-decoration: none;
  }
}
</style>