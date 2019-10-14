<template>
  <el-container class="layout-container">
    <el-menu
      background-color="#344054"
      text-color="#fff"
      width="200px"
      :collapse-transition="true"
      :unique-opened="true"
      :collapse="isCollapse"
      :router="true"
      :default-active="$route.path"
    >
      <el-menu-item
        :index="route.path"
        v-for="(route,index) in $store.getters.sideBar"
        :key="index"
      >
        <i :class="route.meta.icon"></i>
        <span slot="title">{{route.name}}</span>
      </el-menu-item>
    </el-menu>

    <el-container>
      <el-header>
        <div class="head-left">
          <i @click="toggleNav" class="toggle-btn" :class="toggleBtnIcon"></i>
        </div>
        <div class="head-user">
          <el-avatar :src="logo" size="small"></el-avatar>
          <el-dropdown @command="logout">
            <span class="el-dropdown-link">
              {{$store.state.userInfo && $store.state.userInfo.nickname || $store.state.userInfo && $store.state.userInfo.username}}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-breadcrumb {
    margin-left: 20px;
  }
  .el-header {
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    color: #333;
    justify-content: space-between;
    align-items: center;
    display: flex;
    z-index: 2;
    .head-left {
      display: flex;
      align-items: center;
      .toggle-btn {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .head-user {
      display: flex;
      align-items: center;
      .el-dropdown-link {
        cursor: pointer;
        margin-left: 10px;
      }
    }
  }
}
</style>

<script>
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
      isCollapse: false,
      logo
    };
  },
  mounted() {},
  methods: {
    toggleNav() {
      this.isCollapse = !this.isCollapse;
    },
    logout() {
      console.log("退出");
      this.$store.dispatch("logout");
      this.$router.push({ path: "/login" });
    }
  },
  computed: {
    toggleBtnIcon() {
      return !this.isCollapse ? "el-icon-s-fold" : "el-icon-s-unfold";
    }
  }
};
</script>