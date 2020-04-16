<template>
  <div id="app">
    <div style="overflow:hidden;">
      <Menu v-if="$route.name != 'login'"></Menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import eventBus from "./eventBus.js";
import Menu from "@/components/menu";
import FootBar from "@/components/footBar";
export default {
  name: "",
  components: {
    Menu,
    FootBar
  },
  data() {
    return {
      who: "",
      Expire_Day: "",
      traffic_lack: false
    }
  },
  created() {
    //this.who = localStorage.getItem("whoesApp");
    var _this = this;
    eventBus.$on("ExpireDay", function(expireDay) {
      _this.Expire_Day = expireDay;
    });

    let loading = '';
    let importLoading = '';
    // 导出表格
    eventBus.$on('downloadExcel', function(downloadExcel) {
      if(downloadExcel) {
        loading = _this.$loading({
          lock: true,
          text: '等待下载...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      }else {
        loading.close();
      }
    })
    // 导入表格
    eventBus.$on('importExcel', function(importExcel) {
      if(importExcel) {
        importLoading = _this.$loading({
          lock: true,
          text: '导入中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      }else {
        importLoading.close();
      }
    })
  },
  mounted: function() {
    // if(this.who=='jinhui'||this.who=='xinjuhe'){
    //   this.closeWindow()
    // }else{
    //   return false;
    // }
  },
  methods: {
    noShow() {
      this.Expire_Day = "";
    },
    // 请求当前余额、上期余额、合计流量费
    getBalance() {
      this.axios
        .post("flow/flowcost_balance",{
            BrokerID: this.BorkerID
        })
        .then(res => {
          console.log("getBalance>>", res);
          if(res.data.code == 1) {
            this.currentBalance = res.data.data.balance;
            if(this.currentBalance <= 1000) {
              this.traffic_lack = true;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    closeWindow(){
      window.onbeforeunload = function(){
        localStorage.clear();
      }
    }
  }
};
</script>

<style>
@import "../static/css/reset.css";
@import "../static/css/element.css";
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.8)
}
.mask .progress-box{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
