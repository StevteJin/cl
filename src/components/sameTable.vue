<template>
    <!--底部公用的策略列表-->
    <div class="tableheight">
        {{isFresh}}
        <!-- <el-table v-if="EventType1.length>0&StrategyName1.length>0&StrategyID1.length>0" :data="tableData" style="width: 100%;" :height="400" :span="24" :row-style="{height:'40px'}" :header-row-style="{height:'32px'}" :cell-style="{padding:'1px'}" :span-method="objectSpanMethod"> -->
        <img src="../assets/refr.png" alt="" :class="{'refresh-trigger': refreshNew,freshbtn2:true}" @click="fresh1">
        <el-table :data="tableDataNew" stripe class="user-table" style="margin-left:57px;padding-right:45px;" :height="300" :span="24" :row-style="{height:'40px'}" :header-row-style="{height:'32px'}" :span-method="objectSpanMethod" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
            <el-table-column prop="strategy_name" label="策略名称" width="100"></el-table-column>
            <el-table-column prop="strategy_id" label="策略ID" width="140"></el-table-column>
            <el-table-column prop="event_type_desc" label="事件类型" width="100"></el-table-column>
            <el-table-column prop="event_time" label="发生时间" width="180"></el-table-column>
            <el-table-column prop="event_detail" label="事件详情"></el-table-column>
            <!-- <el-table-column align="right">
          <template slot="header">
            <el-select v-model="value1" style="width:20%;" filterable clearable placeholder="策略名称">
              <el-option v-for="(item,index) in StrategyName1" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
            <el-select v-model="value2" style="width:18%;" filterable clearable placeholder="策略ID">
              <el-option v-for="(item,index) in StrategyID1" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
            <el-select v-model="value3" style="width:20%;" filterable clearable placeholder="事件类型">
              <el-option v-for="(item,index) in EventType1" :key="index" :label="item.v" :value="item.k"></el-option>
            </el-select>
            <el-date-picker v-model="value4" type="datetime" placeholder="发生时间" style="width:23%;"></el-date-picker>
            <el-button @click="search">搜索</el-button>
          </template>
        </el-table-column> -->
        </el-table>
        <div class="pagination">
            <el-pagination :current-page.sync="currentPage2" layout="prev, pager, next" :page-size="pageSzie2" :pager-count="5" :total="totalNew" @current-change="handleCurrentChange2"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
  props: ["isFresh"],
  data() {
    return {
      tableDataNew: [],
      currentPage2: 1,
      pageSzie2: 31,
      totalNew: 1,
      refreshNew: false,
      EventType1: [],
      freshBeel: false
    };
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
    isFresh: {
      handler(newVal, oldVal) {
        console.log("我是新值", newVal);
        if (newVal == true) {
          this.getAccountListNew();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getAccountListNew();
    //EventType这是事件类型，StrategyID策略id，StrategyName策略名称，对哇
    this.getEventType("EventType");
    this.getEventType("StrategyName");
    this.getEventType("StrategyID");
  },
  methods: {
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
    getAccountListNew() {
      this.refreshNew = true;
      this.axios
        .post("/api.v1/strategy/log", {
          size: this.pageSzie2,
          page: this.currentPage2
          // EventType: this.value3,
          // StrategyName: this.value1,
          // StrategyID: this.value2,
          // StartTime: this.value4
        })
        .then(response => {
          if (response.data.code == 0) {
            this.tableDataNew = response.data.data.rows;
            console.log("底部数据", this.tableData);
            this.totalNew = response.data.data.total;
            setTimeout(() => {
              this.refreshNew = false;
              this.freshBeel = false;
              this.$emit("isFreshBeel", this.freshBeel);
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
.pagination {
  float: right;
  margin-top: 10px;
}
</style>
<style>
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
</style>
