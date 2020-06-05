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
            <el-input v-model="strategy_name" :disabled="queryId!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">策略模板</div>
            <el-select v-model="strategy_type" style="width:20%;" filterable clearable placeholder="策略模板" :disabled="queryId!=''">
              <el-option v-for="(item,index) in aKList" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
          </div>
        </div>
        <div class="jbox" v-if="strategy_type==8">
          <div class="jtitle">账号设置</div>
          <div class="j1">
            <div class="d1">证券交易账号</div>
            <el-select v-model="k0" style="width:20%;" filterable clearable placeholder="证券交易账号" :disabled="detail!=''">
              <el-option v-for="(item,index) in accountList0" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
          </div>
          <div class="j1">
            <div class="d1">期货交易账号</div>
            <el-select v-model="k1" style="width:20%;" filterable clearable placeholder="期货交易账号" :disabled="detail!=''">
              <el-option v-for="(item,index) in accountList1" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
          </div>
        </div>
        <div class="jbox" v-if="strategy_type==10">
          <div class="jtitle">账号设置</div>
          <div class="j1">
            <div class="d1">证券交易账号</div>
            <el-select v-model="k0" style="width:20%;" filterable clearable placeholder="证券交易账号" :disabled="detail!=''">
              <el-option v-for="(item,index) in accountList0" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
          </div>
        </div>
        <div class="jbox" v-if="strategy_type==11">
          <div class="jtitle">账号设置</div>
          <div class="j1">
            <div class="d1">证券交易账号</div>
            <el-select v-model="k0" style="width:20%;" filterable clearable placeholder="证券交易账号" :disabled="detail!=''">
              <el-option v-for="(item,index) in accountList0" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
          </div>
        </div>
        <div class="jbox" v-if="strategy_type==10">
          <div class="jtitle">网格设置</div>
          <div class="j1">
            <div class="d1">合约选择</div>
            <el-select v-model="contract_id" style="width:20%;" filterable remote :remote-method="remoteMethodb" clearable placeholder="请输入证券合约" :disabled="detail!=''">
              <el-option v-for="(item,index) in bList" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
          </div>
          <div class="j1">
            <div class="d1">起始价格</div>
            <el-input v-model="StartPriceOfGrid" :disabled="detail!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">网格间隔</div>
            <el-input v-model="PriceDiffOfGrid" :disabled="detail!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">网格格子数</div>
            <el-input v-model="LineNumberInSingleSideOfGrid" :disabled="detail!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">起始股数</div>
            <el-input v-model="StartLots" :disabled="detail!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">可用底仓数</div>
            <el-input v-model="BottomPositionNumReady" :disabled="detail!=''"></el-input>
          </div>
        </div>
        <div class="jbox" v-if="strategy_type==11">
          <div class="jtitle">网格设置</div>
          <div class="j1">
            <div class="d1">合约选择</div>
            <el-select v-model="contract_id" style="width:20%;" filterable remote :remote-method="remoteMethodb" clearable placeholder="请输入证券合约" :disabled="detail!=''">
              <el-option v-for="(item,index) in bList" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
          </div>
          <div class="j1">
            <div class="d1">起始价格</div>
            <el-input v-model="StartPriceOfGrid" :disabled="detail!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">网格间隔</div>
            <el-input v-model="PriceDiffOfGrid" :disabled="detail!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">网格上边界</div>
            <el-input v-model="UpLimitPriceOfGrid" :disabled="detail!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">网格下边界</div>
            <el-input v-model="DownLimitPriceOfGrid" :disabled="detail!=''"></el-input>
          </div>
        </div>
        <div class="jbox" style="float:right;margin-top:-410px;margin-right:400px;" v-if="strategy_type==10">
          <div class="jtitle">交易设置</div>
          <div class="j1">
            <div class="d1">每单交易股数</div>
            <el-input v-model="TradeLots" :disabled="detail!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">最大持仓股数</div>
            <el-input v-model="MaxLots" :disabled="detail!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">是否止盈止损</div>
            <el-select v-model="IsNeedStopWinOrStopLoss" style="width:20%;" filterable clearable :disabled="detail!=''">
              <el-option v-for="(item,index) in isBoolArray" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </div>
          <div class="j1">
            <div class="d1">止盈价格</div>
            <el-input v-model="StopWinPrice" :disabled="detail!=''||IsNeedStopWinOrStopLoss==0"></el-input>
          </div>
          <div class="j1">
            <div class="d1">止损价格</div>
            <el-input v-model="StopLossPrice" :disabled="detail!=''||IsNeedStopWinOrStopLoss==0"></el-input>
          </div>
          <div class="j1">
            <div class="d1">是否反弹买入</div>
            <el-select v-model="OpenAtrEnable" style="width:20%;" filterable clearable :disabled="detail!=''">
              <el-option v-for="(item,index) in isBoolArray" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </div>
          <div class="j1">
            <div class="d1">反弹买入浮动价格</div>
            <el-input v-model="OpenAtrPrice" :disabled="detail!=''||OpenAtrEnable==0"></el-input>
          </div>
          <div class="j1">
            <div class="d1">是否回落卖出</div>
            <el-select v-model="CloseAtrEnable" style="width:20%;" filterable clearable :disabled="detail!=''">
              <el-option v-for="(item,index) in isBoolArray" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </div>
          <div class="j1">
            <div class="d1">回落卖出浮动价格</div>
            <el-input v-model="CloseAtrPrice" :disabled="detail!=''||CloseAtrEnable==0"></el-input>
          </div>
        </div>
        <div class="jbox" style="float:right;margin-top:-410px;margin-right:400px;" v-if="strategy_type==11">
          <div class="jtitle">交易设置</div>
          <div class="j1">
            <div class="d1">单次交易手数</div>
            <el-input v-model="TradeLots" :disabled="detail!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">最大累计开仓次数</div>
            <el-input v-model="MaxOpenCounts" :disabled="detail!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">最大同时持仓手数</div>
            <el-input v-model="MaxLots" :disabled="detail!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">是否止盈止损</div>
            <el-select v-model="IsNeedStopWinOrStopLoss" style="width:20%;" filterable clearable :disabled="detail!=''">
              <el-option v-for="(item,index) in isBoolArray" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </div>
          <div class="j1">
            <div class="d1">止盈价格</div>
            <el-input v-model="StopWinPrice" :disabled="detail!=''||IsNeedStopWinOrStopLoss==0"></el-input>
          </div>
          <div class="j1">
            <div class="d1">起始手数</div>
            <el-input v-model="StartLots" :disabled="detail!=''||IsNeedStopWinOrStopLoss==0"></el-input>
          </div>
        </div>
        <div class="jbox" v-if="strategy_type==8">
          <div class="jtitle">合约设置</div>
          <div class="j1">
            <div class="d1">合约A</div>
            <el-select v-model="ka" style="width:20%;" filterable remote :remote-method="remoteMethodb" clearable placeholder="请输入证券合约" :disabled="detail!=''">
              <el-option v-for="(item,index) in bList" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
          </div>
          <div class="j1" style="margin-top:-1px;">
            <div class="d1">合约A价格放大倍数</div>
            <el-input v-model="a2" :disabled="detail!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">合约A报单每手乘数</div>
            <el-input v-model="a1" :disabled="detail!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">合约B</div>
            <el-select v-model="kb" style="width:20%;" filterable remote :remote-method="remoteMethoda" clearable placeholder="请输入期货合约" :disabled="detail!=''">
              <el-option v-for="(item,index) in aList" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
          </div>
          <div class="j1" style="margin-top:-1px;">
            <div class="d1">合约B价格放大倍数</div>
            <el-input v-model="b2" :disabled="detail!=''"></el-input>
          </div>
          <div class="j1">
            <div class="d1">合约B报单每手乘数</div>
            <el-input v-model="b1" :disabled="detail!=''"></el-input>
          </div>
        </div>
        <div class="jbox" style="float:right;margin-top:-410px;margin-right:400px;" v-if="strategy_type==8">
          <div class="jtitle">交易设置</div>
          <div class="j1">
            <div class="d1">开仓价差</div>
            <el-input v-model="p1" :disabled="detail!=''"></el-input>
            <span style="line-height:18px;">&nbsp;元</span>
          </div>
          <div class="j1">
            <div class="d1">平仓价差</div>
            <el-input v-model="p2" :disabled="detail!=''"></el-input>
            <span style="line-height:18px;">&nbsp;元</span>
          </div>
          <div class="j1">
            <div class="d1">每次交易对数</div>
            <el-input v-model="p3" :disabled="detail!=''"></el-input>
            <span style="line-height:18px;">&nbsp;对</span>
          </div>
          <div class="j1">
            <div class="d1">最大持仓对数</div>
            <el-input v-model="p4" :disabled="detail!=''"></el-input>
            <span style="line-height:18px;">&nbsp;对</span>
          </div>
        </div>
        <!--这里加个K线 start-->
        <div id="chart"></div>
        <!--这里加个K线 end-->
        <div class="xbox">
          <div class="img" @click="back">
            <img src="../../assets/x1.png" alt="">
            <div>返回</div>
          </div>
          <div class="img" @click="resetList" v-if="detail==''">
            <img src="../../assets/x2.png" alt="">
            <div>重置</div>
          </div>
          <div class="img" @click="addNewList(5)" v-if="!queryId&&detail==''">
            <img src="../../assets/x3.png" alt="">
            <div>保存</div>
          </div>
          <div class="img" @click="editNewList" v-if="queryId&&detail==''">
            <img src="../../assets/x4.png" alt="">
            <div>修改</div>
          </div>
        </div>
      </div>
    </div>
    <sameTable></sameTable>
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
      EventType1: [],
      StrategyName1: [],
      StrategyID1: [],
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
      a1: "",
      a2: "",
      b1: "",
      b2: "",
      p1: "",
      p2: "",
      p3: "",
      p4: "",
      queryId: "",
      refresh1: false,

      contract_id: "",
      StartPriceOfGrid: "",
      PriceDiffOfGrid: "",
      LineNumberInSingleSideOfGrid: "",
      StartLots: "",
      BottomPositionNumReady: "",
      TradeLots: "",
      MaxLots: "",
      TotalPositionNum: "",
      TotalTruePositionNum: "",
      IsNeedStopWinOrStopLoss: "",
      NextOpenPrice: "",
      StopWinPrice: "",
      StopLossPrice: "",
      OpenAtrEnable: "",
      OpenAtrPrice: "",
      CloseAtrEnable: "",
      CloseAtrPrice: "",
      isBoolArray: [
        {
          key: "0",
          value: "否"
        },
        {
          key: "1",
          value: "是"
        }
      ],
      UpLimitPriceOfGrid: "",
      DownLimitPriceOfGrid: "",
      MaxOpenCounts: ""
    };
  },
  created() {
    this.queryId = this.$route.query.strategyId || "";
    this.detail = this.$route.query.detail || "";
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
    //获取交易账号列表
    //0证券，1期货
    this.getAccout(0);
    this.getAccout(1);
    //策略模板
    this.getKType();
    if (this.queryId) {
      this.getAccoutContent();
    }
  },
  methods: {
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
            if (this.strategy_type == 8) {
              this.k0 = data.trade_account_list.split(",")[0];
              this.k1 = data.trade_account_list.split(",")[1];
              let a = JSON.parse(data.python_strategy_data_config);
              this.ka = data.contract_list.split(",")[0];
              this.kb = data.contract_list.split(",")[1];
              this.a1 = a.multiplier_order_num_a; //报单每手乘数
              this.a2 = a.multiplier_price_a; //价格放大倍数
              this.b1 = a.multiplier_order_num_b; //报单每手乘数
              this.b2 = a.multiplier_price_b; //价格放大倍数
              this.p1 = a.price_diff_open; //开仓价差
              this.p2 = a.price_diff_close; //平仓价差
              this.p3 = a.trade_lots; //每次交易对数
              this.p4 = a.max_lots; //最大持仓数
            } else if (this.strategy_type == 10) {
              this.k0 = data.trade_account_list.split(",")[0];
              let a = JSON.parse(data.python_strategy_data_config);
              this.contract_id = data.contract_list;
              this.StartPriceOfGrid = a.StartPriceOfGrid;
              this.PriceDiffOfGrid = a.PriceDiffOfGrid;
              this.LineNumberInSingleSideOfGrid =
                a.LineNumberInSingleSideOfGrid;
              this.StartLots = a.StartLots;
              this.BottomPositionNumReady = a.BottomPositionNumReady;
              this.TradeLots = a.TradeLots;
              this.MaxLots = a.MaxLots;
              this.TotalPositionNum = a.TotalPositionNum;
              this.TotalTruePositionNum = a.TotalTruePositionNum;
              this.IsNeedStopWinOrStopLoss = a.IsNeedStopWinOrStopLoss;
              this.NextOpenPrice = a.NextOpenPrice;
              this.StopWinPrice = a.StopWinPrice;
              this.StopLossPrice = a.StopLossPrice;
              this.OpenAtrEnable = a.OpenAtrEnable;
              this.CloseAtrEnable = a.CloseAtrEnable;
              this.OpenAtrPrice = a.OpenAtrPrice;
              this.CloseAtrPrice = a.CloseAtrPrice;
            } else if (this.strategy_type == 11) {
              this.k0 = data.trade_account_list.split(",")[0];
              let a = JSON.parse(data.python_strategy_data_config);
              console.log("我是数据啊", a);
              this.contract_id = data.contract_list;
              this.StartPriceOfGrid = a.StartPriceOfGrid;
              this.PriceDiffOfGrid = a.PriceDiffOfGrid;
              this.UpLimitPriceOfGrid = a.UpLimitPriceOfGrid;
              this.DownLimitPriceOfGrid = a.DownLimitPriceOfGrid;
              this.TradeLots = a.TradeLots;
              this.MaxOpenCounts = a.MaxOpenCounts;
              this.MaxLots = a.MaxLots;
              this.IsNeedStopWinOrStopLoss = a.IsNeedStopWinOrStopLoss;
              this.StopWinPrice = a.StopWinPrice;
              this.StartLots = a.StartLots;
            } else {
              this.$alert(response.data.msg);
            }
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
        //合约设置
        this.getAbList("1", query);
      } else {
        // this.options = [];
      }
    },
    remoteMethodb(query) {
      if (query !== "") {
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
      if (this.strategy_type == 8) {
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
              multiplier_order_num_a: this.a1,
              multiplier_price_a: this.a2,
              multiplier_order_num_b: this.b1,
              multiplier_price_b: this.b2,
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
      } else if (this.strategy_type == 10) {
        if (this.StartLots <= 0 || this.StartLots % 100 > 0) {
          this.$alert("起始股数必须是100的倍数，且大于等于100");
          return false;
        }
        if (this.TradeLots <= 0 || this.TradeLots % 100 > 0) {
          this.$alert("每单交易股数必须是100的倍数，且大于等于100");
          return false;
        }
        if (this.MaxLots <= 0 || this.MaxLots % 100 > 0) {
          this.$alert("最大持仓股数必须是100的倍数，且大于等于100");
          return false;
        }
        if (this.IsNeedStopWinOrStopLoss == 0) {
          this.StopWinPrice = 0;
          this.StopLossPrice = 0;
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
            trade_accounts: this.k0,
            //合约设置
            contracts: this.contract_id,

            strategy_data_config: {
              contract_id: this.contract_id.split("-")[1],
              StartPriceOfGrid: this.StartPriceOfGrid,
              PriceDiffOfGrid: this.PriceDiffOfGrid,
              LineNumberInSingleSideOfGrid: this.LineNumberInSingleSideOfGrid,
              StartLots: this.StartLots,
              BottomPositionNumReady: this.BottomPositionNumReady,
              TradeLots: this.TradeLots,
              MaxLots: this.MaxLots,
              TotalPositionNum: this.TotalPositionNum,
              TotalTruePositionNum: this.TotalTruePositionNum,
              IsNeedStopWinOrStopLoss: this.IsNeedStopWinOrStopLoss,
              NextOpenPrice: this.NextOpenPrice,
              StopWinPrice: this.StopWinPrice,
              StopLossPrice: this.StopLossPrice,
              OpenAtrEnable: this.OpenAtrEnable,
              CloseAtrEnable: this.CloseAtrEnable,
              OpenAtrPrice: this.OpenAtrPrice,
              CloseAtrPrice: this.CloseAtrPrice
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
      } else if (this.strategy_type == 11) {
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
            trade_accounts: this.k0,
            //合约设置
            contracts: this.contract_id,
            strategy_data_config: {
              contract_id: this.contract_id.split("-")[1],
              StartPriceOfGrid: this.StartPriceOfGrid,
              PriceDiffOfGrid: this.PriceDiffOfGrid,
              UpLimitPriceOfGrid: this.UpLimitPriceOfGrid,
              DownLimitPriceOfGrid: this.DownLimitPriceOfGrid,
              TradeLots: this.TradeLots,
              MaxOpenCounts: this.MaxOpenCounts,
              MaxLots: this.MaxLots,
              IsNeedStopWinOrStopLoss: this.IsNeedStopWinOrStopLoss,
              StopWinPrice: this.StopWinPrice,
              StartLots: this.StartLots
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
      }
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

        this.contract_id = "";
        this.StartPriceOfGrid = "";
        this.PriceDiffOfGrid = "";
        this.LineNumberInSingleSideOfGrid = "";
        this.StartLots = "";
        this.BottomPositionNumReady = "";
        this.TradeLots = "";
        this.MaxLots = "";
        this.TotalPositionNum = "";
        this.TotalTruePositionNum = "";
        this.IsNeedStopWinOrStopLoss = "";
        this.NextOpenPrice = "";
        this.StopWinPrice = "";
        this.StopLossPrice = "";
        this.OpenAtrEnable = "";
        this.CloseAtrEnable = "";
        this.OpenAtrPrice = "";
        this.CloseAtrPrice = "";
      } else {
        this.getAccoutContent();
      }
    },
    back() {
      this.$router.push({
        path: "index3"
      });
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
.leftpbox .rbox {
  overflow: hidden;
  width: calc(100%-40px);
}
.jbox {
  margin-top: 21px;
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
  width: 120px;
}
.xbox {
  float: right;
  margin-right: 112px;
  margin-top: 50px;
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
  border-left: 6px solid #7a7a7a !important;
  border-right: 6px solid #7a7a7a !important;
  height: 100%;
  box-sizing: border-box;
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
</style>
