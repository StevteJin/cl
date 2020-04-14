<template>
  <div>
    <div class="codebox" v-if="sureShow==true">
      <span>推广金汇资管即可获得丰厚提成。扫描下方二维码注册属于您的专属推广账号。</span>
      <img src="../assets/ercode.png" alt="">
    </div>
    <div class="foot-bar">
      <span>2018-2019 Capital Fusion, ALL RIGHTS RESERVED</span>
      <!-- <a href="tencent://message/?uin=1984856434">
        <span class="qq-show">
          <img src="../assets/QQ.png" alt="">
          <span>联系我们</span>
        </span>
      </a> -->
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      sureShow:false
    }
  },
  methods:{
    showNow(){
      this.sureShow=true;
    },
    noShow(){
      this.sureShow=false;
    }
  }
};
</script>

<style lang="scss" scoped>
.foot-bar {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: rgb(94, 94, 94);
  font-size: 12px;
  color: #fff;
  text-align: center;
  position: fixed;
  left: 0px;
  bottom: 0px;
}
.foot-bar span {
  color: #fff;
}
.foot-bar .code-show {
  float: left;
  margin-left: 20px;
  cursor: pointer;
}
.foot-bar .qq-show {
  float: right;
  margin-right: 20px;
  cursor: pointer;
}
.foot-bar .qq-show * {
  float: left;
}
.foot-bar .qq-show img {
  width: 16px;
  margin-top: 12px;
  margin-right: 10px;
}
.codebox {
  position: absolute;
  width: 210px;
  height: 300px;
  background-color: rgb(239, 239, 239);
  left: 20px;
  bottom: 40px;
  font-size: 14px;
  box-sizing: border-box;
  color: #000;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
}
.codebox img {
  width: 160px;
  margin-top: 10px;
}
.codebox:before {
  content: "";
  width: 0px;
  height: 0px;
  // border-top: 10px solid #cccccc;
  // border-left: 10px solid transparent;
  // border-right: 10px solid transparent;
  width:0px;
  height:0px;
  border-width: 12px;
  border-style: solid;
  border-color:rgb(239, 239, 239) transparent transparent rgb(239, 239, 239);
  position: absolute;
  top: 286px;
  left: 0px;
  z-index: 10000;
}
</style>