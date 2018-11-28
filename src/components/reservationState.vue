<template>
    <div>
        <div id="header">
            <div class="loding">
                <p v-if="status=='6'||status=='4'||status=='7'||status=='8'" class="yellow">等待商家确认</p>
                <p v-if="status=='6'||status=='4'||status=='7'||status=='8'" class="yellow size">商家将在{{date}} 18:00 前为您确认</p>
                <p v-if="status=='1'&&IsMatch=='0'" class="blue">预约成功</p>
                <p v-if="status=='1'&&IsMatch=='0'" class="blue size">商家已确认,请准时前往门店服务~</p>
                <p v-if="status=='2'||status=='3'" class="blue">服务完成</p>
                <p v-if="status=='2'" class="blue size">{{LastUpdatedDate}} 服务完成</p>
                <p v-if="status=='1'&&IsMatch=='1'" class="blue1">服务完成</p>
                <p v-if="status=='1'&&IsMatch=='1'" @click="goComment" class="red">评价</p>
                <p v-if="status=='5'||status=='-1'" class="gray">预约已取消</p>
                <p v-if="status=='5'||status=='-1'" class="gray size">{{date}}取消预约</p>
            </div>
        </div>
        <div id="info">
            <div class="top">
                <img class="icon" :src="img" alt="">
                <p>{{storeName}}</p>
                <p>
                    <img v-for="star in 4" :key="star" src="../assets/img/icon_star01@2x.png" alt="">
                    <img v-for="star in 5-4" src="../assets/img/icon_star02@2x.png" alt="">
                    <span>4.0</span>
                </p>
                <p>
                    <img src="../assets/img/icon_position@2x.png">
                    <span>{{address}}</span>
                    <!-- <span>{{juli}}km</span> -->
                </p>
            </div>
            <div class="bottom">
                <a @click="call()">
                      <img src="../assets/img/icon_call@2x.png" alt="">
                      <span>联系门店</span>
                  </a>
                  <p @click="goMap">
                      <img src="../assets/img/icon_map03@2x.png">
                      <span>地图导航</span>
                  </p>
            </div>
        </div>
        <div id="message">
            <p>
                <span>预约服务 :</span>
                <span>{{serviceName}}</span>
                <!-- <span>服务详情&nbsp;
                     <img src="../assets/img/Path 2@2x.png" alt="">
                </span> -->
               
            </p>
            <p>
                <span>车&nbsp; 牌&nbsp; 号 :</span>
                <span>{{carNo}}</span>
            </p>
            <p>
                <span>预约时间 :</span>
                <span>{{time}}</span>
            </p>
            <p>
                <span>联&nbsp; 系&nbsp; 人 :</span>
                <span>{{userName}}</span>
            </p>
            <p>
                <span>联系电话 :</span>
                <span>{{userTel}}</span>
            </p>
        </div>
        <div v-show="status=='1'&&IsMatch=='0'||status=='6'||status=='4'||status=='7'||status=='8'" @click="cancelApointment" id="btn">
            取消预约
        </div>
        <div v-show="status=='-1'||status=='2'||status=='3'||status=='4'||status=='5'||status=='7'||status=='8'||status=='1'||status=='6'||IsMatch=='1'" @click="goHome" id="btn1">
           返回首页
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import 'mint-ui/lib/style.css'
    export default {
        components:{
            Toast,
            MessageBox
        },
        data(){
            return {
                status:'',      //预约状态
                img:'',         //店图片
                storeName:'',   //店名
                score:'',       //评分
                address:'',     //店面地址
                distance:'',    //距离
                storeTel:'',    //店面电话
                log:'',         //店面经度
                lat:'',         //店面纬度
                serviceName:'', //服务项目名
                carNo:'',       //车牌号
                time:'',        //预约时间
                userName:'',    //用户名
                userTel:'',     //用户号码
                date:'',        //客户主动取消预约当天的日期,
                date1:'',       //根据时间判断是否是当天处理 
                juli:'',

                lat:'',
                lng:'',

                IsMatch:'',

                LastUpdatedDate:'',   // 非客户更改预约状态修改的时间


            }
        },
        created(){
            this.getAppointmentList()
            this.getDate()
            this.getDistance()
            
            this.timer = setInterval(()=>{
                this.getAppointmentList()
            },10000)
        },
        mounted() {
              
        },

        //离开页面就销毁计时器
        beforeDestroy() {
             window.clearInterval(this.timer);
        },

        methods:{
            //前往地图导航
            goMap(){
                window.location.href = `http://kf.szpiccxxjsb.cn/wxapi/map/map.html?lat=${this.lng}&lng=${this.lat}&type=bd&name=${this.storeName}&address=${this.address}`
            },

            //获取预约列表
            getAppointmentList() {
                let data ={
                    CustomerID:this.$route.query.CustomerID,
                    BookID:this.$route.query.BookID
                }
                this.$http.getDatas1(data).then(res => {
                    console.log(res.data)
                    if(res.data.Data.List[0].Status_=='-1'||res.data.Data.List[0].Status_=='2'||res.data.Data.List[0].Status_=='3'||res.data.Data.List[0].Status_=='5'||res.data.Data.List[0].IsMatch_=='1'){
                        document.getElementById('btn1').style.width = '91%'
                    }else {
                        document.getElementById('btn1').style.width = '44%'
                    }
                    this.status = res.data.Data.List[0].Status_
                    this.img = res.data.Data.List[0].StoreImage
                    this.storeName = res.data.Data.List[0].StoreName
                    this.score = res.data.Data.List[0].score
                    this.address = res.data.Data.List[0].StoreAddress
                    this.distance = res.data.Data.List[0].distance
                    this.storeTel = res.data.Data.List[0].StoreTel
                    this.lng = res.data.Data.List[0].lng
                    this.lat = res.data.Data.List[0].lat
                    this.serviceName = res.data.Data.List[0].ServiceName
                    this.carNo = res.data.Data.List[0].CarNo
                    this.time = res.data.Data.List[0].BookDate+' '+res.data.Data.List[0].BookTime
                    this.userName = res.data.Data.List[0].UserName
                    this.userTel = res.data.Data.List[0].Mobile
                    this.LastUpdatedDate = res.data.Data.List[0].LastUpdatedDate
                    this.lat = res.data.Data.List[0].Map_X
                    this.lng = res.data.Data.List[0].Map_Y
                    this.IsMatch = res.data.Data.List[0].IsMatch_

                });
            },

            // 拨打门店电话
            call(){
                window,location.href = `tel:${this.storeTel}`
            },

            // 获取当天的日期
            getDate(){
                if(this.$route.query.hours>17){
                    var date1 = new Date();
                    var date2 = new Date(date1);
                    // 往后1天
                    date2.setDate(date1.getDate()+1);

                    this.date = date2.getFullYear()+'-'+ (date2.getMonth()+1) + "-" + date2.getDate()
                }else {
                    var date = new Date()
                    this.date =date.getFullYear()+'-'+ (date.getMonth()+1) + "-" + date.getDate()
                }
                
               
                // this.date =day.getFullYear()+'-'+ (day.getMonth()+1) + "-" + day.getDate()+' '+ day.getHours()+':'+day.getMinutes()+':'+day.getSeconds();
                
            },


            // 取消预约
            cancelApointment(){
                MessageBox.confirm('确定取消预约?').then(action => {
                    let data = {
                        Status:'-1',
                        BookID:this.$route.query.BookID,
                        CustomerID:this.$route.query.CustomerID
                    }
                    this.$http.cancelApointment1(data).then(res=>{
                        console.log(res.data)
                        if(res.data.Code===200){
                            this.status = '-1'
                            document.getElementById('btn1').style.width = '91%'
                            Toast({
                                message:'取消预约成功',
                                duration:1000
                            })
                             window.clearInterval(this.timer);
                        }else {
                        Toast({
                                message:'取消预约失败',
                                duration:1000
                            }) 
                        }
                    })
                });
            },

            //回到首页
            goHome(){
                window.location.href = `http://${window.location.host}/wx20/index.html`
            },

            //从本地中获取距离
            getDistance(){
                this.juli = window.sessionStorage.getItem('distance')
            },

            // 前往评价页面
            goComment(){
                this.$router.push({
                    path:'/comment',query:{CustomerID:this.$route.query.CustomerID,BookID:this.$route.query.BookID}
                })
            }
        }
    }
