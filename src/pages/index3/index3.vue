<template>
  <div class="container cxx">
    <div class="leftpbox" v-if="row==null&!keyword">
      <div class="lbox">
        <img src="../../assets/top.png" alt="">
        <img src="../../assets/bottom.png" alt="">
      </div>
      <div class="rbox">
        <div class="tbox">
          <img class="img" src="../../assets/dp.png" alt="">
          <div class="t1">暂无任何策略...</div>
          <div class="t2">No strategy at the moment...</div>
          <div class="t3" @click="tonew">新建策略</div>
        </div>
      </div>
    </div>
    <div class="leftpbox" v-if="row!=null||(row==null&keyword!='')">
      <div class="lbox">
        <img src="../../assets/top.png" alt="" class="lb1">
        <img src="../../assets/bottom.png" alt="" @click="tonew" class="lb2">
      </div>
      <div class="rbox">
        <div class="template-top">
          <div class="operate-btn">
            <div class="search-box">
              <input type="text" placeholder="搜索策略名称" v-model="keyword" />
              <div class="search-img" @click="searchA"></div>
            </div>
            <div class="addnow" @click="tonew">新建策略</div>
          </div>
        </div>
        <div>
          <img src="../../assets/refr.png" alt="" :class="{'refresh-trigger': refresh,freshbtn1:true}" @click="fresh">
          <el-table :border="true" :data="tableData1" stripe class="user-table" style="width: 100%;background-color:#fff;" height='380' :header-cell-style="headerCellStyle">
            <el-table-column show-overflow-tooltip prop="strategy_name" label="策略名称" align="center"></el-table-column>
            <el-table-column prop="strategy_id" label="策略ID" width="140"></el-table-column>
            <el-table-column prop="strategy_type_desc" label="策略类型"></el-table-column>
            <el-table-column show-overflow-tooltip prop="strategy_create_time" label="创建时间" align="center" width="160"></el-table-column>
            <el-table-column show-overflow-tooltip prop="strategy_last_modify_time" label="最后修改时间" align="center" width="160"></el-table-column>
            <el-table-column show-overflow-tooltip label="运行状态" align="center" width="130">
              <template slot-scope="scope">
                <div>
                  {{scope.row.strategy_status_desc}}
                </div>
              </template>
            </el-table-column>

            <el-table-column show-overflow-tooltip label="操作" align="center">
              <template slot-scope="scope">
                <div style="padding-left:90px;">
                  <div class="xxbox x2x">
                    <div v-if="scope.row.strategy_status_desc=='已终止'">
                    </div>
                    <div v-if="scope.row.strategy_status_desc=='运行中'" @click="stop1(scope.$index, scope.row)">
                      <img src="../../assets/xxx4.png" alt="">
                    </div>
                    <div v-if="scope.row.strategy_status_desc=='已暂停'" @click="start2(scope.$index, scope.row)">
                      <img src="../../assets/xxx2.png" alt="">
                    </div>
                  </div>
                  <div class="xxbox x2x">
                    <div v-if="scope.row.strategy_status_desc=='已终止'" @click="start1(scope.$index, scope.row)">
                      <img src="../../assets/xxx2.png" alt="">
                    </div>
                    <div v-if="scope.row.strategy_status_desc=='运行中'" @click="stop2(scope.$index, scope.row)">
                      <img src="../../assets/xxx3.png" alt="">
                    </div>
                    <div v-if="scope.row.strategy_status_desc=='已暂停'">
                    </div>
                  </div>
                  <div class="xxbox xxxbox">
                    <div @click="change1(scope.$index, scope.row)" v-if="scope.row.strategy_status_desc=='已终止'">
                      <img src="../../assets/1.png" alt="">
                    </div>
                    <div @click="delete1(scope.$index, scope.row)" v-if="scope.row.strategy_status_desc=='已终止'">
                      <img src="../../assets/2.png" alt="">
                    </div>
                    <div @click="change1(scope.$index, scope.row,'detail')">详情</div>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSzie" :pager-count="5" :total="total1" @current-change="handleCurrentChange"></el-pagination>
        </div>
      </div>
    </div>
    <sameTable :isFresh="isFresh" @isFreshBeel="freshBeel"></sameTable>
  </div>
</template>

