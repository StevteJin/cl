<template>
  <div id="app">
    <div style="overflow:hidden;">
      <Menu v-if="$route.name != 'login'"></Menu>
      <router-view></router-view>
    </div>
    <!-- <button @click="autoUpdate()">获取更新</button>
    <ol id="content">
        <li>生命周期过程展示</li>
    </ol> -->
    <div class="mask" v-if="Expire_Day">
      <el-dialog title="提示" :visible.sync="Expire_Day" center :modal="false" custom-class="reset-dialog account-deposit-dialog">
        <div class="reset-dialog-content">您的系统服务期将在{{Expire_Day}}天后到期，请您尽快续费</div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="noShow">确 定</el-button>
          <el-button>
            <a href="tencent://message/?uin=1984856434" style="color:#fff;">续订服务</a>
          </el-button>
        </div>
      </el-dialog>
    </div>
    <div class="mask" v-if="traffic_lack">
      <el-dialog title="流量费预警" :visible.sync="traffic_lack" center :modal="false" custom-class="reset-dialog account-deposit-dialog traffic-lack-dialog">
        <div class="reset-dialog-content">
          <div>尊敬的客户您好，您的流量费将要耗尽，</div>
          <div>请立即进行补足。如未按时补足，</div>
          <div>我司将对您的持仓进行平仓处理。</div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="traffic_lack = false">确定</el-button>
        </div>
      </el-dialog>
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
