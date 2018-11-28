<template>
    <div>
        <!-- 头部 -->
        <i id="allmap"></i>
        <div id="header">
            
            <p>
                <img class="position_icon" src="../assets/img/icon_position@2x.png">
                <span>{{city}}</span>
            </p>
            <div>
                <img class="logo" :src="this.$route.query.name=='平安'||this.$route.query.name=='理车云'?require('../assets/img/pingan_LOGO@2x.png'):require('../assets/img/PICC LOGO@2x.png')">
                <p v-if="this.$route.query.name=='人保'">养车频道&中国人保服务平台</p>
                <p v-if="this.$route.query.name=='平安'||this.$route.query.name=='理车云'">养车频道&中国平安服务平台</p>
            </div>
        </div>
    </div>
</template>
<script>
import html5WxBMapLocation from '../assets/js/html5WxBMapLocation.js'
    export default {
        data(){
            return {
                city:'',
            }
        },

        created(){
            console.log(this.$route.query.name)
            window.sessionStorage.setItem('name',this.$route.query.name)
            this.getPosition()  //调用定位方法获取城市名
        },

        methods:{
            getPosition(){
                html5WxBMapLocation(this, true).then(position => {
                    var map = new BMap.Map("allmap")
                    var point = new BMap.Point(position.longitude,position.latitude)
                    var gc = new BMap.Geocoder()
                    let _this = this
                    gc.getLocation(point, function(rs){
                        var addComp = rs.addressComponents;
                         _this.city = addComp.city
                         window.sessionStorage.setItem('cityName',_this.city)
                    })
                })
            }
        }
    }
</script>
<style lang="stylus" scoped>
    // 头部
#header {
  width: 100%;
  height: 131px;
  background-color: #fff;

  p:nth-child(1) {
    height: 100%;
    width:145px;
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
        display:inline-block;
        width:60%;
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
</style>