<script>
import sameTable from "@/components/sameTable";
export default {
  components: {
    sameTable
  },
  data() {
    return {
      StrategyName1: [],
      StrategyID1: [],
      tableData1: [],
      keyword: "",
      pageSzie: 31,
      currentPage: 1,
      total1: 1,
      row: [],
      strategy_id: "",
      operate_type: 1,
      timer: null,
      websock: null,
      refresh: false,
      isFresh: false
    };
  },
  created() {
    this.initWebSocket();
  },
  computed: {
    headerCellStyle() {
      return {
        padding: "10px 0",
        background: "#fff",
        color: "#333333",
        "font-size": "14px",
        "border-right": "0px",
        "border-left": "0px"
      };
    },
    cellStyle() {
      return {
        "border-right": "0px",
        color: "#333333",
        "font-size": "12px"
      };
    }
  },
  watch: {
    keyword: {
      handler(newVal, oldVal) {
        if (newVal == "") {
          this.getDataList();
        }
      },
      deep: true
    },
    isFresh: {
      handler(newVal, oldVal) {
        console.log("我是新值2", newVal);
        this.isFresh = newVal;
      },
      deep: true
    }
  },
  mounted() {
    //上面的列表
    this.getDataList();
    // this.setTimer();
  },
  destroyed: function() {
    clearInterval(this.timer);
    this.websocketclose();
  },
  methods: {
    freshBeel(data) {
      console.log('回调',data)
      this.isFresh = data;
    },
    fresh() {
      this.getDataList();
    },
    initWebSocket() {
      let token = localStorage.getItem("token");
      //初始化weosocket
      const wsuri = "ws://47.102.151.13:8198/api.v1/ws?token=" + token; //ws地址
      // const wsuri = "ws://10.131.4.184:8198/api.v1/ws?token=" + token; //ws地址
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketonopen;

      this.websock.onerror = this.websocketonerror;

      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },

    websocketonopen() {
      console.log("WebSocket连接成功");
    },
    websocketonerror(e) {
      //错误
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(evt) {
      let that = this;
      console.log("体", evt);
      // var messageObj = { cmd: "offline" };
      // var messageJson = JSON.stringify(messageObj);
      // this.websock.send(messageJson);
      if (typeof evt.data == "string") {
        return;
      } else {
        var reader = new FileReader();
        reader.addEventListener("loadend", function(e) {
          // 输出字符串 {hello: world}
          console.log("666", e.target.result);
          let a = e.target.result;
          switch (JSON.parse(a)["type"]) {
            //启动策略
            case "0":
              that.getDataList();
              that.isFresh = true;
              // that.getAccountList();
              break;
            //终止策略
            case "1":
              that.getDataList();
              that.isFresh = true;
              // that.getAccountList();
              break;
            //暂停策略
            case "2":
              that.getDataList();
              that.isFresh = true;
              // that.getAccountList();
              break;
            //恢复策略
            case "3":
              that.getDataList();
              that.isFresh = true;
              // that.getAccountList();
              break;
            //删除策略
            case "4":
              that.getDataList();
              that.isFresh = true;
              // that.getAccountList();
              break;
            //创建策略
            case "5":
              that.getDataList();
              that.isFresh = true;
              // that.getAccountList();
              break;
            //修改策略
            case "6":
              that.getDataList();
              that.isFresh = true;
              // that.getAccountList();
              break;
            //策略自动终止
            case "7":
              that.getDataList();
              that.isFresh = true;
              // that.getAccountList();
              break;
          }
        });
        reader.readAsText(evt.data);
      }
    },
    websocketsend(agentData) {
      //数据发送
      this.websock.send(agentData);
    },

    websocketclose(e) {
      // var messageObj = { cmd: "offline" };
      // var messageJson = JSON.stringify(messageObj);
      // this.websock.send(messageJson);
      this.websock.close();
      //关闭
    },
    setTimer() {
      this.timer = setInterval(() => {
        this.getDataList();
        this.isFresh = true;
        // this.getAccountList();
      }, 2000);
    },
    tonew() {
      this.$router.push({
        path: "index2"
      });
    },
    searchA() {
      this.getDataList(this.keyword);
    },
    //操作策略
    //启动已终止的策略
    start1(index, row) {
      console.log("111", row);
      this.strategy_id = row.strategy_id;
      this.operate_type = 0;
      this.doOpe(this.strategy_id, this.operate_type);
    },
    //暂停策略
    stop1(index, row) {
      this.strategy_id = row.strategy_id;
      this.operate_type = 2;
      this.doOpe(this.strategy_id, this.operate_type);
    },
    //终止策略
    stop2(index, row) {
      this.strategy_id = row.strategy_id;
      this.operate_type = 1;
      this.doOpe(this.strategy_id, this.operate_type);
    },
    //恢复已暂停的策略
    start2(index, row) {
      this.strategy_id = row.strategy_id;
      this.operate_type = 3;
      this.doOpe(this.strategy_id, this.operate_type);
    },
    //删除策略
    delete1(index, row) {
      this.strategy_id = row.strategy_id;
      this.operate_type = 4;
      this.doOpe(this.strategy_id, this.operate_type);
    },
    //修改
    change1(index, row, detail) {
      if (!detail) {
        detail = "";
      }
      this.strategy_id = row.strategy_id;
      this.$router.push({
        path: "index2",
        query: {
          strategyId: this.strategy_id,
          detail: detail
        }
      });
    },
    doOpe(id, ope) {
      this.axios
        .post("api.v1/strategy/operate", {
          strategy_id: id,
          operate_type: ope
        })
        .then(res => {
          if (res.data.code == 0) {
            this.getDataList();
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataList(keyword) {
      this.refresh = true;
      setTimeout(() => {
        this.refresh = false;
      }, 1000);
      if (!keyword) {
        keyword = "";
      }
      this.axios
        .post("api.v1/strategy/list", {
          page: this.currentPage,
          size: this.pageSize,
          filter: { StrategyName: keyword },
          option: { StrategyName: "LIKE" }
        })
        .then(res => {
          console.log("getTellerList>>", res.data);
          const { rows, total1 } = res.data.data;
          console.log("数", rows);
          if (res.data.code == 0) {
            this.row = rows;
            if (!rows) {
              this.tableData1 = [];
            } else {
              this.tableData1 = rows;
            }
          } else {
            this.tableData1 = new Array(this.pageSize);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 4) {
        return [1, 2];
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDataList();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: calc(100%-307px);
  background: #fff;
  height: 100vh;
  overflow: hidden;
}
.leftpbox {
  border: 6px solid #7a7a7a;
  overflow: hidden;
}
.leftpbox .lbox {
  float: left;
  border-right: 6px solid #7a7a7a;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 37px;
  padding-bottom: 37px;
}
.leftpbox .lbox .lb1 {
  margin-top: 7px;
}
.leftpbox .lbox .lb2 {
  margin-top: -16px;
}
.leftpbox .lbox img {
  width: 22px;
}
.leftpbox .rbox .tbox {
  width: 206px;
  position: absolute;
  left: 50%;
  top: 18%;
  // transform: translate(-50%,50%)
}
.leftpbox .rbox .img {
  width: 82px;
  height: 88px;
  margin-left: 62px;
}
.leftpbox .rbox .t1 {
  font-size: 30px;
  color: #333333;
  font-weight: bold;
  margin-top: 18px;
}
.leftpbox .rbox .t2 {
  font-size: 12px;
  color: #333333;
  margin-top: 18px;
}
.leftpbox .rbox .t3 {
  width: 206px;
  height: 30px;
  background-color: #e46943;
  color: #fff;
  margin-top: 20px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.leftpbox .rbox {
  overflow: hidden;
  width: calc(100%-40px);
  padding-left: 51px;
  padding-right: 51px;
}
.leftpbox .rbox .xxbox {
  float: left;
}
.leftpbox .rbox .x2x {
  width: 20px;
}

.leftpbox .rbox .xxbox * {
  vertical-align: middle;
}
.leftpbox .rbox .xxxbox {
  float: right;
  margin-right: 40px;
}
.leftpbox .rbox .xxxbox * {
  float: left;
  margin-right: 10px;
  cursor: pointer;
}
.leftpbox .rbox .xxbox img {
  margin-top: 8px;
  cursor: pointer;
}
.jbox {
  margin-top: 51px;
  margin-left: 106px;
  width: 500px;
}
.jbox .jtitle {
  border-left: 3px solid #e46943;
  width: 100px;
  height: 16px;
  padding-left: 20px;
  font-size: 16px;
  color: #333333;
  font-weight: bold;
  margin-bottom: 30px;
}
.jbox .j1 {
  overflow: hidden;
  margin-top: 2px;
}
.jbox .j1 .d1 {
  font-size: 12px;
  color: #333333;
  margin-right: 51px;
  float: left;
  height: 25px;
  line-height: 25px;
  width: 100px;
}

.pagination {
  float: right;
  margin-top: 10px;
}
.tableheight {
  background-color: transparent;
  border-left: 6px solid #7a7a7a;
  border-right: 6px solid #7a7a7a;
  height: 100%;
}

.freshbtn1 {
  width: 20px;
  position: absolute;
  right: 70px;
  top: 170px;
  z-index: 1000000;
  cursor: pointer;
}
.freshbtn2 {
  width: 20px;
  position: absolute;
  right: 70px;
  top: 626px;
  z-index: 1000000;
  cursor: pointer;
}
</style>
<style>
.cxx .el-table__body-wrapper {
  border: 1px solid #ededed;
  box-sizing: border-box;
}
.jbox .j1 .el-input {
  background-color: #ededed !important;
  width: 283px;
  height: 25px;
  float: left;
}
.jbox .j1 .el-input .el-input__inner {
  background-color: #ededed !important;
}

.el-picker-panel {
  line-height: 12px !important;
  top: 36px !important;
}
.el-date-picker__header {
  margin: 4px 12px 4px 12px !important;
}
.el-date-table td {
  padding: 0px !important;
}
.el-picker-panel__content {
  margin: 0px 15px 0px 15px !important;
}
.el-table--border th {
  border-right: 0px !important;
}
.el-table--border td {
  border-right: 0px !important;
}
</style>
