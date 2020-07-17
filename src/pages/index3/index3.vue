<template>
  <div class="biglbox">
    <div class="leftcontanier">
      <div class="tobox">
        <!-- <div id="chart1"></div> -->
        <div class="kurl">
          <span v-for="(item,index) in kurl" :key="index" @click="changeK(item.value)" :class="{kcolor:whok==item.value}">{{item.key}}</span>
        </div>
        <iframe v-if="cUrl" :src="cUrl" frameborder="0" height="450px" width="100%"></iframe>
      </div>
      <div class="bobox">
        <div class="dnfbox">
          <div class="leftbox">
            <div class="dnftitle">{{strategyName}}-{{strategyTypeText}}</div>
            <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
            <div id="myChart" :style="{width: '100%', height: '364px'}"></div>
          </div>
          <div class="rightbox aaaa" v-if="tableData.length>0">
            <el-table :data="tableData" style="width: 90%!important;margin-left:5%;" :height="350" :span="24" :row-style="{height:'32px'}" :header-row-style="{height:'32px'}" :default-sort="{prop: 'line_index', order: 'descending'}" :cell-style="cellStyle1" :header-cell-style="headerCellStyle1" :border="true" stripe>
              <!-- <el-table-column prop="line_index" label="网格线索引" sortable align="center"></el-table-column> -->
              <el-table-column show-overflow-tooltip label="网格线索引" align="center">
                <template slot-scope="scope">
                  <div style="color:rgb(0,122,204);" v-if="scope.row.theory_position_num>0||scope.row.true_position_num>0">{{scope.row.line_index}}</div>
                  <div v-if="scope.row.theory_position_num<=0&&scope.row.true_position_num<=0">{{scope.row.line_index}}</div>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="line_price" label="网格线价格" sortable align="center"></el-table-column> -->
              <el-table-column show-overflow-tooltip label="网格线价格" align="center">
                <template slot-scope="scope">
                  <div style="color:rgb(0,122,204);" v-if="scope.row.theory_position_num>0||scope.row.true_position_num>0">{{scope.row.line_price}}</div>
                  <div v-if="scope.row.theory_position_num<=0&&scope.row.true_position_num<=0">{{scope.row.line_price}}</div>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="theory_position_num" label="理论持仓数量" sortable align="center"></el-table-column> -->
              <el-table-column show-overflow-tooltip label="理论持仓数量" align="center">
                <template slot-scope="scope">
                  <div style="color:rgb(0,122,204);" v-if="scope.row.theory_position_num>0||scope.row.true_position_num>0">{{scope.row.theory_position_num}}</div>
                  <div v-if="scope.row.theory_position_num<=0&&scope.row.true_position_num<=0">{{scope.row.theory_position_num}}</div>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="true_position_num" label="实际持仓数量" sortable align="center"></el-table-column> -->
              <el-table-column show-overflow-tooltip label="实际持仓数量" align="center">
                <template slot-scope="scope">
                  <div style="color:rgb(0,122,204);" v-if="scope.row.theory_position_num>0||scope.row.true_position_num>0">{{scope.row.true_position_num}}</div>
                  <div v-if="scope.row.theory_position_num<=0&&scope.row.true_position_num<=0">{{scope.row.true_position_num}}</div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination :current-page.sync="anotherCurrentPage" layout="prev, pager, next" :page-size="anotherPageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange11"></el-pagination>
            </div>
          </div>
          <div class="rightbox aaaa" v-if="tableData.length<=0">
            <el-table :data="tableData" style="width: 100%;" :height="368" :span="24" :row-style="{height:'36px'}" :header-row-style="{height:'32px'}" :default-sort="{prop: 'line_index', order: 'descending'}" :cell-style="cellStyle1" :header-cell-style="headerCellStyle1" :border="true" stripe>
              <el-table-column label="网格线索引" sortable align="center"></el-table-column>
              <el-table-column label="网格线价格" sortable align="center"></el-table-column>
              <el-table-column label="理论持仓数量" sortable align="center"></el-table-column>
              <el-table-column label="实际持仓数量" sortable align="center"></el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination :current-page.sync="anotherCurrentPage" layout="prev, pager, next" :page-size="anotherPageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange11"></el-pagination>
            </div>
          </div>
          <div>
            <transition name="fade">
              <loading v-if="isLoading"></loading>
            </transition>
          </div>
        </div>
      </div>
    </div>
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
                <el-input type="text" placeholder="搜索策略名称" v-model="keyword" :clearable="true" />
                <div class="search-img" @click="searchA"></div>
              </div>
              <div class="addnow" @click="tonew">新建策略</div>
            </div>
          </div>
          <div>
            <img src="../../assets/refr.png" alt="" :class="{'refresh-trigger': refresh,freshbtn1:true}" @click="fresh">
            <el-table :border="true" highlight-current-row :row-style="{height:'36px'}" :data="tableData1" stripe class="user-table bbbb" style="width: 100%;background-color:#fff;" height='400' :header-cell-style="headerCellStyle" @row-click="handdle">
              <el-table-column show-overflow-tooltip prop="strategy_name" label="策略名称" align="center"></el-table-column>
              <el-table-column prop="strategy_id" label="策略ID" width="140"></el-table-column>
              <el-table-column prop="strategy_type_desc" label="策略类型" width="260"></el-table-column>
              <el-table-column show-overflow-tooltip prop="strategy_create_time" label="创建时间" align="center" width="160"></el-table-column>
              <el-table-column show-overflow-tooltip prop="strategy_last_modify_time" label="最后修改时间" align="center" width="160"></el-table-column>
              <el-table-column show-overflow-tooltip label="运行状态" align="center" width="130">
                <template slot-scope="scope">
                  <div>
                    {{scope.row.strategy_status_desc}}
                  </div>
                </template>
              </el-table-column>

              <el-table-column show-overflow-tooltip label="操作" align="center" width="300">
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
  </div>
