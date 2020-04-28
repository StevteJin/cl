<template>
  <!--0股票1期货-->
  <div class="container cboder">
    <div class="template-top template-top3">
      <div class="title">
        <span @click="type0" :class="{topactive:typetype==0}">证券账号绑定</span>
        <span @click="type1" :class="{topactive:typetype==1}">期货账号绑定</span>
      </div>
      <br />
      <div class="operate-btn">
        <div class="search-box">
          <el-input type="text" placeholder="搜索账号名" v-model="keyword" :clearable="true" />
          <div class="search-img" @click="search"></div>
        </div>
        <div class="addnow" @click="addAgent">增加{{typetypename}}账号</div>
      </div>
    </div>
    <img src="../../../assets/refr.png" alt="" :class="{'refresh-trigger': refresh,freshbtn:true}" @click="fresh">
    <el-table :border="true" :data="tableData" key="desingerTable" v-if="nullTable" stripe class="user-table" style="width: 100%;background-color:#fff;" height="774" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
      <el-table-column label="交易账号" align="center"></el-table-column>
      <el-table-column label="账号名称" align="center"></el-table-column>
      <el-table-column label="机构ID" align="center"></el-table-column>
      <el-table-column label="账号类型" align="center"></el-table-column>
      <el-table-column label="账号状态" align="center"></el-table-column>
    </el-table>
    <div>
      <el-table :border="true" :data="tableData" v-if="!nullTable" stripe class="user-table" style="width: 100%;background-color:#fff;border:1px solid #ededed;" :cell-style="cellStyle" :header-cell-style="headerCellStyle" height="600">
        <el-table-column show-overflow-tooltip prop="trade_account_id" label="交易账号" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip prop="user_account_name" label="账号名称" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip prop="fund_account_id" label="主账号" align="center" v-if="typetypename=='证券'"></el-table-column>
        <el-table-column show-overflow-tooltip prop="broker_id" label="机构ID" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip prop="type_desc" label="账号类型" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip prop="status_desc" label="账号状态" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="操作" align="center">
          <template slot-scope="scope">
            <div style="color:#E46943;cursor:pointer;" @click="handleDelete(scope.$index, scope.row)">删除账号</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
    </div>
    <el-dialog :visible.sync="addDialogVisible" center :modal="false" @close="cancelAdd" custom-class="sub-account-deposit-copy-dialog">
      <el-form label-position="left" label-width="80px" class="account-deposit-edit-form account-master-edit-form">
        <div class="set-dialog-content" style="overflow: hidden;">
          <div class="part" style="float: left; margin-right: 26px; width: 335px;">
            <div class="top">
              <el-form-item label="交易账号:">
                <el-input v-model="ServerName"></el-input>
              </el-form-item>
              <el-form-item label="账号密码:">
                <el-input v-model="formInline.IP" type="password"></el-input>
              </el-form-item>
              <el-form-item label="机构ID:">
                <el-input v-model="formInline.Port"></el-input>
              </el-form-item>
              <el-form-item label="主账号:" v-if="typetypename=='证券'">
                <el-input v-model="formInline.ID"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
        <el-button @click="cancelAdd">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="resetDialogVisible" center :modal="false" custom-class="reset-dialog account-deposit-dialog">
      <div class="reset-dialog-content">确定删账号吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteTrade">确 定</el-button>
        <el-button @click="resetDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      colorBool: false,
      keyword: "",
      pageSize: 15,
      currentPage: 1,
      total: 10,
      nullTable: false,
      formInline: {
        IP: "",
        Port: "",
        Remark: "",
        ID: ""
      },
      addDialogVisible: false,
      resetDialogVisible: false,
      isEdit: false,
      trade_account_id: "",
      broker_id: "",
      type: "",
      ServerName: "",
      typetype: 0,
      typetypename: "证券",
      refresh: false
    };
  },
  computed: {
    headerCellStyle() {
      return {
        padding: "3px 0",
        background: "#fff",
        color: "#333333",
        "font-size": "14px",
        "border-right": "0px",
        "border-left": "0px"
      };
    },
    cellStyle() {
      return {
        padding: "0",
        "border-bottom": "1px solid #fff",
        "border-right": "0px",
        color: "#333333",
        "font-size": "12px"
      };
    }
  },
  watch: {
    keyword: {
      handler(newVal, oldVal) {
        this.currentPage = 1;
        this.getTellerList();
      },
      deep: true
    },
    typetype: {
      handler(newVal, oldVal) {
        this.currentPage = 1;
        this.getTellerList();
      },
      deep: true
    }
  },
  created() {
    this.getTellerList();
    // this.getDepotNode();
  },
  methods: {
    fresh() {
      this.getTellerList();
    },
    type0() {
      this.typetype = 0;
      this.typetypename = "证券";
    },
    type1() {
      this.typetype = 1;
      this.typetypename = "期货";
    },
    search() {
      this.getTellerList(this.keyword);
    },
    getTellerList(keyword) {
      this.refresh = true;
      setTimeout(() => {
        this.refresh = false;
      }, 1000);
      if (!keyword) {
        keyword = "";
      }
      this.axios
        .post("api.v1/account/list", {
          page: this.currentPage,
          size: this.pageSize,
          filter: { TradeAccountID: keyword, Type: this.typetype },
          option: { TradeAccountID: "LIKE", Type: "=" }
        })
        .then(res => {
          console.log("getTellerList>>", res.data);
          const { rows, total } = res.data.data;
          console.log("数", rows);
          if (res.data.code == 0) {
            this.tableData = rows;
            this.total = total;
            this.nullTable = false;
          } else {
            this.tableData = new Array(this.pageSize);
            this.nullTable = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTellerList();
    },
    addAgent() {
      this.addDialogVisible = true;
      this.ServerName = "";
      this.formInline.IP = "";
      this.formInline.Port = "";
      this.isEdit = false;
    },
    confirmAdd() {
      if (!this.ServerName) {
        this.$alert("交易账号不能为空", "提示", {
          confirmButtonText: "确定",
          center: true,
          type: "error"
        });
        return false;
      }
      if (!this.formInline.IP) {
        this.$alert("账号密码不能为空", "提示", {
          confirmButtonText: "确定",
          center: true,
          type: "error"
        });
        return false;
      }
      if (!this.formInline.Port) {
        this.$alert("机构ID不能为空", "提示", {
          confirmButtonText: "确定",
          center: true,
          type: "error"
        });
        return false;
      }
      if (!this.isEdit) {
        this.axios
          .post("api.v1/account/add", {
            trade_account_id: this.ServerName,
            password: this.formInline.IP,
            broker_id: this.formInline.Port,
            fund_account_id: this.formInline.ID,
            type: this.typetype
          })
          .then(res => {
            console.log("comfirmAdd>>", res.data.data);
            if (res.data.code == 0) {
              this.getTellerList();
              this.cancelAdd();
            } else {
              this.$alert(res.data.msg, "提示", {
                confirmButtonText: "确定",
                center: true,
                type: "error"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    cancelAdd() {
      this.addDialogVisible = false;
    },
    handleDelete(index, row) {
      this.resetDialogVisible = true;
      console.log("我是", row);
      this.trade_account_id = row.trade_account_id;
      this.broker_id = row.broker_id;
      this.type = row.type;
    },
    deleteTrade() {
      this.axios
        .post("/api.v1/account/del", {
          trade_account_id: this.trade_account_id,
          broker_id: this.broker_id,
          type: this.type
        })
        .then(res => {
          if (res.data.code == 0) {
            this.resetDialogVisible = false;
            this.getTellerList();
          } else {
            this.$alert(res.data.msg, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "error"
            });
            this.resetDialogVisible = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-table .cell img {
  display: inline-block;
  margin: 0 14px;
  cursor: pointer;
}
.template-scrollbar1 {
  height: 270px;
}
.container {
  width: calc(100%-307px);
  background: #fff;
  padding: 45px 91px 0 57px;
  box-sizing: border-box;
  overflow: hidden;
}
.freshbtn {
  width: 20px;
  position: absolute;
  right: 120px;
  top: 230px;
  z-index: 1000000;
  cursor: pointer;
}
.cboder {
  border: 6px solid #7a7a7a;
  height: 100vh;
}
.cboder .el-input {
  width: 340px !important;
  height: 28px;
}

</style>
<style>
.cboder .template-top .search-box input {
  width: 90% !important;
}
</style>



