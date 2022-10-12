<template>
  <div class="nav-header-container">
    <span class="nav-logo" @click="goHome">色彩福</span>
    <el-menu
      mode="horizontal"
      :router="true"
      :default-active="path"
      background-color="#24292f"
      text-color="#ffffff"
      active-text-color="#999999"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/editor">编辑器</el-menu-item>
      <el-menu-item index="/story">色彩福的故事</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: this.$router.currentRoute.path,
    };
  },
  watch: {
    $route(to) {
      const { path } = to;
      this.path = path;
    },
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.nav-header-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: #24292f;
}

.nav-logo {
  color: white;
  display: inline-block;
  line-height: 61px;
  font-weight: bold;
  margin-left: 20px;
  font-size: 30px;
  font-family: Luckiest Guy;
  transform: translateY(5px);
  cursor: pointer;
}

.nav-header-container .el-menu {
  display: flex;
  justify-content: flex-end;
}
</style>