</script>
<style lang="stylus" scoped>
    #header {
        width:100%;
        height:201px;
        margin-bottom:10px;
        .loding {
            width:100%;
            height:100%;
            background-color: #fff;
            padding-top:65px;
            font-size:32px;
            p:first-child {
                font-size:32px;
                margin-bottom:10px;
                font-weight:bold;

            }
            .green {
                color:#00B90A;
            }
            .yellow {
                color:#FF8D18;
            }
            .size {
                font-size:24px;
            }
            .blue {
                color:#5594FF;
            }
            .gray {
                 color:#999;
            }
            .red {
                background-color:#5594FF;
                color:#fff;
                width:200px;
                height:64px;
                line-height:64px;
                border-radius:5px;
                margin:0 auto;
                font-weight:normal !important;
                
            }
            .blue1 {
                 color:#5594FF;
                 margin-top:-20px;
            }
        }
        .loding1 {
            width:100%;
            height:100%;
            background-color: #fff;
            color:#999;
            padding-top:65px;
            font-size:24px;
            p:first-child {
                font-size:32px;
                margin-bottom:10px;
               
                font-weight:bold;

            }
        }
    }
    #info {
        height: 261px;
        width: 100%;
        background-color: #fff;
        position:relative;
        .top {
            height: 180px;
            width: 100%;
            padding: 30px;
            text-align:left;
            border-bottom:1px solid #ddd;
            .icon {
                width:160px;
                height:120px;
                float:left;
                margin-right:20px;
            }
            p:nth-child(2) {
                font-size:30px;
                color:#333;
                margin-top:-6px;
                margin-bottom:4px;
                  height:38px;
                overflow :hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width:65%;
            }
            p:nth-child(3) {
                height:40px;
                line-height:40px;
                font-size:28px;
                color:#FF3D35;
                margin-bottom:6px;
                img {
                    width:28px;
                    height:26px;
                    margin-top:-8px;
                }
            }
            p:nth-child(4) {
                img {
                    width:20px;
                    height:25px;
                }
                span {
                    color:#999;
                    vertical-align:middle;
                }
                span:nth-child(2) {
                    display:inline-block;
                    width:50%;
                    // height:26px;
                    overflow :hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            p:nth-child(5) {
                width:110px;
                height:55px;
                border:1px solid #E50012;
                border-radius:5px;
                line-height:55px;
                color:#E50012;
                font-size:30px;
                text-align:center;
                position:absolute;
                top:63px;
                right:30px;
            }
        }
        .bottom {
            width:100%;
            height:80px;
            p {
                width:49%;
                height:100%;
                font-size:28px;
                color:#808080;
                line-height:80px;
                img {
                    width:32px;
                    height:32px;
                }
            }
            // p:first-child {
            //     border-right:1px solid #ddd;
            //     float:left;
            // }
            a {
               width:49%;
                height:100%;
                font-size:28px;
                color:#808080;
                line-height:80px; 
                display:inline-block;
                float:left;
                img {
                    width:32px;
                    height:32px;
                }
            }
            p:nth-child(2) {
                border-left:1px solid #ddd;
                float:right;
            }
        }
    }
    #message {
        width:100%;
        margin-top:10px;
        background-color :#fff;
        padding:0px 30px;
        p {
            width:100%;
            height:88px;
            border-bottom:1px solid #ddd;
            line-height:88px;
            text-align:left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            img {
                width:20px;
                height:22px;
                float:right;
                margin-top:30px;
            }
            span:first-child {
              font-size:28px;
              color:#666;
              margin-right:30px;  
            }
            span:nth-child(2){
                color:#333;
                font-size:28px;
            
            }
            span:nth-child(3){
                color:#5594FF;
                font-size:28px;
                float:right;
                line-height:80px;
            
            }
        }
        p:last-child {
            border-bottom:none;
        }
    }
    #btn {
         width: 44%;
        height:88px;
        font-size:28px;
        line-height:88px;
        margin-top:40px;
        background-color: #b3b3b3;
        color: #fff;
        border-radius:7px;
        float:left;
        margin-left:30px;

    }
    #btn1 {
        width: 44%;
        height:88px;
        font-size:28px;
        line-height:88px;
        margin-top:40px;
        background-color: #E50012;
        color: #fff;
        border-radius:7px;
        float:right;
        margin-right:30px;
    }
</style>

