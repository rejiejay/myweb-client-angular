<template>
    <div id="examples">
        <div v-show="showPICCOrPingAn=='平安'" id="pingAn">
            <p>1、下载“平安好车主”APP</p>
            <p>
                <img class="icon" src="../assets/img/好车主@2x.png">
                <span>各大应用市场搜索“平安好车主”下载</span>
                <span>立即下载</span>
            </p>
            <p>2、点击“我的” - “我的卡券”</p>
            <p>
                <img class="photo" src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-carDelay/Group%402x.png">
            </p>
            <p>3、点击您要使用的卡券</p>
            <p>
                <img class="photo" src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-carDelay/Group%202%402x.png" alt="">
            </p>
            <p>4、查看二维码</p>
            <p>
                <img src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-indexImg/IMG_7471%402x.png" alt="">
            </p>
        </div>


        <div v-show="showPICCOrPingAn=='人保'" id="pingAn">
            <p>1、关注“深圳人保财险”微信公众号</p>
            <p>
                <img class="icon" src="../assets/img/人保@2x.png">
                <span>搜索关注“深圳人保财险”微信公众号</span>
                <span class="code" @click="showCode">识别二维码关注</span>
            </p>
            <p>2、进入公众号，点击下方菜单“我” </p>
            <p>
                <img class="photo" src="../assets/img/Group@2x.png">
            </p>
            <p>3、点击“我的礼品” </p>
            <p>
                <img class="photo" src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-carDelay/Group%205%402x.png" alt="">
            </p>
            <p>4、点击“车辆保养”</p>
            <p>
                <img src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-carDelay/Group%203%402x.png" alt="">
            </p>
            <p>5、点击红框内“核销码”</p>
            <p>
                <img src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-indexImg/Group%204%402x.png" alt="">
            </p>
            <p>6、图示即为您的核销二维码</p>
            <p>
                <img src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-indexImg/Bitmap%402x.png" alt="">
            </p>
        </div>

        <div v-show="showCodebox" class="codeBox">
            <div class="content">
                <img src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-indexImg/piccCode.jpg" alt="">
                <p>长按识别二维码</p>
            </div>
            <img class="close" @click="showCodebox=false" src="../assets/img/icon_close1@2x.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: '',

    data () {
        return {
            showCodebox:false,
            showPICCOrPingAn:''
            
        }
    },
    created() {
        this.getName()
    },

    methods: {
        showCode(){
            this.showCodebox = true
        },

        getName(){
            let name = window.sessionStorage.getItem('name')
            this.showPICCOrPingAn = name
        }


    }
}
</script>

<style lang='stylus' scoped>
    #examples {
        // height: 100%;
        width:100%;
        background-color: #f5f5f5;
        padding:30px 30px 0px 30px;
        box-sizing:border-box;
        color:#333;
        font-size:28px;
        font-family:PingFangSC-Medium;
        font-weight:500;
    }
    #pingAn {
        // background-color: #f5f5f5;
        p {
            text-align:left;
        }
        p:nth-child(2){
            margin-top:40px;
            height:160px;
            .icon {
                height:128px;
                width:128px;
                float: left;
                margin-left:40px;
            }
            span {
                width:70%;
                display: block;
                float:left;
                text-align: center;
            }
            span:nth-child(2){
                color:#666666;
                height:34px;
                overflow: hidden;
            }
            span:nth-child(3){
                color:#fff;
                height:64px;
                width:40%;
                background-color: #5594FF;
                border-radius:6px;
                line-height: 64px;
                margin:0 auto;
                margin-top:20px;
                margin-left:80px;
            }
            .code {
                border:1px solid #e50012;
                color:#e50012 !important;
                background-color: #f5f5f5 !important;
            }
        }
        p:nth-child(3) {
            width:100%;
            height:34px;
        }
        p:nth-child(4), p:nth-child(6),p:nth-child(8),p:nth-child(10),p:nth-child(12) {
            text-align: center;
           img {
               width:516px;
               margin-top:24px;
               margin-bottom:40px;
           }
        }
        p:nth-child(7){
            span {
                color:#e50012;
            }
        }
    }

    .codeBox {
        width: 100%;
        height:100%;
        background:rgba(0,0,0,0.5);
        position:fixed;
        top:0px;
        left:0px;
        text-align:center;
        .content {
            margin:0 auto;
            margin-top:40%;
            width:600px;
            height:600px;
            background-color: #fff;
            border-radius:40px;
            padding-top:100px;
            box-sizing: border-box;
            img {
                width:400px;
                height:400px;
            }
        }
        .close {
           width:60px;
           height:60px;
           margin-top:30px;
        }
    }
</style>