</template>

<script>
import sameTable from "@/components/sameTable1";
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
      isFresh: false,
      //以下都是策略图表类的
      msg: "Welcome to Your Vue.js App",
      BrokerID: "",
      UserAccountID: "",
      StrategyID: "1592880274887",
      tableData: [],
      anotherPageSize: 20,
      anotherCurrentPage: 1,
      total: 0,
      gridLinePrices: 1,
      middlePrice: 1,
      strategyTypeText: "",
      scatter: [],
      screenWidth: document.body.clientWidth,
      strategyName: "",
      isLoading: true,
      //是否需要止盈止损
      isNeedStopWinOrStopLoss: "1",
      //止损价
      stopLossPrice: "",
      //止盈价
      stopWinPrice: "",
      code: "",
      contractCode: "",
      cUrl: "",
      kurl: [
        {
          key: "分时",
          value: "R"
        },
        {
          key: "5",
          value: "m5k"
        },
        {
          key: "15",
          value: "m15k"
        },
        {
          key: "30",
          value: "m30k"
        },
        {
          key: "60",
          value: "m60k"
        },
        {
          key: "日",
          value: "k"
        },
        {
          key: "周",
          value: "wk"
        },
        {
          key: "月",
          value: "mk"
        }
      ],
      whok: "R"
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
    },
    headerCellStyle1() {
      return {
        padding: "15px 0",
        background: "#fff",
        color: "#333333",
        "font-size": "14px",
        "border-right": "0px",
        "border-left": "0px",
        "border-top": "0px",
        "border-bottom": "0px"
      };
    },
    cellStyle1() {
      return {
        "border-left": "1px solid #ccc",
        // "box-sizing": "border-box",
        // "border-right": "1px solid #ccc",
        // "border-right": "0px",
        color: "#333333",
        "font-size": "12px",
        "padding-left": "0px!important",
        "padding-right": "0px!important"
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
    },
    //以下都是策略图表类的
    screenWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          // 打印screenWidth变化的值
          console.log(that.screenWidth);
          that.timer = false;
        }, 400);
      }
    },
    "$route.query": function(newVal, oldVal) {
      console.log("新的", newVal);
      location.reload();
    }
  },
  mounted() {
    //上面的列表
    this.getDataList();
    // this.setTimer();
    // this.getFenshituList();
    //策略图表
    this.getAccountList();
    this.getDrawList();
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  destroyed: function() {
    clearInterval(this.timer);
    this.websocketclose();
  },
  methods: {
    freshBeel(data) {
      console.log("回调", data);
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
            /**
                case TRADER: 8
                  return "策略交易"
                case DEAL: 9
                  return "策略成交"
                case NOTIFY: 10
                  return "策略报单状态通知"
               */
            case "8":
              that.getDataList();
              that.isFresh = true;
              // that.getAccountList();
              break;
            case "9":
              that.getDataList();
              that.isFresh = true;
              // that.getAccountList();
              break;
            case "10":
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
              this.StrategyID = rows[0].strategy_id;
              this.strategyTypeText = rows[0].strategy_type_desc;
              this.contractCode = rows[0].contract_list.split("-")[1];
              console.log("我是证券代码", this.contractCode);
              // alert(this.contractCode);
              //规则判定
              /**
                - (NSString *)validStockCode:(NSString *)stockCode {
                  NSRange range0 = [stockCode rangeOfString:@","];
                      if (range0.location != NSNotFound) {
                          stockCode = [stockCode substringToIndex:range0.location];
                      }
                      NSRange range = [stockCode rangeOfString:@"-"];
                      NSString *code = stockCode;
                      if (range.location != NSNotFound) {
                        code = [stockCode substringFromIndex:range.location + 1];
                      }
                      if (!code || code.length <= 3) {
                          return code;
                      }
                      NSString *judgeCode = [code substringToIndex:3];
                      NSArray *shArr = @[@"600", @"601", @"603", @"900", @"688"];
                      if ([shArr containsObject:judgeCode]) {
                          return kString(@"%@1", code);
                      }
                      NSArray *szArr = @[@"300", @"002", @"000", @"200"];
                      if ([szArr containsObject:judgeCode]) {
                          return kString(@"%@2", code);
                      }
                      return code;
                  }
               */
              if (
                this.contractCode.indexOf("600") == 0 ||
                this.contractCode.indexOf("601") == 0 ||
                this.contractCode.indexOf("603") == 0 ||
                this.contractCode.indexOf("900") == 0 ||
                this.contractCode.indexOf("688") == 0
              ) {
                this.contractCode = this.contractCode + "1";
              }
              if (
                this.contractCode.indexOf("300") == 0 ||
                this.contractCode.indexOf("002") == 0 ||
                this.contractCode.indexOf("000") == 0 ||
                this.contractCode.indexOf("200") == 0
              ) {
                this.contractCode = this.contractCode + "2";
              }
              this.cUrl =
                "http://47.102.151.13:8077/pc/emchart-k.html?code=" +
                this.contractCode +
                "&width=1100&height=400&type=" +
                this.whok;
              // alert(this.cUrl);
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
    },

    //策略图表
    getFenshituList() {
      const marketType =
        this.code.substr(0, 1) === "5" || this.code.substr(0, 1) === "6"
          ? "1"
          : "2";
      // 初始化参数
      console.log("我是对象3333", new EmchartsWebTime());
      const chart1 = new EmchartsWebTime({
        dpr: 1,
        code: this.code + marketType,
        container: "chart1",
        width: 600,
        height: 270,
        type: "R"
      });
      // 调用绘图方法
      chart1.draw();
    },
    //取图表数据
    getAccountList() {
      this.axios
        // .post("/three/strategy/detail", {
        .post("/api.v1/strategy/line", {
          size: this.anotherPageSize,
          page: this.anotherCurrentPage,
          strategy_id: this.StrategyID
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
    handdle(row, column, event) {
      console.log("我是每行的记录", row);
      this.StrategyID = row.strategy_id;
      this.strategyTypeText = row.strategy_type_desc;
      this.contractCode = row.contract_list.split("-")[1];
      if (
        this.contractCode.indexOf("600") == 0 ||
        this.contractCode.indexOf("601") == 0 ||
        this.contractCode.indexOf("603") == 0 ||
        this.contractCode.indexOf("900") == 0 ||
        this.contractCode.indexOf("688") == 0
      ) {
        this.contractCode = this.contractCode + "1";
      }
      if (
        this.contractCode.indexOf("300") == 0 ||
        this.contractCode.indexOf("002") == 0 ||
        this.contractCode.indexOf("000") == 0 ||
        this.contractCode.indexOf("200") == 0
      ) {
        this.contractCode = this.contractCode + "2";
      }
      this.cUrl =
        "http://47.102.151.13:8077/pc/emchart-k.html?code=" +
        this.contractCode +
        "&width=1100&height=400&type=" +
        this.whok;
      this.getDrawList();
      this.getAccountList();
    },
    changeK(value) {
      this.whok = value;
      console.log("我是whok", this.whok);
      this.cUrl =
        "http://47.102.151.13:8077/pc/emchart-k.html?code=" +
        this.contractCode +
        "&width=1100&height=400&type=" +
        this.whok;
    },
    //请求散点图的数据,需要点击后拿到策略ID
    getDrawList() {
      this.axios
        // .post("/three/strategy/chart", {
        .post("/api.v1/strategy/chart", {
          strategy_id: this.StrategyID
        })
        .then(response => {
          if (response.data.code == 0) {
            //Y轴
            this.gridLinePrices = response.data.data.config.grid_line_prices;
            //中间值
            // this.middlePrice = response.data.data.config.middlePrice;
            this.middlePrice = response.data.data.config.StartPriceOfGrid;
            console.log("我是中间值", this.middlePrice);
            //标题
            // this.strategyTypeText = response.data.data.config.strategyTypeText;
            // this.strategyTypeText = "散点图";
            this.strategyName = response.data.data.config.strategy_name;
            this.scatter = response.data.data.scatter;
            console.log("数组啊", this.scatter);
            // let numBox = response.data.data.config.intervalPrice;
            let numBox = response.data.data.config.PriceDiffOfGrid;
            //止盈止损
            this.isNeedStopWinOrStopLoss =
              response.data.data.config.IsNeedStopWinOrStopLoss;
            this.stopLossPrice = response.data.data.config.StopLossPrice;
            this.stopWinPrice = response.data.data.config.StopWinPrice;
            //默认显示的值范围
            console.log(typeof this.scatter);
            let timeArray = [];
            let scatter = [];
            let a, b, d, c;
            if (this.scatter.length > 0) {
              this.scatter.forEach((item, index, array) => {
                //执行代码
                timeArray.push(item[1]);
                scatter.push([
                  item[1],
                  (item[2] - this.gridLinePrices[0]) / numBox,
                  item[2],
                  item[3],
                  item[4],
                  item[5]
                ]);
              });
              a = this.scatter[0][2];
              b = this.gridLinePrices[this.gridLinePrices.length - 1];
              d = this.gridLinePrices[0];
              console.log("ab", a, b, d);
              c = (this.middlePrice - d) / (b - d);
              console.log("我是", c);
              c = c * 100;
              console.log("时间", timeArray);
              console.log("数组", scatter);
            } else {
              scatter = [];
              c = "";
            }
            this.drawLine(
              this.gridLinePrices,
              this.middlePrice,
              this.strategyTypeText,
              timeArray,
              scatter,
              numBox,
              c,
              this.strategyName,
              this.isNeedStopWinOrStopLoss,
              this.stopLossPrice,
              this.stopWinPrice
            );
            this.isLoading = false;
          } else {
            this.tableData = [];
            for (var i = 0; i < 8; i++) {
              this.tableData.push({
                line_index: "",
                line_price: "",
                theory_position_num: "",
                true_position_num: ""
              });
            }
            this.gridLinePrices = [0, 0, 0, 0, 0, 0];
            this.strategyTypeText = "无数据";
            this.strategyName = "无数据";

            this.drawLine(
              this.gridLinePrices,
              null,
              this.strategyTypeText,
              null,
              null,
              null,
              null,
              this.strategyName,
              null,
              null,
              null
            );
            this.isLoading = false;
            console.log("我是isLoading", this.isLoading);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange11(val) {
      this.anotherCurrentPage = val;
      this.getAccountList();
    },
    drawLine(
      gridLinePrices,
      middlePrice,
      strategyTypeText,
      time,
      scatter,
      numBox,
      c,
      strategyName,
      isNeedStopWinOrStopLoss,
      stopLossPrice,
      stopWinPrice
    ) {
      // 基于准备好的dom，初始化echarts实例
      console.log("我是对象", this.$echarts);
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let o, p;
      if (gridLinePrices.length > 11) {
        if (c) {
          o = c * 0.7;
          p = 100 ? c * 1.3 : 100;
          console.log("我是p", p);
        } else {
          o = 0;
          p = 100;
        }
      } else {
        o = 0;
        p = 100;
      }

      window.addEventListener("resize", () => {
        myChart.resize();
      });
      //坐标颜色
      var upColor = "#ec0000";
      var upBorderColor = "#8A0000";
      var downColor = "#00da3c";
      var downBorderColor = "#008F28";
      //stopWinPrice为止盈价，stopLossPrice为止损价
      let stopLossPrice1, stopWinPrice1;
      //当止损价小于<Y轴最小值时
      if (stopLossPrice < gridLinePrices[0]) {
        stopLossPrice1 = gridLinePrices[0];
      } else if (stopLossPrice > gridLinePrices[gridLinePrices.length - 1]) {
        //当止损价>Y轴最大值时
        stopLossPrice1 = gridLinePrices[gridLinePrices.length - 1];
      } else {
        stopLossPrice1 = stopLossPrice;
      }

      //当止盈价>Y轴最大值时
      if (stopWinPrice > gridLinePrices[gridLinePrices.length - 1]) {
        stopWinPrice1 = gridLinePrices[gridLinePrices.length - 1];
      } else if (stopWinPrice < gridLinePrices[0]) {
        //当止盈价<Y轴最小值时
        stopWinPrice1 = gridLinePrices[0];
      } else {
        stopWinPrice1 = stopWinPrice;
      }
      console.log(
        "止盈止损",
        stopLossPrice1,
        gridLinePrices[gridLinePrices.length - 1],
        stopWinPrice1
      );
      //判断是否有止损止盈的点scatter
      // console.log("止损止盈的点", scatter);
      let sca;
      if (scatter && scatter.length > 0) {
        sca = scatter.map((item, index) => {
          console.log("他", item[2]);
          //点大于Y轴最大值
          if (
            Number(item[2]) > Number(gridLinePrices[gridLinePrices.length - 1])
          ) {
            console.log(11);
            item[2] = gridLinePrices[gridLinePrices.length - 1];
            item[1] = gridLinePrices.length - 1;
          } else if (Number(item[2]) < Number(gridLinePrices[0])) {
            console.log(22);
            //点小于Y轴最小值
            item[2] = gridLinePrices[0];
            console.log("它它", item[2]);
            item[1] = 0;
          }
          return item;
        });
        console.log("他他", scatter, sca);
      } else {
        sca = null;
      }

      let markLine, str;
      if (
        isNeedStopWinOrStopLoss == 1 &&
        Number(stopWinPrice) != 0 &&
        Number(stopLossPrice) != 0
      ) {
        console.log("数学", typeof stopWinPrice1, stopWinPrice1);
        markLine = {
          symbol: "none",
          data: [
            {
              name: "止盈线",
              //   yAxis: stopWinPrice
              yAxis: stopWinPrice1,
              lineStyle: {
                normal: {
                  type: "dashed",
                  color: "#FF5C5C"
                }
              },
              label: {
                show: true,
                position: "middle",
                color: "#FF5C5C",
                formatter: function(params) {
                  str = "止盈线:" + stopWinPrice;

                  return str;
                }
              },
              tooltip: {
                /*返回需要的信息*/
                formatter: function(param) {
                  var value = param.value;
                  return (
                    '<div style="border-bottom: 1px solid rgba(255,255,255,.3);width:160px;hieght:300px; font-size: 12px;"> ' +
                    "止盈线：" +
                    stopWinPrice +
                    "</div>"
                  );
                }
              }
            },
            {
              name: "止损线",
              yAxis: stopLossPrice1,
              lineStyle: {
                normal: {
                  type: "dashed",
                  color: "#39E365"
                }
              },
              label: {
                show: true,
                position: "middle",
                color: "#39E365",
                formatter: function(params) {
                  str = "止损线:" + stopLossPrice;

                  return str;
                }
              },
              tooltip: {
                /*返回需要的信息*/
                formatter: function(param) {
                  var value = param.value;
                  return (
                    '<div style="border-bottom: 1px solid rgba(255,255,255,.3);width:160px;hieght:300px; font-size: 12px;"> ' +
                    "止损线：" +
                    stopLossPrice +
                    "</div>"
                  );
                }
              }
            }
          ],
          label: {
            normal: {
              show: true,
              position: "middle"
            }
          }
        };
      } else if (isNeedStopWinOrStopLoss == 1 && Number(stopWinPrice) != 0) {
        markLine = {
          symbol: "none",
          data: [
            {
              name: "止盈线",
              //   yAxis: stopWinPrice
              yAxis: stopWinPrice1,
              lineStyle: {
                normal: {
                  type: "dashed",
                  color: "#FF5C5C"
                }
              },
              label: {
                show: true,
                position: "middle",
                color: "#FF5C5C",
                formatter: function(params) {
                  str = "止盈线:" + stopWinPrice;

                  return str;
                }
              },
              tooltip: {
                /*返回需要的信息*/
                formatter: function(param) {
                  var value = param.value;
                  return (
                    '<div style="border-bottom: 1px solid rgba(255,255,255,.3);width:160px;hieght:300px; font-size: 12px;"> ' +
                    "止盈线：" +
                    stopWinPrice +
                    "</div>"
                  );
                }
              }
            }
          ],
          label: {
            normal: {
              show: true,
              position: "middle"
            }
          }
        };
      } else if (isNeedStopWinOrStopLoss == 1 && Number(stopLossPrice) != 0) {
        markLine = {
          symbol: "none",
          data: [
            {
              name: "止损线",
              yAxis: stopLossPrice1,
              lineStyle: {
                normal: {
                  type: "dashed",
                  color: "#39E365"
                }
              },
              label: {
                show: true,
                position: "middle",
                color: "#39E365",
                formatter: function(params) {
                  str = "止损线:" + stopLossPrice;

                  return str;
                }
              },
              tooltip: {
                /*返回需要的信息*/
                formatter: function(param) {
                  var value = param.value;
                  return (
                    '<div style="border-bottom: 1px solid rgba(255,255,255,.3);width:160px;hieght:300px; font-size: 12px;"> ' +
                    "止损线：" +
                    stopLossPrice +
                    "</div>"
                  );
                }
              }
            }
          ],
          label: {
            normal: {
              show: true,
              position: "middle"
            }
          }
        };
      } else {
        markLine = false;
      }

      console.log("我是最终的", markLine);
      // 绘制图表
      myChart.setOption({
        //表格名称
        title: {
          left: "center",
          top: 10,
          fontSize: "12px"
        },
        backgroundColor: "#fff",
        grid: {
          show: true,
          borderColor: "transparent",
          backgroundColor: "#fff",
          x: 90,
          y: 20,
          x2: 50,
          y2: 60
        },
        //公用的X轴
        xAxis: {
          type: "category",
          boundaryGap: 0, //xAxis中的boundaryGap属性，设置为false代表是零刻度开始，设置为true代表离零刻度间隔一段距离
          splitLine: {
            show: false
          },
          //线的样式
          axisLine: { lineStyle: { color: "#B3B5B7" } }
        },
        //Y轴,这里有左右两个Y轴
        yAxis: [
          {
            type: "category",
            scale: true,
            boundaryGap: false,
            //线的样式
            axisLine: {
              lineStyle: {
                color: function(value, index) {
                  if (value == middlePrice) {
                    return "#333333";
                  } else {
                    return value > middlePrice ? "#FF5C5C" : "#39E365";
                  }
                }
              }
            },
            //横向网格线
            splitLine: {
              show: true,
              lineStyle: { color: "#cccccc" }
            },
            lineStyle: {
              color: ["#2F2F31"],
              width: 1,
              type: "solid"
            },
            data: gridLinePrices
          }
        ],
        dataZoom: [
          {
            type: "slider",
            show: true,
            yAxisIndex: [0],
            right: "12px",
            start: o, //数据窗口范围的起始百分比
            end: p,
            showDetail: false,
            width: "20px",
            backgroundColor: "#eeeeee",
            fillerColor: "#D3D3D3",
            borderColor: "transparent"
          },
          {
            type: "slider",
            show: true,
            bottom: "10px",
            xAxisIndex: [0],
            start: 0, //数据窗口范围的起始百分比
            end: 100,
            color: "#fff",
            height: "20px",
            showDetail: false,
            backgroundColor: "#eeeeee",
            fillerColor: "#D3D3D3",
            borderColor: "transparent"
          },
          {
            type: "inside",
            yAxisIndex: [0],
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
            moveOnMouseWheel: true,
            start: 0,
            end: 100
          }
        ],
        tooltip: {
          /*返回需要的信息*/
          formatter: function(param) {
            var value = param.value;
            return (
              '<div style="hieght:300px; font-size: 12px;color:#fff;background:transparent!important;"> ' +
              // value[2] +
              "成交时间" +
              "(" +
              value[0] +
              ")" +
              "</br>" +
              value[4][0] +
              "</br>" +
              value[4][1] +
              "</div>"
            );
          }
        },
        series: [
          {
            //scatter为散点图
            type: "scatter",
            // data: scatter,
            data: sca,
            z: 10000,
            itemStyle: {
              normal: {
                // shadowBlur: 10,
                // shadowColor: "rgba(120, 36, 50, 0.5)",
                // shadowOffsetY: 5,
                color: function(e) {
                  if (e.value[5] == "open") {
                    return "#FF5C5C";
                  } else {
                    return "#39E365";
                  }
                }
              }
            },
            markLine: markLine
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.kurl {
}
.kurl span {
  color: #333333;
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
.kcolor {
  background-color: #e46943;
  color: #fff !important;
}
.tobox {
  height: 518px;
  border-bottom: 6px solid rgb(214, 211, 214);
}
.biglbox {
  width: calc(100%-307px);
  display: flex;
}
.leftcontanier {
  width: 43%;
  background: #fff;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  flex: 1;
}
.container {
  flex: 0.6;
  width: 40%;
  background: #fff;
  height: 100vh;
  overflow: hidden;
}
.leftpbox {
  border-left: 6px solid rgb(214, 211, 214);
  border-bottom: 6px solid rgb(214, 211, 214);
  overflow: hidden;
}
.leftpbox .lbox {
  float: left;
  border-right: 3px solid rgb(214, 211, 214);
}
.leftpbox .lbox .lb1 {
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
.leftpbox .rbox {
  margin-top: -34px;
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
  padding-left: 20px;
  padding-right: 20px;
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
  border-left: 6px solid rgb(214, 211, 214);
  // border-right: 6px solid rgb(214,211,214);
  height: 100%;
}

.freshbtn1 {
  width: 20px;
  position: absolute;
  right: 20px;
  top: 70px;
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
.cxx .el-input {
  width: 340px !important;
  height: 28px;
}

//策略图表
.dnfbox {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
}
.dnfbox .leftbox {
  flex: 0.6;
  border-right: 6px solid rgb(214, 211, 214);
}
.dnftitle {
  width: 100%;
  height: 34px;
  background-color: #fff;
  font-size: 14px;
  color: #2e2e30;
  font-weight: bold;
  text-align: center;
  line-height: 34px;
  margin-bottom: 4px;
}
.dnfbox .rightbox {
  // display: none;
  flex: 0.4;
}
.dnfbox .pagination {
  border-top: 2px solid rgb(17, 17, 19);
  height: 50px;
  // background-color: #2e2e30;
}
</style>
<style>
.dnfbox .el-table tr {
  height: 24px;
  /* background-color: rgb(31, 31, 31); */
}
.dnfbox .el-table tr:hover {
  background: none;
}
.dnfbox .el-table--border {
  border: none;
}
.dnfbox .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #2e2e30;
}
.dnfbox .el-table--border::after {
  background-color: rgb(67, 67, 67);
}
.dnfbox .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent;
}
.dnfbox .el-table th.is-leaf {
  border: 1px solid rgb(67, 67, 67);
  border-left: none;
}

.dnfbox .el-pagination button:disabled {
  background-color: rgb(46, 46, 48);
}
.dnfbox .el-pager li {
  background-color: rgb(46, 46, 48);
  color: #c0c4cc;
}
.el-pager li.active {
  color: #e46943 !important;
}
.dnfbox .el-pagination .btn-next {
  background-color: rgb(46, 46, 48);
  color: #c0c4cc;
}
.dnfbox .el-pagination .btn-prev {
  background-color: rgb(46, 46, 48);
  color: #c0c4cc;
}
.dnfbox .el-table::before {
  background-color: rgb(17, 17, 19);
}
.dnfbox .el-pagination {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 8px);
  /* background-color: rgb(46, 46, 48); */
}
</style>
<style>
.cxx .template-top .search-box input {
  width: 90% !important;
}
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
  /* top: 36px !important; */
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
.aaaa .el-table--border td {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc !important;
}
.aaaa .el-table--striped .el-table__body tr td {
  /* background: none !important; */
}
.aaaa .el-table {
}
.aaaa .el-table__header-wrapper {
  border-bottom: 1px solid #ccc;
}
.aaaa .el-table__body {
  /* border-left: 1px solid #ccc; */
  /* border-right: 1px solid #ccc; */
}
.el-table td {
  padding: 2px 0 !important;
}

.bbbb {
  border: 1px solid #ccc !important;
  margin-top: 4px;
}
</style>

<style>
/* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row > td {
  background-color: rgb(235, 148, 121) !important;
  /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
  color: #fff !important;
}
</style>

