import Vue from 'vue'
import axios from '../http';
import wxUtil from '@/wx/wx-util'
import wxpay from '@/wx/wxpay'
import { is_weixin } from '../util/public-fun'
import NativeShare from 'nativeshare'
//数据版本号 目前为0
Vue.prototype.dataVersion = 0

/**
 * 是否登录
 * return Boolean
 */
Vue.prototype.isAuthorized = function() {
  return !!window.getCookie('token')
}

// 支付宝支付
Vue.prototype.aliPay = function(price) {
  this.axios
    .post("/api/payment/order", {
        pay_type: 'alipay',
        money: price
    })
    .then(response => {
        // console.log(JSON.stringify(response.data));
        document.body.innerHTML = response.data.data.html;
        document.forms[0].submit()
    })
    .catch(function(error) {
        console.log(error);
    });
}

// 微信支付
Vue.prototype.wxPay = function(price) {
  console.log('price', price)
  let httpData = {
    pay_type: 'wechat',
    money: price
  }
  axios.post('api/payment/order', httpData).then(res => {
    console.log(res.data.data)
    wxpay.weixinPay(res.data.data, function(data) {
      // window.appVue.$router.push({
      //   name: 'success',
      //   query: {
      //     total_amount: price,
      //     out_trade_no: order_id
      //   }
      // })
    })
  }, err => {})
}

//微信分享
Vue.prototype.wxShare = function(type) {
  let httpData = {
    url: location.href.split('#')[0]
  }
  
  axios.post("api/wechat/signature", httpData).then(res => {
    let configData = res.data.data
    // 先创建一个实例
    var nativeShare = new NativeShare();
    nativeShare.setConfig({
      wechatConfig: {
          appId: configData.appId,
          timestamp: configData.timestamp,
          nonceStr: configData.nonceStr,
          signature: configData.signature,
      }
    })
    // 设置分享文案
    nativeShare.setShareData({
      icon: 'https://h5.smartqmx.com/logo.png',
      link: 'https://h5.smartqmx.com',
      title: '启明星首页',
      desc: '启明星首页',
    })
    // 唤起浏览器原生分享组件(如果在微信中不会唤起，此时call方法只会设置文案，类似setShareData)
    /**********************************************************************
    调用call方法时第一个参数是指定用什么命令调用分享组件。目前支持6个命令。分别是

    default 默认，调用起底部的分享组件，当其他命令不支持的时候也会调用该命令
    wechatTimeline 分享到朋友圈
    wechatFriend 分享给微信好友
    qqFriend 分享给QQ好友
    qZone 分享到QQ空间
    weibo 分享到微博
    **********************************************************************/
    try {
      nativeShare.call()
      // 如果是分享到微信则需要 nativeShare.call('wechatFriend')
    } catch(err) {
    // 如果不支持，你可以在这里做降级处理
    }
  })
}

window.getCookie = function(name) {
  if(name=='token' && sessionStorage.token){
    return sessionStorage.token
  }
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) return unescape(arr[2])
  else return null
}
window.delCookie = function(name) {
  if(name=='token'){
    sessionStorage.removeItem('token');
  }
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  document.cookie = name + "=a; expires=" + date.toGMTString();
}
window.setCookie = function(name, value) {
  if(name=='token'){
    sessionStorage.token = value;
  }
  var Days = 7
  var exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie =
    name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
}

