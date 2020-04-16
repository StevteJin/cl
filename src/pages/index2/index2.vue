<template>
  <div class="container cxx">
    <div class="leftpbox">
      <div class="lbox">
        <img src="../../assets/top1.png" alt="" @click="back" class="lb1">
        <img src="../../assets/bottom1.png" alt="" class="lb2">
      </div>
      <div class="rbox">
        <div class="jbox">
          <div class="jtitle">基础设置</div>
          <div class="j1">
            <div class="d1">策略名称</div>
            <el-input v-model="strategy_name"></el-input>
          </div>
          <div class="j1">
            <div class="d1">策略模板</div>
            <el-select v-model="strategy_type" style="width:20%;" filterable clearable placeholder="策略模板">
              <el-option v-for="(item,index) in aKList" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
          </div>
        </div>
        <div class="jbox">
          <div class="jtitle">账号设置</div>
          <div class="j1">
            <div class="d1">证券交易账号</div>
            <el-select v-model="k0" style="width:20%;" filterable clearable placeholder="证券交易账号">
              <el-option v-for="(item,index) in accountList0" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
          </div>
          <div class="j1">
            <div class="d1">期货交易账号</div>
            <el-select v-model="k1" style="width:20%;" filterable clearable placeholder="期货交易账号">
              <el-option v-for="(item,index) in accountList1" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
          </div>
        </div>
        <div class="jbox">
          <div class="jtitle">合约设置</div>
          <div class="j1">
            <div class="d1">合约A</div>
            <el-select v-model="ka" style="width:20%;" filterable remote :remote-method="remoteMethodb" clearable placeholder="请输入证券合约">
              <el-option v-for="(item,index) in bList" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
          </div>
          <div class="j1">
            <div class="d1">合约B</div>
            <el-select v-model="kb" style="width:20%;" filterable remote :remote-method="remoteMethoda" clearable placeholder="请输入期货合约">
              <el-option v-for="(item,index) in aList" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>

          </div>
        </div>
        <div class="jbox" style="float:right;margin-top:-410px;margin-right:400px;">
          <div class="jtitle">交易设置</div>
          <div class="j1">
            <div class="d1">开仓价差</div>
            <el-input v-model="p1"></el-input>
            <span style="line-height:18px;">&nbsp;元</span>
          </div>
          <div class="j1">
            <div class="d1">平仓价差</div>
            <el-input v-model="p2"></el-input>
            <span style="line-height:18px;">&nbsp;元</span>
          </div>
          <div class="j1">
            <div class="d1">每次交易对数</div>
            <el-input v-model="p3"></el-input>
            <span style="line-height:18px;">&nbsp;对</span>
          </div>
          <div class="j1">
            <div class="d1">最大持仓对数</div>
            <el-input v-model="p4"></el-input>
            <span style="line-height:18px;">&nbsp;对</span>
          </div>
        </div>
        <div class="xbox">
          <div class="img" @click="back">
            <img src="../../assets/x1.png" alt="">
            <div>返回</div>
          </div>
          <div class="img" @click="resetList">
            <img src="../../assets/x2.png" alt="">
            <div>重置</div>
          </div>
          <div class="img" @click="addNewList(5)" v-if="!queryId">
            <img src="../../assets/x3.png" alt="">
            <div>保存</div>
          </div>
          <div class="img" @click="editNewList" v-if="queryId">
            <img src="../../assets/x4.png" alt="">
            <div>修改</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tableheight">
      <!-- <el-table v-if="EventType1.length>0&StrategyName1.length>0&StrategyID1.length>0" :data="tableData" style="width: 100%;" :height="400" :span="24" :row-style="{height:'40px'}" :header-row-style="{height:'32px'}" :cell-style="{padding:'1px'}" :span-method="objectSpanMethod"> -->
      <img src="../../assets/refr.png" alt="" :class="{'refresh-trigger': refresh1,freshbtn2:true}" @click="fresh1">
      <el-table :data="tableData" stripe class="user-table" style="margin-left:57px;padding-right:45px" :height="300" :span="24" :row-style="{height:'40px'}" :header-row-style="{height:'32px'}" :span-method="objectSpanMethod" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
        <el-table-column prop="strategy_name" label="策略名称" width="100"></el-table-column>
        <el-table-column prop="strategy_id" label="策略ID" width="140"></el-table-column>
        <el-table-column prop="event_type_desc" label="事件类型" width="100"></el-table-column>
        <el-table-column prop="event_time" label="发生时间" width="180"></el-table-column>
        <el-table-column prop="event_detail" label="事件详情"></el-table-column>
        <!-- <el-table-column align="right">
          <template slot="header">
            <el-select v-model="value1" style="width:20%;" filterable clearable placeholder="策略名称">
              <el-option v-for="(item,index) in StrategyName1" :key="index" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="value2" style="width:18%;" filterable clearable placeholder="策略ID">
              <el-option v-for="(item,index) in StrategyID1" :key="index" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="value3" style="width:20%;" filterable clearable placeholder="事件类型">
              <el-option v-for="(item,index) in EventType1" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
            <el-date-picker v-model="value4" type="datetime" placeholder="发生时间" style="width:23%;"></el-date-picker>
            <el-button @click="search">搜索</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="pagination">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSzie" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "超级11多",
          address: "1211080221",
          type: "启动",
          content: "开仓231"
        },
        {
          date: "2016-05-04",
          name: "超级22多",
          address: "1211080221",
          type: "开仓",
          content: "开仓231"
        },
        {
          date: "2016-05-01",
          name: "超级33多",
          address: "1211080221",
          type: "开仓",
          content: "开仓231"
        },
        {
          date: "2016-05-03",
          name: "超级44多",
          address: "1211080221",
          type: "启动",
          content: "开仓231"
        }
      ],
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      EventType1: [],
      StrategyName1: [],
      StrategyID1: [],
      pageSzie: 20,
      currentPage: 1,
      total: 0,
      BrokerID: "",
      UserAccountID: "",
      cl: [{ key: 1, value: 1 }, { key: 2, value: 2 }],
      //交易账号列表
      accountList0: [],
      accountList1: [],
      //策略模板列表
      aKList: [],
      //合约A列表
      aList: [],
      //合约B列表
      bList: [],
      //策略名称
      strategy_name: "",
      //策略模板
      strategy_type: "",
      //合约设置

      //开仓价差
      //平仓价差
      //每次交易对数
      //最大持仓对数,
      //期货
      k0: "",
      //证券
      k1: "",
      //证券
      ka: "",
      //期货
      kb: "",
      p1: "",
      p2: "",
      p3: "",
      p4: "",
      queryId: "",
      refresh1: false
    };
  },
  created() {
    this.queryId = this.$route.query.strategyId;
    this.BrokerID = this.$route.query.BrokerID;
    this.UserAccountID = this.$route.query.UserAccountID;
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
    EventType1: {
      handler(newVal, oldVal) {
        console.log("新：", newVal, "旧", oldVal);
      },
      deep: true
    }
  },
  mounted() {
    //EventType这是事件类型，StrategyID策略id，StrategyName策略名称，对哇
    this.getEventType("EventType");
    this.getEventType("StrategyName");
    this.getEventType("StrategyID");
    this.getAccountList();
    //获取交易账号列表
    //0期货，1证券
    this.getAccout(0);
    this.getAccout(1);
    //策略模板
    this.getKType();
    if (this.queryId) {
      this.getAccoutContent();
    }
  },
  methods: {
    fresh1() {
      this.getAccountList();
    },
    //获取策略详情
    getAccoutContent() {
      this.axios
        .post("api.v1/strategy/detail", {
          strategy_id: this.queryId
        })
        .then(response => {
          if (response.data.code == 0) {
            let data = response.data.data;
            this.strategy_name = data.strategy_name;
            this.strategy_type = data.strategy_type;
            this.k0 = data.trade_account_list.split(",")[0];
            this.k1 = data.trade_account_list.split(",")[1];
            let a = JSON.parse(data.python_strategy_data_config);
            this.ka = data.contract_list.split(",")[0];
            this.kb = data.contract_list.split(",")[1];
            this.p1 = a.price_diff_open;
            this.p2 = a.price_diff_close;
            this.p3 = a.trade_lots;
            this.p4 = a.trade_lots;
          } else {
            this.$alert(response.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取交易账号
    getAccout(type) {
      this.axios
        .post("/api.v1/account/options", {
          type: type
        })
        .then(response => {
          if (response.data.code == 0) {
            if (type == 0) {
              this.accountList0 = response.data.data;
            } else if (type == 1) {
              this.accountList1 = response.data.data;
            }
          } else {
            this.$alert(response.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取策略交易列表
    getKType() {
      this.axios
        .post("api.v1/strategy/type")
        .then(response => {
          if (response.data.code == 0) {
            this.aKList = response.data.data;
          } else {
            this.$alert(response.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    remoteMethoda(query) {
      if (query !== "") {
        // this.loading = true;
        // setTimeout(() => {
        //   this.loading = false;
        //   this.options = this.list.filter(item => {
        //     return item.label.toLowerCase()
        //       .indexOf(query.toLowerCase()) > -1;
        //   });
        // }, 200);
        //合约设置
        this.getAbList("1", query);
      } else {
        // this.options = [];
      }
    },
    remoteMethodb(query) {
      if (query !== "") {
        // this.loading = true;
        // setTimeout(() => {
        //   this.loading = false;
        //   this.options = this.list.filter(item => {
        //     return item.label.toLowerCase()
        //       .indexOf(query.toLowerCase()) > -1;
        //   });
        // }, 200);
        //合约设置
        this.getAbList("0", query);
      } else {
        // this.options = [];
      }
    },
    //获取合约列表
    getAbList(type, search) {
      this.axios
        .post("api.v1/strategy/contract", {
          type: type,
          search: search
        })
        .then(response => {
          if (response.data.code == 0) {
            if (type == "1") {
              this.aList = response.data.data;
            } else if (type == "0") {
              this.bList = response.data.data;
            }
          } else {
            this.$alert(response.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    editNewList() {
      this.addNewList(6, this.queryId);
    },
    //创建策略
    addNewList(type, id) {
      if (!id) {
        id = "";
      }
      this.axios
        .post("api.v1/strategy/operate", {
          //创建
          operate_type: type,
          strategy_id: id,
          //策略名称
          strategy_name: this.strategy_name,
          //策略模板
          strategy_type: this.strategy_type,
          //账号设置
          trade_accounts: this.k0 + "," + this.k1,
          //合约设置
          contracts: this.ka + "," + this.kb,
          strategy_data_config: {
            contract_a: this.ka.split("-")[1],
            contract_b: this.kb.split("-")[1],
            price_diff_open: this.p1,
            price_diff_close: this.p2,
            trade_lots: this.p3,
            max_lots: this.p4
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.$router.push({
              path: "index3"
            });
          } else {
            this.$alert(response.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //resetList重置
    resetList() {
      if (!this.queryId) {
        this.strategy_name = "";
        this.strategy_type = "";
        this.k0 = "";
        this.k1 = "";
        this.ka = "";
        this.kb = "";
        this.p1 = "";
        this.p2 = "";
        this.p3 = "";
        this.p4 = "";
      } else {
        this.getAccoutContent();
      }
    },
    back() {
      this.$router.push({
        path: "index3"
      });
    },
    //当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 4) {
        return [1, 2];
      }
    },
    formatter(row, column) {
      return row.address;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAccountList();
    },
    search() {
      this.getAccountList();
    },
    getAccountList() {
      this.refresh1 = true;
      setTimeout(() => {
        this.refresh1 = false;
      }, 1000);
      this.axios
        .post("/api.v1/strategy/log", {
          size: this.pageSzie,
          page: this.currentPage
        })
        .then(response => {
          if (response.data.code == 0) {
            this.tableData = response.data.data.rows;
            this.total = response.data.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getEventType: function(type) {
      this.axios
        .post("/three/search/field", {
          BrokerID: this.BrokerID,
          UserAccountID: this.UserAccountID,
          SearchField: type
        })
        .then(response => {
          if (response.data.code == 1) {
            if (type == "EventType") {
              this.EventType1 = response.data.data;
              console.log("类型", this.EventType1.constructor == Array);
              // console.log("事件类型", typeof(this.EventType1));
            } else if (type == "StrategyName") {
              this.StrategyName1 = response.data.data;
              // console.log("策略名称", this.StrategyName);
            } else if (type == "StrategyID") {
              this.StrategyID1 = response.data.data;
              // console.log("策略ID", this.StrategyID);
            }
            this.$forceUpdate();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.freshbtn2 {
  width: 20px;
  position: absolute;
  right: 70px;
  top: 626px;
  z-index: 1000000;
  cursor: pointer;
}
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
.leftpbox .lbox .lb1{
margin-top:7px;
}
.leftpbox .lbox .lb2{
  margin-top:-16px;
}
.leftpbox .lbox img {
  width: 22px;
}
.leftpbox .rbox {
  overflow: hidden;
  width: calc(100%-40px);
}
.jbox {
  margin-top: 51px;
  margin-left: 58px;
  width: 500px;
}
.jbox .jtitle {
  border-left: 3px solid #e46943;
  width: 100px;
  height: 18px;
  line-height: 18px;
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
.xbox {
  float: right;
  margin-right: 112px;
  margin-top:50px;
}
.xbox .img {
  float: left;
  margin-right: 16px;
  color: #333333;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}
.pagination {
  float: right;
  margin-top: 10px;
}
.tableheight {
  background-color: transparent;
  border-left: 6px solid #7a7a7a!important;
  border-right: 6px solid #7a7a7a!important;
  height: 100%;
  box-sizing: border-box;
}
</style>
<style>
.cxx .el-table__body-wrapper{
  border:1px solid #ededed;
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
.tableheight * {
  color: rgb(68, 71, 80) !important;
  font-size: 12px;
}
.tableheight .el-input__inner {
  height: 26px !important;
  line-height: 26px !important;
}
.tableheight .el-input__inner::placeholder {
  color: rgb(68, 71, 80) !important;
}
.tableheight .el-select .el-input .el-select__caret {
  margin-top: 8px !important;
}
.tableheight .el-select .el-input .el-select__caret.is-reverse {
  margin-top: -8px !important;
}
.tableheight .el-button {
  height: 26px !important;
  line-height: 1px !important;
}
.tableheight .el-icon-time {
  margin-top: -6px !important;
}
.tableheight .el-table__body-wrapper {
  background-color: #fff !important;
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
</style>
