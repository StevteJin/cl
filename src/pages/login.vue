<!--网页-->
<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-position="left" label-width="80px" class="login-box">
      <div class="loginbox">
        <div class="logintitle">
          <img src="../assets/slogo.png" alt="">
          <div>
            <span class="d1">金汇策略交易系统</span>
            <span>JIN HUI STRATEGIC TRDING SYSTEM</span>
          </div>
        </div>
        <div style="display: none">
          <input type="text" id="username">
          <input type="password" id="password">
        </div>
        <div class="btbox">
          <div class="bt2box"></div>
          <div class="bt1box">
            <div class="msgbox">
              <img src="../assets/loginimg/username1.png" alt="">
              <input v-model="form.username" type="text" autocomplete="off" placeholder="请输入您的账号">
            </div>
            <div class="msgbox">
              <img src="../assets/loginimg/password1.png" alt="">
              <input v-model="form.pwd" type="password" autocomplete="off" placeholder="请输入您的密码">
            </div>
            <div class="errorbox" v-if="errMsg">
              <img src="../assets/loginimg/error.png" alt="">
              <div>{{errMsg}}</div>
            </div>
            <div :class="{loginbtn:true,loginbtn1:!errMsg}" @click="login">登 &nbsp;&nbsp;录</div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import eventBus from "../eventBus.js";
import md5 from 'js-md5';
export default {
  data() {
    return {
      form: {
        username: localStorage.getItem("remenberUsername") || "",
        pwd: ""
      },
      errMsg: ""
    };
  },
  created() {},
  mounted: function() {
    this.listenResize();
    let height = $(window).height();
    $(".login-container").css("height", height + "px");
  },
  methods: {
    listenResize: function() {
      $(window).resize(function() {
        let height = $(window).height();
        $(".login-container").css("height", height + "px");
      });
    },
    login() {
      this.axios
        .post("login", {
          passport: this.form.username,
          password: md5(this.form.pwd)
        })
        .then(res => {
          console.log("login>>", res.data.data);
          if (res.data.code == 0) {
            let token=res.data.data.token;
            localStorage.setItem('token',token);
            localStorage.setItem('remenberUsername',this.form.username);
            this.$router.push({
              path: 'index3'
            });
          } else {
            this.errMsg = res.data.msg;
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
.login-box .el-form-item {
  width: 380px;
  height: 40px;
  text-align: center;
}
.login-box .el-form-item__label {
  color: #ccc;
  font-size: 14px;
}
.login-box .el-form-item__content .el-input__inner {
  width: 300px;
}
</style>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  height:100vh;
  background: #242424;
  box-sizing: border-box;
}
.login-box {
  width: 826px;
  height: 720px;
  background-image: url(../assets/bigbg.png);
  background-repeat: no-repeat;
  background-size: 700px 700px;
  background-position: center 30px;
  margin: 0 auto;
  overflow: hidden;
}
.loginbox {
  margin-top: 300px;
  text-align: center;
}
.logintitle {
  color: #fff;
  margin-bottom: 30px;
  overflow: hidden;
  margin-left:270px;
}
.logintitle img {
  width: 63px;
  float: left;
  margin-right:10px;
}
.logintitle div {
  float: left;
  margin-top:10px;
  margin-left:10px;
}
.logintitle div span {
  font-size: 10px;
  display: block;
  text-align: left;
  color: #6d778b;
}
.logintitle div .d1 {
  font-size: 22px;
  color: #fff;
  margin-bottom:5px;
}
.loginbox .btbox {
  width: 405px;
  margin-left: 210px;
  height: 250px;
  border-radius: 13px;
  position: relative;
  overflow: hidden;
  padding-top: 50px;
  box-sizing: border-box;
}
.loginbox .bt2box {
  width: 405px;
  height: 250px;
  background: rgba(255, 255, 255, 1);
  opacity: 0.1;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 13px;
  z-index:10;
}
.loginbox .bt1box {
  position: absolute;
  top: 50px;
  left: 0;
  z-index:20;
}
.loginbox .msgbox {
  width: 320px;
  margin-left: 42.5px;
  height: 43px;
  margin-bottom: 8px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.loginbox .msgbox:first-child{
  margin-top:-10px;
  margin-bottom:18px;
}
.loginbox .msgbox img {
  width: 13px;
  height: 14px;
  float: left;
  margin-top: 14.5px;
  margin-left: 14px;
}
.loginbox .msgbox1 img {
  width: 16px;
  height: 12px;
}
.loginbox .msgbox input {
  float: left;
  width: 270px;
  height: 33px;
  margin-top: 5px;
  box-sizing: border-box;
  padding-left: 10px;
  background-color: transparent;
  color: #ffffff;
  font-size: 14px;
  line-height: 33px;
  outline: none;
}
.loginbox .loginbtn {
  width: 320px;
  margin-left: 42.5px;
  height: 27px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  box-sizing: border-box;
  line-height: 27px;
  cursor: pointer;
  background-color: #e46943;
}
.loginbox .loginbtn1{
 margin-top: 30px;
}
.login-container .shezhi {
  width: 33px;
  height: 32px;
  position: absolute;
  right: 80px;
  top: 40px;
  cursor: pointer;
}
.errorbox {
  height: 43px;
  overflow: hidden;
  box-sizing: border-box;
  margin-left:40px;
}
.errorbox img {
  width: 13px;
  height: 13px;
  margin-top: 15px;
  float: left;
}
.errorbox div {
  float: left;
  line-height: 43px;
  font-size: 12px;
  margin-left: 10px;
  color: #fff;
}
</style>
