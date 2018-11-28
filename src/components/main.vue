<template>
    <div id="main">
        <div id="listTop"></div>
        <!-- 头部 -->
         <!-- 头部 -->
        <i id="allmap"></i>
        <div id="header"> 
            <p>
                <img class="position_icon" src="../assets/img/icon_position@2x.png">
                <span>{{city}}</span>
            </p>
            <div>
                <img class="logo" :src="this.$route.query.name=='平安'?require('../assets/img/pingan_LOGO@2x.png'):require('../assets/img/PICC LOGO@2x.png')">
                <p v-if="this.$route.query.name=='人保'">养车频道&中国人保服务平台</p>
                <p v-if="this.$route.query.name=='平安'">养车频道&中国平安服务平台</p>
            </div>
        </div>

        <!-- 步骤条 -->
        <div id="stepBar">
            <span class="active">选择车辆</span>
            <img src="../assets/img/icon_next03 copy@2x.png" alt="">
            <span class="active">服务项目</span>
            <img src="../assets/img/icon_next03 copy@2x.png" alt="">
            <span>预约门店</span>
        </div>

        <!-- 服务详情 -->
        <div id="info">
            <img :src="infoData.src">
            <span>{{infoData.name}}</span>
            <a @click="goReserveList">修改</a>
        </div>

        <!-- 车辆信息 -->
        <div v-show="showReplace" id="carInfo">
            {{carInfo.brand+" "+carInfo.series+" "+carInfo.years+" "+carInfo.model}}
        </div>

        <!-- 厂家指导手册 -->
        <div v-show="showReplace" id="manual">
            <div class="content">
                <p>厂商指导手册</p>
                <p>
                    <span>API级：</span>
                    <span>{{manuaData.原厂API}}</span>
                </p>
                <p>
                    <span>SAE级别：</span>
                    <span>{{manuaData.原厂粘度}}</span>
                </p>
                <p>
                    <span>加注量：</span>
                    <span>{{manuaData.机油加注量}}L</span>
                </p>
            </div>
            <div class="tip">
                <span>养车频道使用油品</span>
                <span> (按厂商指导手册匹配)</span>
            </div>
        </div>

        <!-- 汽油名 -->
        <div v-show="showReplace" id="qiYouBox">
            <p v-show="cantFind">
               <img :src="infoData.qiYouImg" alt="">
            </p>
            <p v-show="cantFind">{{infoData.qiYou}}</p>
            <p v-show="cantFind"  @click="goQiYouList">
               <span>选择品牌</span>
            </p>
            <p v-show="!cantFind">暂未找到油品</p>
            
        </div>

        <!-- 汽油升级提示   v-show="showQiYouBox"-->
        <div v-show="showReplace" id="qiYouTips">
            为您匹配的油品为厂商指导油品，养车频道提供三包服务。请勿更换油品，更换油品后产生的问题由您自己承担。
        </div>

        <!-- 服务介绍 -->
        <div id="introduce">
            <p>服务介绍</p>
            <div v-show="Remarks!=''" v-html="Remarks">
               {{Remarks}}
            </div>
        </div>

        <!-- 空的占位符 -->
        <div id="placehoder"></div>

        <!-- 选择预约门店 -->
        <div id="btn" @click="goShopList">
            选择预约门店
        </div>
        
        
    </div>
