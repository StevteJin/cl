import Vue from 'vue'
import axios from './http'
import eventBus from "./eventBus.js";
import XLSX from 'xlsx'
// 性别、学历等数据字典
Vue.prototype.getDict = function () {
  var p = new Promise(function (resolve, reject) {
    axios.get('system/dict')
      .then((res) => {
        console.log('getDict>>', res.data.data);
        var dict = res.data.data;
        Object.keys(dict).forEach((key) => {
          localStorage.setItem(key, JSON.stringify(dict[key]))
        })
        resolve();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return p;
}

// 交易所
Vue.prototype.getExchange = function () {
  axios.get('system/exchange/options')
    .then((res) => {
      console.log('getExchange>>', res.data.data);
      localStorage.setItem('exchange', JSON.stringify(res.data.data))
    })
    .catch((err) => {
      console.log(err);
    });
}

// 期货公司
Vue.prototype.getBroker = function () {
  axios.get('system/company/options')
    .then((res) => {
      console.log('getBroker>>', res.data.data);
      localStorage.setItem('broker', JSON.stringify(res.data.data))
    })
    .catch((err) => {
      console.log(err);
    });
}

// 预先参数
Vue.prototype.getRisk = function () {
  axios.get('system/risk')
    .then((res) => {
      console.log('getRisk>>', res.data.data);
      localStorage.setItem('pre-parameter', JSON.stringify(res.data.data))
    })
    .catch((err) => {
      console.log(err);
    });
}

//资金账户
Vue.prototype.getFundAccount = function (CompanyID) {
  CompanyID = CompanyID || 0;
  axios
    .get(`account/fund/options?CompanyID=${CompanyID}`)
    .then(response => {
      if (response.data.code == 1) {
        this.fundAccountData = response.data.data;
        let newArr = [];
        this.fundAccountData.map(item => {
          item.value = item.FundAccountID + "-" + item.FundAccountName;
          newArr.push({ value: item.value });
        });
        console.log(newArr);
        this.restaurants1 = this.loadAll(newArr);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

//分账户
Vue.prototype.getUserAccount = function (stateNum, isAdd, fKeyword, full) {
  if (stateNum != 0) {
    this.searchForm.account = stateNum.split('-')[0]
  } else {
    this.searchForm.account = stateNum;
  }
  if (!fKeyword) {
    fKeyword = ''
  }
  if (!full) {
    full = ''
  }
  this.axios
    .get("/account/user/options?FundAccountID=" + this.searchForm.account + "&search=" + fKeyword + "&Full=" + full)
    .then(response => {
      if (response.data.code == 1) {
        this.UserAccount = response.data.data;
        let newArr = [];
        this.UserAccount.map(item => {
          item.value = item.UserAccountID + "-" + item.UserAccountName;
          newArr.push({ value: item.value });
        });
        this.restaurants2 = this.loadAll(newArr);
      } else {
        this.UserAccount = [];
        this.restaurants2 = [];
      }
      if (!isAdd && this.UserAccount.length <= 0) {
        this.UserAccount = [];
        for (var i = 0; i < 13; i++) {
          this.UserAccount.push({
            UserAccountID: "",
            UserAccountName: ""
          });
        }
      }
      console.log("我是我是" + isAdd);
      if (isAdd && this.UserAccount.length <= 0) {
        this.nullTable1 = true;
        for (var i = 0; i < isAdd; i++) {
          this.UserAccount.push(
            {
              UserAccountID: '',
              UserAccountName: '',
              UserAccount: ''
            }
          )
        }
      } else {
        this.nullTable1 = false;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

Vue.prototype.loadAll = function (a) {
  return a;
}

Vue.prototype.globalQuerySearch = function (queryString, cb, restaurants) {
  var results = queryString
    ? restaurants.filter(this.createFilter(queryString))
    : restaurants;
  // 调用 callback 返回建议列表的数据
  cb(results);
}

Vue.prototype.createFilter = function (queryString) {
  return restaurant => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1
    );
  };
}

// 统计
Vue.prototype.globalSummaries = function (param) {
  const { columns, data } = param;
  const sums = [];
  columns.forEach((column, index) => {
    sums[index] = "";
    Object.keys(this.statistics).forEach((key) => {
      if (column.property == key) {
        sums[index] = '∑ ' + this.statistics[key];
      }
    })
  });
  return sums;
},

  // 筛选条件
  Vue.prototype.getColumn1 = function (column, index, flag) {
    console.log('this.tableHeader[index]', this.tableHeader[index])
    console.log('我是第几个', index);
    console.log('我是传过来的字段', column);
    //传过来的column,index没有问题
    this.curIndex = index;
    if (flag == 0) {
      this.$set(this.tableHeader[index], 'page', 1)
      this.tableHeader.forEach((item, thIndex) => {
        this.$set(this.tableHeader[thIndex], 'showPopover', false)
        this.$set(this.tableHeader[index], 'showPopover', true)
      })
      // if (this.tableHeader[index].isClicked == 1) {
      //   return false;
      // }
    }
    var options = [];
    if (column == 'StatusText' || column == 'CurrencyID' || column == 'BuyOrSellText' || column == 'OpenOrCoverText' || column == 'StateText'
      || column == 'CombHedgeFlagText' || column == 'ExchangeName' || column == 'HedgeFlagText' || column == 'DirectionText' || column == 'TransferTypeText' || column == 'CurrencyIDText') {
      // [{"key":"2","value":"冻结"},{"key":"1","value":"正常"},{"key":"0","value":"正常"}]
      if (column == 'StatusText') {
        options = JSON.parse(localStorage.getItem('account_status'));
      }
      if (column == 'CurrencyID' || column == 'CurrencyIDText') {
        options = JSON.parse(localStorage.getItem('product_currency'));
      }
      if (column == 'BuyOrSellText' || (this.Table == 'positiondetailinfo' && column == 'DirectionText')) {
        options = JSON.parse(localStorage.getItem('buy_or_sell'));
      }
      if (column == 'OpenOrCoverText') {
        options = JSON.parse(localStorage.getItem('open_or_cover'));
      }
      if (column == 'StateText') {
        options = JSON.parse(localStorage.getItem('order_state'));
      }
      if (column == 'CombHedgeFlagText' || column == 'HedgeFlagText') {
        options = JSON.parse(localStorage.getItem('comb_hedge_flag'));
      }
      if (column == 'ExchangeName') {
        options = JSON.parse(localStorage.getItem('exchange'));
      }
      if (this.Table == 'usertransferhistory' && column == 'DirectionText') {
        options = JSON.parse(localStorage.getItem('direction'));
      }
      if (column == 'TransferTypeText') {
        options = JSON.parse(localStorage.getItem('transfer_type'));
      }
      options = options.map((item) => {
        item.isChecked = 0;
        return item;
      })
      this.$set(this.filterOptions, column, options)
    } else {
      console.log('我执行了吗');
      this.axios.get('/system/column', {
        params: {
          Table: this.Table,
          Filed: column,
          page: this.tableHeader[index].page,
          size: this.filterPageSize,
          QueryBuild: this.queryObj
        }
      })
        .then((res) => {
          console.log('筛选>>', res.data);
          if (res.data.code == 1) {
            this.requestFlag = false;
            var arr = [];
            arr = res.data.data.data.map((item, index) => {
              var obj = {
                value: item,
                isChecked: 0
              }
              return obj;
            })
            if (flag) {
              this.$set(this.filterOptions, column, this.filterOptions[column].concat(arr))
              if (res.data.data.data.length < 20) {
                this.more = 0
              } else {
                this.more = 1
              }
            } else {
              this.$set(this.tableHeader[index], 'page', 1)
              this.$set(this.filterOptions, column, arr)
              this.more = 1
            }
            this.$nextTick(() => {
              let ref = 'filterBox' + column;
              console.log('节点', ref);
              var box = this.$refs[ref];
              console.log('我是节点', box)
              let boxHei = box[0].offsetHeight;
              console.log('高度', boxHei);
              var innerScrollHei = box[0].scrollHeight;
              console.log('高度2', innerScrollHei);
              // console.log('boxHei', boxHei)
              // 监听这个dom的scroll事件
              box[0].addEventListener('scroll', () => {
                console.log('我滚动了吗')
                //console.log(" scroll ", box.scrollTop + boxHei + 10)
                //console.log('htmlHeight', this.innerScrollHei)
                if (box[0].scrollTop + boxHei + 10 >= innerScrollHei && this.more) {
                  this.loadMore(column, index);
                }
              }, false)
            })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.$set(this.tableHeader[index], 'isClicked', 1)
  }

// 下拉加载更多
Vue.prototype.loadMore1 = function (column, index) {
  // 无限滚动加载（第一次请求完成后才发第二次请求）
  if (this.requestFlag) {
    return false;
  }
  this.requestFlag = true;
  // 多次加载数据
  this.$set(this.tableHeader[index], 'page', this.tableHeader[index].page + 1)
  this.getColumn(column, index, 1)
}

// 确定筛选
Vue.prototype.sureFilter1 = function (column, index) {
  if (this.searchForm) {
    this.searchForm.account = '';
    this.state2 = '';
  }
  if (!this.queryObj) {
    this.queryObj = {};
  }
  var arr = [];
  this.filterOptions[column].forEach((item) => {
    if (item.isChecked) {
      if (column == 'StatusText' || column == 'CurrencyID' || column == 'BuyOrSellText' || column == 'OpenOrCoverText' || column == 'StateText'
        || column == 'CombHedgeFlagText' || column == 'ExchangeName' || column == 'HedgeFlagText' || column == 'DirectionText' || column == 'TransferTypeText' || column == 'CurrencyIDText') {
        arr.push(item.key)
      } else {
        arr.push(item.value)
      }
    }
  })
  if (column == 'StatusText') { column = 'Status' }
  if (column == 'BuyOrSellText') { column = 'BuyOrSell' }
  if (column == 'OpenOrCoverText') { column = 'OpenOrCover' }
  if (column == 'StateText') { column = 'State' }
  if (column == 'CombHedgeFlagText') { column = 'CombHedgeFlag' }
  if (column == 'ExchangeName') { column = 'ExchangeID' }
  if (column == 'HedgeFlagText') { column = 'HedgeFlag' }
  if (column == 'DirectionText') { column = 'Direction' }
  if (column == 'TransferTypeText') { column = 'TransferType' }
  if (column == 'CurrencyIDText') { column = 'CurrencyID' }
  this.$set(this.queryObj, column, arr)
  this.currentPage = 1;
  this.getAccountList('filter')
}

// 取消筛选
Vue.prototype.cancelFilter1 = function (column, index) {
  console.log('this.filterOptions[column]', this.filterOptions[column])
  this.$set(this.tableHeader[index], 'showPopover', false)
}

// 清空筛选条件
Vue.prototype.clearFilter1 = function () {
  this.queryObj = {};
  this.getAccountList();
}

// 设置表头
Vue.prototype.center1 = function () {
  console.log('headerList>>global', this.headerList)
  this.axios.post('system/header', {
    TableHeaderKey: this.TableHeaderKey,
    TableHeaderData: this.headerList
  })
    .then((res) => {
      console.log('addFundAccount>>', res);
      if (res.data.code == 1) {
        this.setDialogVisible = false
        this.getAccountList()
      } else {
        this.$alert(res.data.msg, "提示", {
          confirmButtonText: "确定",
          center: true,
          type: "error"
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//导出表格
Vue.prototype.derivedForm = function (webUrl, name) {
  // 下载等待弹窗
  eventBus.$emit('downloadExcel', 1)
  let token = localStorage.getItem('token' + localStorage.getItem("userName"));
  let baseUrl = localStorage.getItem("baseUrl");
  let downloadUrl = baseUrl + webUrl + "&Token=" + token;
  console.log(downloadUrl)
  var xmlHttpRequest = null;
  //1、创建XMLHttpRequest对象
  if (window.XMLHttpRequest) {//新版本返回为TRUE
    xmlHttpRequest = new XMLHttpRequest();
  } else {
    xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTF");
  }
  //2、设置回调函数
  xmlHttpRequest.onreadystatechange = callBack;
  xmlHttpRequest.onprogress = progressFun;
  xmlHttpRequest.open("GET", downloadUrl, true);
  xmlHttpRequest.responseType = 'blob';
  xmlHttpRequest.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
  //4、发送请求
  xmlHttpRequest.send(null);
  //回调函数callBack的编写
  function callBack() {
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
      eventBus.$emit('downloadExcel', 0)
      var blob = xmlHttpRequest.response;
      var a = document.createElement('a');
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      //设置文件名称
      a.download = name + new Date().formatDate('yyyy-MM-dd HH:mm:ss') + '.xlsx';
      a.click();
    }
  }
  function progressFun(e) {
    e = e || event;
    console.log('e>>', e)
  }
}

// Vue 读取excel数据并生成数组
Vue.prototype.globalExportData = function (event, cb) {
  if (!event.currentTarget.files.length) {
    return;
  }
  const that = this;
  // 拿取文件对象
  var f = event.currentTarget.files[0];
  // 用FileReader来读取
  var reader = new FileReader();
  // 重写FileReader上的readAsBinaryString方法
  FileReader.prototype.readAsBinaryString = function (f) {
    var binary = "";
    var wb; // 读取完成的数据
    var outdata; // 你需要的数据
    var reader = new FileReader();
    reader.onload = function (e) {
      // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
      var bytes = new Uint8Array(e.target.result);
      var length = bytes.byteLength;
      for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      // 接下来就是xlsx了，具体可看api
      wb = XLSX.read(binary, {
        type: "binary"
      });
      outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      // console.log('outdata>>', JSON.stringify(outdata))
      cb(JSON.stringify(outdata))
    };
    reader.readAsArrayBuffer(f);
  };
  reader.readAsBinaryString(f);
}

//数字去千分位分隔符
Vue.prototype.toNumber = function (num) {
  var newNum = num.replace(/,/g, "");
  return newNum;
}