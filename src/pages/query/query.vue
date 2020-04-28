<template>
    <div>
        <!-- <div v-if="path=='/index4'" style="font-size:100px;color:#000;text-align:center;">委托暂无</div>
        <div v-if="path=='/index5'" style="font-size:100px;color:#000;text-align:center;">成交暂无</div> -->
        <div class="container query">
            <div class="template-top template-top3">
                <div class="title">
                    <span @click="type1" :class="{topactive:typetype==1}">期货查询</span>
                    <span @click="type0" :class="{topactive:typetype==0}">证券查询</span>
                </div>
            </div>
            <div class="searchBox">
                <div class="leftSearch">
                    <label>当前账号</label>
                    <el-select v-model="zhanghao" filterable clearable placeholder="当前账号">
                        <el-option v-for="(item,index) in zhList" :key="index" :label="item.v" :value="item.k"></el-option>
                    </el-select>
                </div>
                <!-- <div class="rightSearch">
                <el-select v-model="value1" filterable clearable placeholder="策略名称">
                    <el-option v-for="(item,index) in StrategyName1" :key="index" :label="item.v" :value="item.k"></el-option>
                </el-select>
                <el-select v-model="value2" filterable clearable placeholder="策略ID">
                    <el-option v-for="(item,index) in StrategyID1" :key="index" :label="item.v" :value="item.k"></el-option>
                </el-select>
                <el-select v-model="value3" filterable clearable placeholder="事件类型">
                    <el-option v-for="(item,index) in EventType1" :key="index" :label="item.v" :value="item.k"></el-option>
                </el-select>
                <el-date-picker v-model="value4" type="datetime" placeholder="发生时间"></el-date-picker>
                <el-button @click="search">搜索</el-button>
            </div> -->
                <div class="rightSearch" v-if="typetype==0">
                    <div class="inputS">
                        <label>产品编号：</label>
                        <el-input type="text" :clearable="true" placeholder="请输入产品编号" v-model="productCode" />
                    </div>
                    <div class="inputS">
                        <label>股票代码：</label>
                        <el-input type="text" :clearable="true" placeholder="请输入股票代码" v-model="stockCode" />
                    </div>
                    <el-button @click="search">搜索</el-button>
                </div>
                <div class="rightSearch" v-if="typetype==1">
                    <div class="inputS">
                        <label>账户名：</label>
                        <el-input type="text" :clearable="true" placeholder="请输入账户名" v-model="UserAccountID" />
                    </div>
                    <div class="inputS">
                        <label>合约代码：</label>
                        <el-input type="text" :clearable="true" placeholder="请输入合约代码" v-model="ContractID" />
                    </div>
                    <el-button @click="search">搜索</el-button>
                </div>
            </div>
            <div class="tableheight">
                <img src="../../assets/refr.png" alt="" :class="{'refresh-trigger': refreshNew,freshbtn2:true}" @click="fresh1">
                <el-table :data="tableDataNew" height="720" stripe class="user-table" :span="24" :row-style="{height:'40px'}" :header-row-style="{height:'32px'}" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
                    <el-table-column v-for="(item,index) in name0" :key="index" :prop="item.key" :label="item.value" v-if="typetype==0&&path=='/index6'" align="center"></el-table-column>
                    <el-table-column v-for="(item,index) in name1" :key="index" :prop="item.key" :label="item.value" v-if="typetype==1&&path=='/index6'" width="100" align="center"></el-table-column>
                    <el-table-column v-for="(item,index) in name3" :key="index" :prop="item.key" :label="item.value" v-if="typetype==1&&path=='/index4'" width="100" align="center"></el-table-column>
                    <el-table-column v-for="(item,index) in name4" :key="index" :prop="item.key" :label="item.value" v-if="typetype==1&&path=='/index5'" width="100" align="center"></el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination :current-page.sync="currentPage2" layout="prev, pager, next" :page-size="pageSzie2" :pager-count="5" :total="totalNew" @current-change="handleCurrentChange2"></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableDataNew: [],
      currentPage2: 1,
      pageSzie2: 31,
      totalNew: 1,
      refreshNew: false,
      EventType1: [],
      freshBeel: false,
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      EventType1: [],
      StrategyName1: [],
      StrategyID1: [],
      typetype: 1,
      typetypename: "期货",
      zhanghao: "",
      zhList: [],
      k: "",
      productCode: "",
      stockCode: "",
      UserAccountID: "",
      ContractID: "",
      name0: [
        {
          key: "accountCode",
          value: "会员ID"
        },
        {
          key: "accountName",
          value: "会员名称"
        },
        {
          key: "costPrice",
          value: "参考成本"
        },
        {
          key: "lastPrice",
          value: "市价"
        },
        {
          key: "productCode",
          value: "产品编号"
        },
        {
          key: "profit",
          value: "参考盈亏"
        },
        {
          key: "stockCnt",
          value: "持仓数量"
        },
        {
          key: "stockCntAble",
          value: "可用数量"
        },
        {
          key: "stockCode",
          value: "股票代码"
        },
        {
          key: "stockName",
          value: "股票名称"
        }
      ],
      name1: [
        {
          key: "trading_day",
          value: "交易日"
        },
        {
          key: "position_date_desc",
          value: "持仓日期类型"
        },
        {
          key: "user_account_id",
          value: "账户名"
        },
        {
          key: "fund_account_id",
          value: "资金账户"
        },
        {
          key: "contract_id",
          value: "合约代码"
        },
        {
          key: "buy_or_sell_desc",
          value: "买卖方向"
        },
        {
          key: "position_num",
          value: "持仓数量"
        },
        {
          key: "open_price",
          value: "开仓均价"
        },
        {
          key: "use_margin",
          value: "占用的保证金"
        },
        {
          key: "position_profit",
          value: "持仓盈亏"
        },
        {
          key: "hedge_flag_desc",
          value: "投机套保标志"
        },
        {
          key: "exchange_id",
          value: "交易所代码"
        },
        {
          key: "volume_multiple",
          value: "合约乘数"
        },
        {
          key: "broker_id",
          value: "经纪公司代码"
        },
        {
          key: "yd_position",
          value: "上日持仓"
        },
        {
          key: "long_frozen",
          value: "多头冻结"
        },
        {
          key: "short_frozen",
          value: "空头冻结"
        },
        {
          key: "long_frozen_amount",
          value: "开仓冻结金额多头"
        },
        {
          key: "short_frozen_amount",
          value: "开仓冻结金额空头"
        },
        {
          key: "open_volume",
          value: "开仓量"
        },
        {
          key: "close_volume",
          value: "平仓量"
        },
        {
          key: "open_amount",
          value: "开仓金额"
        },
        {
          key: "close_amount",
          value: "平仓金额"
        },
        {
          key: "position_cost",
          value: "持仓成本"
        },
        {
          key: "pre_margin",
          value: "上次占用的保证金"
        },
        {
          key: "frozen_margin",
          value: "冻结的保证金"
        },
        {
          key: "frozen_cash",
          value: "冻结的资金"
        },
        {
          key: "frozen_commission",
          value: "冻结的手续费"
        },
        {
          key: "cash_in",
          value: "资金差额"
        },
        {
          key: "commission",
          value: "手续费"
        },
        {
          key: "close_profit",
          value: "平仓盈亏"
        },
        {
          key: "pre_settlement_price",
          value: "上次结算价"
        },
        {
          key: "settlement_price",
          value: "本次结算价"
        },
        {
          key: "settlement_id",
          value: "结算编号"
        },
        {
          key: "open_cost",
          value: "开仓成本"
        },
        {
          key: "exchange_margin",
          value: "交易所保证金"
        },
        {
          key: "comb_position",
          value: "组合成交形成的持仓"
        },
        {
          key: "comb_long_frozen",
          value: "组合多头冻结"
        },
        {
          key: "comb_short_frozen",
          value: "组合空头冻结"
        },
        {
          key: "close_profit_by_date",
          value: "逐日盯市平仓盈亏"
        },
        {
          key: "close_profit_by_trade",
          value: "逐笔对冲平仓盈亏"
        },
        {
          key: "today_position",
          value: "今日持仓"
        },
        {
          key: "margin_rate_by_money",
          value: "保证金率"
        },
        {
          key: "margin_rate_by_volume",
          value: "保证金率(按手数)"
        },
        {
          key: "strike_frozen",
          value: "执行冻结"
        },
        {
          key: "strike_frozen_amount",
          value: "执行冻结金额"
        },
        {
          key: "abandon_frozen",
          value: "放弃执行冻结"
        },
        {
          key: "yd_strike_frozen",
          value: "执行冻结的昨仓"
        },
        {
          key: "invest_unit_id",
          value: "投资单元代码"
        }
      ],
      name3: [
        {
          key: "invest_unit_id",
          value: "策略编号"
        },
        {
          key: "order_req_no",
          value: "请求编号"
        },
        {
          key: "status_msg",
          value: "状态信息"
        },
        {
          key: "order_req_no",
          value: "请求编号"
        },
        {
          key: "user_account_id",
          value: "账户名称"
        },
        {
          key: "fund_account_id",
          value: "资金账户名"
        },
        {
          key: "contract_id",
          value: "合约代码"
        },
        {
          key: "buy_or_sell_desc",
          value: "买卖方向"
        },
        {
          key: "open_or_cover",
          value: "开平方向"
        },
        {
          key: "order_num",
          value: "报单数量"
        },
        {
          key: "price",
          value: "价格"
        },
        {
          key: "state",
          value: "报单状态"
        },
        {
          key: "match_num",
          value: "成交数量"
        },
        {
          key: "active_user_id",
          value: "操作用户代码"
        },
        {
          key: "order_no",
          value: "报单编号"
        },
        {
          key: "comb_hedge_flag_desc",
          value: "组合投机套保标志"
        },
        {
          key: "order_time",
          value: "委托日期时间"
        },
        {
          key: "user_req_no",
          value: "用户的请求编号"
        },
        {
          key: "broker_id",
          value: "经纪公司代码"
        },
        {
          key: "exchange_id",
          value: "交易所代码"
        },
        {
          key: "order_ref",
          value: "报单引用"
        },
        {
          key: "order_req_no",
          value: "请求编号"
        },
        {
          key: "order_req_no",
          value: "请求编号"
        },
        {
          key: "order_price_type",
          value: "请求编号"
        },
        {
          key: "order_req_no",
          value: "报单价格条件"
        },
        {
          key: "time_condition",
          value: "有效期类型"
        },
        {
          key: "gtd_date",
          value: "GTD日期"
        },
        {
          key: "volume_condition",
          value: "成交量类型"
        },
        {
          key: "min_volume",
          value: "最小成交量"
        },
        {
          key: "contingent_condition",
          value: "触发条件"
        },
        {
          key: "stop_price",
          value: "止损价"
        },
        {
          key: "force_close_reason",
          value: "强平原因"
        },
        {
          key: "is_auto_suspend",
          value: "自动挂起标志"
        },
        {
          key: "business_unit",
          value: "业务单元"
        },
        {
          key: "order_local_id",
          value: "本地报单编号"
        },
        {
          key: "participant_id",
          value: "会员代码"
        },
        {
          key: "client_id",
          value: "客户代码"
        },
        {
          key: "exchange_inst_id",
          value: "合约在交易所的代码"
        },
        {
          key: "trader_id",
          value: "交易所交易员代码"
        },
        {
          key: "install_id",
          value: "安装编号"
        },
        {
          key: "order_submit_status",
          value: "报单提交状态"
        },
        {
          key: "notify_sequence",
          value: "报单提示序号"
        },
        {
          key: "trading_day",
          value: "交易日"
        },
        {
          key: "settlement_id",
          value: "结算编号"
        },
        {
          key: "order_source",
          value: "报单来源"
        },
        {
          key: "order_type",
          value: "报单类型"
        },
        {
          key: "volume_total",
          value: "剩余数量"
        },
        {
          key: "active_time",
          value: "激活时间"
        },
        {
          key: "suspend_time",
          value: "挂起时间"
        },
        {
          key: "update_time",
          value: "最后修改时间"
        },
        {
          key: "cancel_time",
          value: "撤销时间"
        },
        {
          key: "active_trader_id",
          value: "最后修改交易所交易员代码"
        },
        {
          key: "clearing_part_id",
          value: "结算会员编号"
        },
        {
          key: "sequence_no",
          value: "序号"
        },
        {
          key: "front_id",
          value: "前置编号"
        },
        {
          key: "user_product_info",
          value: "用户端产品信息"
        },
        {
          key: "user_force_close",
          value: "用户强平标志"
        },
        {
          key: "broker_order_seq",
          value: "经纪公司报单编号"
        },
        {
          key: "relative_order_sys_id",
          value: "相关报单"
        },
        {
          key: "zce_total_traded_volume",
          value: "郑商所成交数量"
        },
        {
          key: "is_swap_order",
          value: "互换单标志"
        },
        {
          key: "branch_id",
          value: "营业部编号"
        },
        {
          key: "account_id",
          value: "报单提示序号"
        },
        {
          key: "currency_id",
          value: "币种代码"
        },
        {
          key: "ip_address",
          value: "IP地址"
        },
        {
          key: "mac_address",
          value: "Mac地址"
        },
        {
          key: "error_msg",
          value: "响应信息中的错误信息"
        },
        {
          key: "error_id",
          value: "响应信息中的错误代码"
        },
        {
          key: "n_request_id",
          value: "报单录入函数请求编号"
        }
      ],
      name4: [
        {
          key: "invest_unit_id",
          value: "策略编号"
        },
        {
          key: "match_no",
          value: "成交编号"
        },
        {
          key: "user_account_id",
          value: "账户名"
        },
        {
          key: "fund_account_id",
          value: "资金账户名"
        },
        {
          key: "contract_id",
          value: "合约代码"
        },
        {
          key: "buy_or_sell_desc",
          value: "买卖方向"
        },
        {
          key: "open_or_cover_desc",
          value: "开平方向"
        },
        {
          key: "match_num",
          value: "成交数量"
        },
        {
          key: "match_price",
          value: "成交价格"
        },
        {
          key: "stop_price",
          value: "策略网格线价格"
        },
        {
          key: "commission",
          value: "手续费"
        },
        {
          key: "fund_account_commission",
          value: "资金账户手续费"
        },
        {
          key: "close_profit",
          value: "平仓盈亏"
        },
        {
          key: "hedge_flag",
          value: "投机套保标志"
        },
        {
          key: "trade_time",
          value: "成交日期时间"
        },
        {
          key: "order_no",
          value: "报单编号"
        },
        {
          key: "broker_id",
          value: "经纪公司代码"
        },
        {
          key: "exchange_id",
          value: "交易所代码"
        },
        {
          key: "order_ref",
          value: "报单引用"
        },
        {
          key: "participant_id",
          value: "会员代码"
        },
        {
          key: "client_id",
          value: "客户代码"
        },
        {
          key: "trading_role",
          value: "交易角色"
        },
        {
          key: "exchange_inst_id",
          value: "合约在交易所的代码"
        },
        {
          key: "order_local_id",
          value: "本地报单编号"
        },
        {
          key: "clearing_part_id",
          value: "结算会员编号"
        },
        {
          key: "business_unit",
          value: "业务单元"
        },
        {
          key: "sequence_no",
          value: "序号"
        },
        {
          key: "trading_day",
          value: "交易日"
        },
        {
          key: "settlement_id",
          value: "结算编号"
        },
        {
          key: "broker_order_seq",
          value: "经纪公司报单编号"
        },
        {
          key: "trade_source",
          value: " 成交来源"
        }
      ],
      path: "",
      url: ""
    };
  },
  created() {
    this.path = this.$route.path;
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
    },
    zhanghao: {
      handler(newVal, oldVal) {
        this.k = newVal;
        console.log("新值", newVal, this.k);
        this.getAccountListNew();
      },
      deep: true
    },
    typetype: {
      handler(newVal, oldVal) {
        if (newVal == 1) {
          this.getAccout(1);
        } else {
          this.getAccout(0);
        }
      },
      deep: true
    },
    "$route.path": {
      handler(newVal, oldVal) {
        this.path = newVal;
        console.log("我是路由", this.path);
        if (newVal == "/index4") {
          //委托查询
          this.url = "/api.v1/order/list";
          this.getAccountListNew();
        } else if (newVal == "/index5") {
          //成交查询
          this.url = "/api.v1/deal/list";
          this.getAccountListNew();
        } else if (newVal == "/index6") {
          //持仓查询
          this.url = "/api.v1/hold/list";
          this.getAccountListNew();
        }
      },
      deep: true
    }
  },
  mounted() {
    //EventType这是事件类型，StrategyID策略id，StrategyName策略名称，对哇
    // this.getEventType("EventType");
    // this.getEventType("StrategyName");
    // this.getEventType("StrategyID");
    if (this.typetype == 1) {
      this.getAccout(1);
    } else {
      this.getAccout(0);
    }
    if (this.path == "/index4") {
      //委托查询
      this.url = "/api.v1/order/list";
    } else if (this.path == "/index5") {
      //成交查询
      this.url = "/api.v1/deal/list";
    } else if (this.path == "/index6") {
      //持仓查询
      this.url = "/api.v1/hold/list";
    }
  },
  methods: {
    type0() {
      this.typetype = 0;
      this.typetypename = "证券";
      this.getAccout(0);
    },
    type1() {
      this.typetype = 1;
      this.typetypename = "期货";
      this.getAccout(1);
    },
    //获取交易账号
    getAccout(type) {
      this.axios
        .post("/api.v1/account/options", {
          type: type
        })
        .then(response => {
          if (response.data.code == 0) {
            this.zhList = response.data.data;
            this.zhanghao = this.zhList[0].k || "";
            this.k = this.zhanghao || "";
            console.log("k", this.zhList, "k1", this.zhanghao, "k3", this.k);
          } else {
            this.$alert(response.data.msg);
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
    fresh1() {
      this.getAccountListNew();
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val;
      this.getAccountListNew();
    },
    search() {
      this.getAccountListNew();
    },
    getAccountListNew() {
      this.refreshNew = true;
      let options;
      //0证券，1期货
      //持仓查询
      if (this.path == "/index6") {
        if (this.typetype == 0) {
          options = {
            size: this.pageSzie2,
            page: this.currentPage2,
            k: this.k,
            productCode: this.productCode,
            stockCode: this.stockCode
          };
        } else {
          options = {
            size: this.pageSzie2,
            page: this.currentPage2,
            k: this.k,
            filter: {
              UserAccountID: this.UserAccountID,
              ContractID: this.ContractID
            },
            option: { UserAccountID: "=", ContractID: "=" }
          };
        }
      }
      //委托查询
      if (this.path == "/index4") {
        if (this.typetype == 0) {
          options = {
            size: this.pageSzie2,
            page: this.currentPage2,
            k: this.k,
            filter: {
              UserAccountID: this.UserAccountID,
              ContractID: this.ContractID
            },
            option: { UserAccountID: "=", ContractID: "=" }
          };
        } else {
          options = {
            size: this.pageSzie2,
            page: this.currentPage2,
            k: this.k,
            filter: {
              UserAccountID: this.UserAccountID,
              ContractID: this.ContractID
            },
            option: { UserAccountID: "=", ContractID: "=" }
          };
        }
      }
      //成交查询
      if (this.path == "/index5") {
        if (this.typetype == 0) {
          options = {
            size: this.pageSzie2,
            page: this.currentPage2,
            k: this.k,
            filter: {
              UserAccountID: this.UserAccountID,
              ContractID: this.ContractID
            },
            option: { UserAccountID: "=", ContractID: "=" }
          };
        } else {
          options = {
            size: this.pageSzie2,
            page: this.currentPage2,
            k: this.k,
            filter: {
              UserAccountID: this.UserAccountID,
              ContractID: this.ContractID
            },
            option: { UserAccountID: "=", ContractID: "=" }
          };
        }
      }
      this.axios
        .post(this.url, options)
        .then(response => {
          if (response.data.code == 0) {
            this.tableDataNew = response.data.data.rows;
            console.log("底部数据", this.tableData);
            this.totalNew = response.data.data.total;
            setTimeout(() => {
              this.refreshNew = false;
              this.freshBeel = false;
            }, 1000);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getEventType: function(type) {
      this.axios
        .post("/api.v1/strategy/search", {
          field: type
        })
        .then(response => {
          if (response.data.code == 0) {
            if (type == "EventType") {
              this.EventType1 = response.data.data;
              console.log("我我我", this.EventType1);
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
.container {
  width: calc(100%-307px);
  height: 100vh;
  background: #fff;
  padding: 45px 91px 0 57px;
  box-sizing: border-box;
  overflow: hidden;
  border: 6px solid #7a7a7a;
}
.tableheight {
  background-color: transparent;
  width: 100%;
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
  right: 96px;
  top: 98px;
  z-index: 1000000;
  cursor: pointer;
}
.pagination {
  float: right;
  margin-top: 10px;
}
.searchBox {
  width: 100%;
  margin-bottom: 35px;
  overflow: hidden;
}
.searchBox * {
  color: #333333;
}
.searchBox .leftSearch {
  float: left;
  width: 441px;
  height: 23px;
  border: 1px solid #ededed;
}
.searchBox .leftSearch label {
  width: 120px;
  display: block;
  text-align: center;
  float: left;
  height: 23px;
  line-height: 23px;
}

.searchBox .rightSearch {
  float: right;
  height: 23px;
  line-height: 23px;
  margin-right: 30px;
}
.searchBox .rightSearch .inputS {
  float: left;
  height: 23px;
  line-height: 23px;
  margin-right: 10px;
}
.searchBox .rightSearch .inputS * {
  float: left;
}
.searchBox .rightSearch .inputS input {
  height: 23px;
  line-height: 23px;
  font-size: 14px;
  border-bottom: 1px solid #ededed;
}
</style>
<style>
.searchBox .rightSearch .inputS .el-input {
  width: auto !important;
}
.tableheight * {
  color: rgb(68, 71, 80) !important;
  font-size: 12px;
}
/* .tableheight .el-input__inner {
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
} */
.tableheight .el-button {
  height: 26px !important;
  line-height: 1px !important;
  margin-right: 70px !important;
  padding-left: 10px !important;
  padding-right: 10px !important;
  position: relative;
  top: -20px;
}
/* .tableheight .el-icon-time {
  margin-top: -6px !important;
}
.tableheight .el-table__body-wrapper {
  background-color: #fff !important;
} */
.searchBox .leftSearch .el-select {
  float: left;
  width: 320px;
}

.searchBox .leftSearch .el-select input {
  height: 23px;
  line-height: 23px;
  box-sizing: border-box;
}
.searchBox .leftSearch .el-select input::placeholder {
  color: #333333;
}
.searchBox .rightSearch .el-select {
  height: 25px;
  line-height: 25px;
  box-sizing: border-box;
}
.searchBox .rightSearch .el-input--suffix {
  box-sizing: border-box;
  height: 25px;
  line-height: 25px;

  border: 1px solid #ededed;
}
.searchBox .rightSearch .el-input--suffix .el-input__inner {
  height: 20px;
  line-height: 20px;
  box-sizing: border-box;
}
.searchBox .rightSearch .el-input--suffix .el-input__inner::placeholder {
  color: #333333;
}
.searchBox .rightSearch .el-button {
  padding: 4px 10px;
}
</style>