</template>
<script>
import headers from "../components/header.vue";
import { Indicator, Toast } from "mint-ui";
export default {
  components: {
    headers,
    Indicator,
    Toast
  },
  data() {
    return {
        city:window.sessionStorage.getItem('cityName'),
      // severName:this.$store.state.sName,
      infoData: {
        name: "", // 服务项目名
        src: "", // 服务项目图片
        qiYou: "", //油品名称
        OilLevel: "", //油品级别
        qiYouProductID: "", //油品id
        Volume: "", //油品升数
        qiYouImg: "" //油品图片
      },
      //控制汽油升级提示 显示隐藏
      showQiYouBox: false,
      //控制汽油数据列表的显示隐藏
      showQiYouListBox: false,
      //  控制是否显示更换和升级
      showReplace: false,
      // 服务介绍文本
      Remarks: "",
      // 汽车数据
      carInfo: "",
      // 厂家指导手册
      manuaData: "",
      // 找不到油品
      cantFind:true
    };
  },
  created() {
    //从本地存储中获取服务项目名和图片
    this.infoData.name = window.sessionStorage.getItem("serviceName");
    this.infoData.src = window.sessionStorage.getItem("serviceImg");

    // 从本地获取汽车数据展示
    this.carInfo = JSON.parse(window.sessionStorage.getItem("infoData"));

    // 获取厂家指导手册
    this.getManual();

    //调用获取油品方法
    this.getApproveProduct();

    this.getProduct();
  },

  mounted() {
    // 回到顶部
    let goTop = document.getElementById("listTop");
    if (goTop) {
      goTop.scrollIntoView();
    }
  },

  methods: {
    //前往服务项目列表
    goReserveList() {
      this.$router.push({
        path: "/reserveList"
      });
    },

    // 前往门店列表页
    goShopList() {
        window.sessionStorage.setItem(
            "ApproveProductID",
            this.infoData.qiYouProductID
        );
        this.$router.push({
            path: "/shopList"
        });
    },

    //获取油品
    getApproveProduct() {
      let infoData = JSON.parse(window.sessionStorage.getItem("infoData"));
      let data = `ProductID=${window.sessionStorage.getItem(
        "ProductID"
      )}&Brand=${infoData.brand}&Series=${infoData.series}&Years=${
        infoData.years
      }&Model=${infoData.model}`;
      console.log(data);

      this.$http.getApproveProduct1(data).then(res => {
        console.log(res.data);
        if (res.data.Code === 200) {
          if (res.data.Msg == "无需油品") {
            this.showReplace = false;
          } else {
            this.showReplace = true;
          }
          this.infoData.qiYouProductID = res.data.Data.ApproveProductID;
          this.infoData.qiYou = res.data.Data.ApproveProductName;
          this.infoData.OilLevel = res.data.Data.OilLevel;
          this.infoData.Volume = res.data.Data.Volume;
          this.infoData.qiYouImg = res.data.Data.Image1;
          //调用更换油品方法
          this.upDataQiYou();
        }
        if (res.data.Code === 403&&res.data.Msg == '找不到油品') {
            this.showReplace = true;
            this.cantFind = false
          this.infoData.qiYouProductID = res.data.Data.ApproveProductID;
          this.infoData.qiYou = res.data.Data.ApproveProductName;
          this.infoData.OilLevel = res.data.Data.OilLevel;
          this.infoData.Volume = res.data.Data.Volume;
          this.infoData.qiYouImg = res.data.Data.Image1;
          //调用更换油品方法
          this.upDataQiYou();
        }

      });
    },

    //获取服务详情
    getProduct() {
      this.$http
        .GetProduct1(window.sessionStorage.getItem("ProductID"))
        .then(res => {
          console.log(res.data);
          this.Remarks = res.data.Data[0].Remarks;
        });
    },

    // 前往汽油列表
    goQiYouList() {
      this.$router.push({
        path: "/qiYouList",
        query: {
          OilLevel: this.infoData.OilLevel,
          Volume: this.infoData.Volume
        }
      });
    },

    //更换油品
    upDataQiYou() {
      if (this.$route.query.ApproveProductID) {
        this.infoData.qiYouProductID = this.$route.query.ApproveProductID;
        this.infoData.qiYou = window.sessionStorage.getItem("qiYouName");
        this.infoData.qiYouImg = window.sessionStorage.getItem("qiYouImg");
      }
    },

    // 获取厂家指导手册
    getManual() {
      let data = `Brand=${this.carInfo.brand}&Series=${
        this.carInfo.series
      }&Years=${this.carInfo.years}&Model=${this.carInfo.model}`;
      this.$http.getManual1(data).then(res => {
        console.log(res.data);
        if (res.data.Code === 200) {
          this.manuaData = res.data.Data.CarModels_List[0];
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
#main {
    width: 100%;
    height: 100vh;
}

#header {
    width: 100%;
    height: 131px;
    background-color: #fff;

    p:nth-child(1) {
        height: 100%;
        width: 145px;
        line-height: 131px;
        margin-left: 20px;
        font-size: 24px;
        color: #666;
        float: left;

        .position_icon {
            width: 20px;
            height: 26px;
        }

        span {
            display: inline-block;
            width: 60%;
            vertical-align: middle;
        }
    }

    div {
        float: left;
        margin-left: 40px;

        .logo {
            margin-top: 28px;
            width: 300px;
            height: 30px;
        }

        p {
            line-height: 45px;
            font-size: 28px;
            color: #333;
            font-weight: bold;
        }
    }
}

// 步骤条
#stepBar {
    width: 100%;
    height: 108px;
    line-height: 108px;
    text-align: left;
    padding: 0px 40px;

    span {
        display: inline-block;
        width: 140px;
        height: 48px;
        border-radius: 24px;
        border: 1px solid rgba(204, 204, 204, 1);
        font-size: 24px;
        line-height: 48px;
        color: #999999;
        vertical-align: middle;
        text-align: center;
        margin-right: 35px;
    }

    span:last-child {
        margin-right: 0px;
    }

    img {
        width: 32px;
        height: 32px;
        margin-right: 35px;
    }

    .active {
        border: 1px solid rgba(229, 0, 18, 1);
        color: #E50012;
    }
}

// 服务详情
#info {
    width: 100%;
    height: 135px;
    background-color: #fff;
    padding: 30px 150px 30px 30px;
    display: table;
    position: relative;
    margin-bottom: 10px;

    img {
        width: 100px;
        height: 100px;
        float: left;
        margin-right: 30px;
    }

    span {
        color: #333;
        font-size: 28px;
        width: 600px;
        height: 72px;
        text-align: left;
        // float:left;
        display: table-cell;
        vertical-align: middle;
    }

    a {
        display: inline-block;
        width: 110px;
        height: 55px;
        border: 1.5px solid #E50012;
        font-size: 28px;
        color: #E50012;
        line-height: 55px;
        border-radius: 5px;
        position: absolute;
        top: 40px;
    }
}

// 车辆信息样式
#carInfo {
    width: 100%;
    height: 88px;
    background: rgba(225, 241, 255, 1);
    color: #5594FF;
    font-size: 28px;
    font-weight: bold;
    line-height: 88px;
}

// 厂家指导手册样式
#manual {
    width: 100%;
    height: 370px;
    background-color: #fff;
    padding-top: 20px;
    border-bottom: 1px solid #ddd;

    .content {
        width: 95%;
        height: 260px;
        background-color: #f5f5f5;
        margin: 0 auto;
        border-radius: 10px;
        font-size: 28px;
        color: #666666;
        text-align: left;
        padding-left: 20px;
        border: 1px solid #ddd;

        p:first-child {
            height: 87px;
            line-height: 87px;
            font-weight: bold;
            border-bottom: 1px solid #ddd;
            margin-bottom: 15px;
        }

        p {
            line-height: 45px;
        }
    }

    .tip {
        font-size: 28px;
        color: #333;
        width: 95%;
        text-align: left;
        margin: 0 auto;
        line-height: 87px;

        span:first-child {
            font-weight: bold;
        }
    }
}

