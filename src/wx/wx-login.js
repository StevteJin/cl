/**
 * 微信登录模块
 */
import '../util/vue-prototype'
import { is_weixin, getUrlKey } from '../util/public-fun'
import Vue from 'vue'
import axios from '../http';

export function wechatLogin(path) {
  // if (!is_weixin() || sessionStorage.openId) {
  //   cb && cb()
  //   return
  // }
  let code = getUrlKey('code')
  console.log('code>>>', code)
  if (code) {
    wxToken(code)
    return
  } else {
    let redirect = encodeURIComponent('https://h5.smartqmx.com/#' + path)
    let appId = 'wxd1dd046baaf4405f'
    let href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
    location.href = href
  }

  function wxToken(code) {
    openIdLogin(code,function(){
      location.href = location.origin + location.pathname +  '#/' + location.href.split('#/')[1]
    })
  }
}
export function openIdLogin(code,cb) {
  axios
    .post(`api/third/callback/wechat`, {
      code: code
    })
    .then(response => {
      console.log('codeTransferToken', response.data);
      console.log('codeTransferToken>>openid', response.data.data.openid);
      sessionStorage.openId = response.data.data.openid;
      // 您已成功绑定账号，登陆成功
      if (response.data.code === 100) {
        // alert('7')
        // sessionStorage.isBind = true;
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('headImg', response.data.data.thumb);
        localStorage.setItem('type', response.data.data.type);
        localStorage.setItem('username', response.data.data.user_name);
        localStorage.setItem('uid', response.data.data.user_id);
        localStorage.setItem('mobile', response.data.data.mobile);
        cb && cb()
      }
      // 已有启明星账号，请绑定
      if (response.data.code === 101) {
        // alert('8')
        localStorage.setItem('nickname', response.data.data.nickname);
        localStorage.setItem('avatar', response.data.data.avatar);
        localStorage.setItem('openid', response.data.data.openid);
        location.href = 'https://h5.smartqmx.com/#/bindAccount'
      }
      if (response.data.code === 102) {
        // alert('9')
        localStorage.removeItem('token');
        // sessionStorage.removeItem('isBind');
        let redirect = location.origin + location.pathname +  '#/' + location.href.split('#/')[1]
        let appId = 'wxd1dd046baaf4405f'
        let href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
        location.href = href
      }
      
    })
    .catch(error => {
      // alert(JSON.stringify(error));
    });
}