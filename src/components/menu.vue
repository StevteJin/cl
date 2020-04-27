<template>
  <div id="menu">
    <div class="topbox">
      <div class="name">{{userNameA}}</div>
      <div class="rightname">
        <span class="s1">{{userName}}</span><br/>
        <span class="s2" @click="loginout">退出登录</span>
      </div>
    </div>
    <div class="nav">
      <el-row class="tac">
        <el-col>
          <el-menu :default-active="index" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-menu-item index="1" @click="routepath1">
              <span slot="title">交易账号</span>
            </el-menu-item>
            <el-menu-item index="2" @click="routepath2">
              <span slot="title">策略交易</span>
            </el-menu-item>
            <el-menu-item index="4" @click="routepath4">
              <span slot="title">委托查询</span>
            </el-menu-item>
            <el-menu-item index="5" @click="routepath5">
              <span slot="title">成交查询</span>
            </el-menu-item>
            <el-menu-item index="6" @click="routepath6">
              <span slot="title">持仓查询</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import eventBus from "../eventBus.js";
export default {
  data: function() {
    return {
      userName: "",
      userNameA: "",
      index: "1"
    };
  },
  created: function() {
    let userName = localStorage.getItem("remenberUsername");
    this.userName = userName ? userName : this.userName;
    this.userNameA = this.userName.substring(0, 1);
    console.log("路径", this.$route.path);
    let path = this.$route.path;
    if (path == "/tradeChannel" || path == "/index") {
      this.index = "1";
    } else if (path == "/index2") {
      this.index = "2";
    } else if (path == "/index3") {
      this.index = "3";
    } else if (path == "/index4") {
      this.index = "4";
    } else if (path == "/index5") {
      this.index = "5";
    } else if (path == "/index6") {
      this.index = "6";
    }
    eventBus.$on("modifyUserName", newName => {
      this.userName = newName;
    });
  },
  watch: {
    $route(to, from) {}
  },
  mounted: function() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    routepath1() {
      this.$router.push({
        path: "tradeChannel"
      });
    },
    routepath2() {
      this.$router.push({
        path: "index3"
      });
    },
    routepath4() {
      this.$router.push({
        path: "index4"
      });
    },
    routepath5() {
      this.$router.push({
        path: "index5"
      });
    },
    routepath6() {
      this.$router.push({
        path: "index6"
      });
    },
    loginout() {
      this.axios
        .post("logout")
        .then(res => {
          localStorage.clear();
          this.$router.push({
            path: "login"
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style>
#menu .el-menu {
  background-color: transparent;
  border-right: 0px;
}
#menu .el-menu-item.is-active {
  background-color: #e46943;
  color: #fff;
}
#menu .el-menu-item {
  height: 37px;
  color: #fff;
  background-color: #363636;
  line-height: 37px;
  padding-left: 30px;
  margin-bottom: 9px;
}
</style>

<style scoped>
@import "../assets/css/menu.css";
</style>