#qiYouBox {
    width: 100%;
    height: auto;
    background-color: #fff;
    display: flex;
    padding: 26px 0px;

    p:first-child {
        flex: 1;

        img {
            width: 100px;
            height: 75px;
            margin-top: 9px;
        }
    }

    p:nth-child(2) {
        flex: 2;
        text-align: left;
        font-size: 28px;
        overflow: auto;
        color: #333;
    }

    p:nth-child(3) {
        flex: 1;
        font-size: 28px;
        color: #5594FF;

        span {
            display: block;
            width: 130px;
            height: 55px;
            border: 1px solid #5594FF;
            line-height: 55px;
            border-radius: 5px;
            margin: 0 auto;
            margin-top: 10px;
        }
    }
    p:nth-child(4){
        font-size:28px;
        margin-left:30px;
    }
}

#qiYouTips {
    width: 100%;
    height: 108px;
    border-top: 1px solid #ddd;
    color: #F61616;
    background-color: #fff;
    text-align: left;
    padding: 20px 30px 0px 30px;
    font-size: 24px;
}

#introduce {
    width: 100%;
    height: auto;
    background-color: #fff;
    margin-top: 10px;
    margin-bottom: 50px;

    p {
        padding-left: 30px;
        width: 100%;
        height: 78px;
        line-height: 78px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        font-size: 28px;
        color: rgba(102, 102, 102, 1);
    }

    div {
        text-align: left;
        font-size: 26px;
        padding: 0px 30px 30px 30px;
        margin-top: 30px;
    }
}

#placehoder {
    height:88px;
    width:100%;
}

#btn {
    width: 100%;
    height: 88px;
    border-radius: 7px;
    background: rgba(229, 0, 18, 1);
    position: fixed;
    bottom: 0px;
    color: #fff;
    font-size: 30px;
    line-height: 88px;
}
</style>


