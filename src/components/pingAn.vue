<template>
    <div id="piccPage">
         <img class="one" src="../assets/img/pingAn/pingan1.png" alt=""> 
         <img class="two" src="../assets/img/pingAn/pingan2.png" alt=""> 
         <img class="three" src="../assets/img/pingAn/pingan3.png" alt=""> 
         <img class="four" src="../assets/img/pingAn/pingan4.png" alt=""> 
         <div class="text">
             <div class="content">
                <p class="black">预约方式： </p>
                <p>客服人员会在您点选服务后即刻联系您，为您确认预约</p>
                <p class="black">服务时间： </p>
                <p>60分钟左右(视车型而定，请以现场服务时间为准)</p>
                <p class="black">服务有效期： </p>
                <p>预约之日起7日内有效</p>
                <p class="black">服务内容： </p>
                <p>原厂标准的基础保养服务，包含原厂机油、原厂机滤和工时费</p>
                <p class="black">注意事项： </p>
                <p>4S店原厂保养服务需要提前预约，如到店服务时有任何疑问可随时联系我们~</p>
             </div>
             
         </div>
         <p id="placeholder"></p>
         <div class="btn">
             <div class="left" @click="service">
                 <img src="../assets/img/pingAn/pingan5.png" alt="">
                 <span>咨询投诉</span>
             </div>
             <div class="right" @click="goAppointment">
                立即预约
             </div>
         </div>
    </div>
</template>

<script>
// import RequestedURL from "./../../config/RequestedURL.js"; //导入链接
export default {
    name: '',

    data () {
        return {
            openID:''
        }
    },
    created() {
        this.getCode()
       
    },

    methods: {
        // 联系客服
        service(){
            window.location.href = `tel:400-110-6558`
        },

        // 跳转到登录页
        jumpToLogin() {
            let openid = this.openID;

            window.location.href = `../register/index.html#/index/${window.localStorage.getItem('openid')}?pageType=LCY`; //这里用本地存的openid比较稳定
        },

        // 获取用户信息判断是否已经登入  跳转对应的页面
        goAppointment(){
            this.$http.getUserInfo1(window.localStorage.getItem('openid')).then(res=>{
               if(res.data.Code === 200 && res.data.Data) {
                   // 跳转到预约首页
                    window.location.href = `../carReservation/index.html#/?openId=${window.localStorage.getItem("openid")}&name=理车云`;
               }else {
                   // 调用跳转登录页
                    this.jumpToLogin();
               }
            })
        },

        // 获取openid
        getCode(){
            // console.log(window.location.search)  
            function loadPageVar (sVar) {
                return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
            }

            var code =loadPageVar("code")

            // 判断url 是否有code 如果没有就获取code  
            if(code==''){
                let data = {
                    url :`http://${window.location.host}/wx20/carReservation/index.html#/LCY`,
                    code:'',
                }
                this.$http.getOpenID1(data).then(res=>{
                    console.log(res.data)
                    window.location.href =res.data.Data.url
                })

            }else {
                // 如果有code 就用code去获取用户的openid
                let data = {
                    code:code
                }
                this.$http.getOpenID1(data).then(res=>{
                    console.log(res.data)
                    if(res.data.Code===200){
                        console.log(res.data.Data)
                        // 保存获取到的openid
                        this.openID = res.data.Data.openid
                        window.localStorage.setItem('openid',res.data.Data.openid)
                    }
                })
            }
        }

    }
}
</script>

<style lang='stylus' scoped>
#piccPage {
    height:100%;
    width:100%;
    text-align:center;
    background-color: #f5f5f5;
    box-sizing: border-box;
  
}
    img {
        width:95%;
    }
    .one {
        width:98%;
        margin-top:10px;
    }
    .two {
        margin-bottom:10px;
    }
    .three {
        margin-bottom:10px;
    }
    #placeholder {
        height:135px;
        width:100%;
        // background-color:#f5f5f5;
    }
    .btn {
        height:105px;
        width:100%;
        padding:14px 30px 0px 30px;
        background:rgba(0,0,0,0.39);
        box-sizing: border-box;
        position:fixed;
        bottom:0px;
        .left {
            width:40%;
            height:80px;
            background-color:#FFFFFF;
            border-radius:40px;
            float:left;
            line-height: 76px;

            span {
                color:#F55900;
                font-size:28px;
                vertical-align: middle;
            }
            img {
                width:28px;
                height:28px;
                vertical-align: middle;
                
            }

        }
        .right{
            width:55%;
            height:80px;
            border-radius:40px;
            line-height: 80px;
            color:#fff;
            font-size:28px;
            float:right;
            background:linear-gradient(45deg,rgba(255,131,54,1) 0%,rgba(255,113,0,1) 100%);
        }
    }
    .text {
        width:100%;
        height:auto;
        background-color: #f5f5f5;
        font-size:24px;
        text-align:left;
        box-sizing: border-box;
        margin-top:-11px;
        padding:0 20px;
        .content {
            p {
                line-height:40px;
            }
            background-color: #fff;
            padding:20px 20px;
            color:#666;
            border-radius:0px 0px 8px 8px;
            .black {
                font-weight: bold;
            }
        }
    }
</style>
