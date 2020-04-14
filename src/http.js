/**
 * http配置
 */
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import axios from 'axios'
import router from './router'
// axios 配置
//设置请求超时时间，现在，在超时前，所有请求都会等待 2.5 秒
axios.defaults.timeout = 5000;
//设置接口的域名
let burl='http://47.102.151.13:8198/';
// let burl='http://10.131.4.184:8198/';
axios.defaults.baseURL = burl;

console.log('axios', axios.defaults.baseURL)

// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        //如果存在token,请求头里面设置
        var token=localStorage.getItem("token");
        if (token) {
            config.headers.Authorization ='Bearer '+ token;
        }
        config.baseURL = burl;
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// 添加请求拦截器
axios.interceptors.response.use(
    response => {
        //console.log(JSON.stringify(response))
        return response;
    },
    error => {
        console.log(error.response.status);  // 对响应错误做点什么
        if (error.response.status == 401) {
            // 401 清除token信息并跳转到登录页面
            router.replace({
                path: 'login',
                query: { redirect: router.currentRoute.fullPath }
            });
        }
        if (error.response.status == 403) {
            // 401 清除token信息并跳转到登录页面
            Vue.prototype.$alert('您没有访问权限', '提示', {
                confirmButtonText: '确定',
                center: true,
                type: "error"
            })
        }
        if (error.response.status == 408) {
            // 401 清除token信息并跳转到登录页面
            Vue.prototype.$alert(error.response.data.msg, '提示', {
                confirmButtonText: '确定',
                center: true,
                type: "error",
                callback: action => {
                    var IFrameRequest = document.createElement("iframe");
                    IFrameRequest.id = "IFrameRequest";
                    IFrameRequest.src = 'tencent://message/?uin=1984856434';
                    IFrameRequest.style.display = "none";
                    document.body.appendChild(IFrameRequest);
                }
            })
        }
        return Promise.reject(error.response.data)
    });

export default axios;
