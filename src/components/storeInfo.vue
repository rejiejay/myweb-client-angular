<template>
    <div>
          <!-- 门店详情 -->
       <div id="shopInfo" >
           <div class="banner">
               <img :src="shopInfoData.StoreImg" alt="">
           </div>
           <div class="info">
               <div class="shopNameBox">
                   <p>{{shopInfoData.StoreName}}</p>
                  <p>
                    <img  v-for="start in shopInfoData.StartLevel" src="../assets/img/icon_star01@2x.png" alt="">
                    <img  v-for="start1 in 5-shopInfoData.StartLevel"  src="../assets/img/icon_star02@2x.png" alt=""> 
                    <span>{{shopInfoData.StartLevel}}.0</span> 
                  </p>
                  <a @click="goCall">
                      <img class="tel" src="../assets/img/icon_call@2x.png" alt="">
                  </a>
                  <!-- <img class="tel" src="../assets/img/icon_call@2x.png" alt=""> -->
               </div>
               <div class="address">
                   <img src="../assets/img/icon_position02@2x.png">
                   <p>{{shopInfoData.Address}}   &nbsp;&nbsp;&nbsp;&nbsp;{{this.$route.query.distance}}km</p>
                   <img @click="goMap()" class="map" src="../assets/img/icon_map03@2x.png">
               </div>
               <p class="time">
                   <span>
                       <img src="../assets/img/icon_time@2x.png" alt="">
                       <span>营业时间: {{shopInfoData.StartTime+' '+shopInfoData.EndTime}}</span>
                   </span>
                   <span>
                       <img src="../assets/img/icon_station@2x.png" alt="">
                       <span>工位数: {{shopInfoData.StationCount}}</span>
                   </span>
               </p>
               <p class="space"></p>
               <div class="commentList">
                   <div class="title">
                       <span>综合评分</span>
                        <ul>
                            <li v-for="start2 in shopInfoData.StartLevel" >
                                <img src="../assets/img/icon_star01@2x.png" alt="">
                            </li>
                            <li v-for="start3 in 5-shopInfoData.StartLevel">
                                <img src="../assets/img/icon_star02@2x.png" alt="">
                            </li>
                        </ul>
                        <span class="number">{{shopInfoData.StartLevel}}.0</span> 
                        <span class="allcomment">{{1000}}条评价</span>                                             
                   </div>
                   <ul class="list">
                       <li v-for="(ITEM,INDEX) in shopInfoData.data" :key="INDEX">
                           <img class="icon" :src="ITEM.icon">
                           <p>{{ITEM.name}}</p>
                            <p> 
                                <img v-for="start4 in 5" src="../assets/img/icon_star01@2x.png" alt="">
                                 <img v-for="start5 in 5-5" src="../assets/img/icon_star02@2x.png" alt=""> 
                            </p>
                            <p>
                               {{ITEM.text}}
                            </p>
                       </li>
                       <!-- <p class="allCommentPage">
                           <span>查看全部评价</span>
                           <img src="../assets/img/icon_arrow03@2x.png" alt="">
                       </p> -->
                   </ul>
               </div>
           </div>
            
       </div>
       <div @click="goConfirmPage" id="btn">
                确认选择
        </div>
    </div>
</template>

<script>
export default {
    name: '',

    data () {
        return {
            //门店详情
            shopInfoData: [
                // {
                    //     name: "中国和谐控股豪华汽车维修中心",
                    //     star: 4,
                    //     address: "深圳市龙华新区清龙路原彬峰十多个更多上课了尖峰时刻两地分居",
                    //     km: "5",
                    //     time: "08:30-21:00",
                    //     people: "888",
                    //     allStar: 5,
                    //     allComment: "1000",
                    //     data: [
                    //         {
                    //         icon: require("../assets/img/gril/6.jpg"),
                    //         name: "深夜在路边偷井盖的贼",
                    //         star: 4,
                    //         text:
                    //             "服务非常周到，oh地方是决定分开来到了疯狂的法律快点发过来的弗兰克热情细致专业，强力推荐！服务非 常周到，热情细致专业！强力推荐！！！"
                    //         },
                    //         {
                    //         icon: require("../assets/img/gril/7.jpg"),
                    //         name: "深夜在路边抓偷井盖的贼",
                    //         star: 5,
                    //         text:
                    //             "服务非常周到，热情细致专业，强力推荐！服务非 常周到，热情细致专业！强力推荐！！！"
                    //         },
                    //         {
                    //         icon: require("../assets/img/gril/7.jpg"),
                    //         name: "深夜在路边抓偷井盖的贼",
                    //         star: 5,
                    //         text:
                    //             "服务非常周到，热情细致专业，强力推荐！服务非 常周到，热情细致专业！强力推荐！！！"
                    //         }
                    //     ]
                // }
            ],
        }
    },
    created() {
       this.goStorInfo() 
    },

    methods: {
        goStorInfo(){
            let infoData = JSON.parse(window.sessionStorage.getItem("infoData"));
            let data = {
                StoreID:this.$route.query.StoreID,
                Brand:infoData.brand,// "宝马",
                Series: infoData.series,//"5系",
                platform:window.sessionStorage.getItem('name'),//'人保',
                has4SProduct:false,
                FreeService:'',
                ProductType:''
            }
            this.$http.getStoreInfo1(data).then(res => {
                let data = [
                    {
                    icon: require("../assets/img/gril/6.jpg"),
                    name: "情***名",
                    star: 4,
                    text:
                        "服务非常周到，oh地方是决定分开来到了疯狂的法律快点发过来的弗兰克热情细致专业，强力推荐！服务非 常周到，热情细致专业！强力推荐！！！"
                    },
                    {
                    icon: require("../assets/img/gril/7.jpg"),
                    name: "深夜****边",
                    star: 5,
                    text:
                        "服务非常周到，热情细致专业，强力推荐！服务非 常周到，热情细致专业！强力推荐！！！"
                    },
                    {
                    icon: require("../assets/img/gril/3.jpg"),
                    name: "路边****盖",
                    star: 4,
                    text:
                        "服务非常周到，热情细致专业，强力推荐！服务非 常周到，热情细致专业！强力推荐！！！"
                    }
                ]
                    // console.log(res.data);
                    if(res.data.Code===200){
                        this.shopInfoData = res.data.Data
                        this.shopInfoData['data'] =  data
                     
                    }
                });

        },

          //
        goConfirmPage() {
            window.sessionStorage.setItem('storeInfo',JSON.stringify(this.shopInfoData))
            this.$router.push({
                path: "/confirm",query:{name:window.sessionStorage.getItem('name')}
            });
        },

        
        goCall(){
            window.location.href = `tel:${this.shopInfoData.ContactPhone}`
        },

         goMap(){
            //  console.log(this.shopInfoData)
            window.location.href = `http://kf.szpiccxxjsb.cn/wxapi/map/map.html?lat=${this.shopInfoData.latitude}&lng=${this.shopInfoData.longitude}&type=bd&name=${this.shopInfoData.StoreName}&address=${this.shopInfoData.Address}`;
        },
    }
}
</script>

<style lang='stylus' scoped>
    #shopInfo {
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    .banner {
        width: 100%;
        height: 560px;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .info {
        width: 100%;
        height: 100%;
        background-color: #fff;

        .shopNameBox {
            width: 100%;
            height: 133px;
            text-align: left;
            padding: 0px 30px;
            padding-top: 20px;
            border-bottom: 1px solid #ddd;

            p:first-child {
                font-size: 30px;
                color: #333;
               
            }

            p:nth-child(2) {
                margin-top: 10px;

                ul {
                    li {
                        float: left;
                    }
                }

                img {
                    width: 28px;
                    height: 26px;
                }

                span {
                    font-size: 28px;
                    color: #FF3D35;
                    vertical-align: middle;
                    margin-left: 20px;
                }
            }

            a {
                width: 38px;
                height: 38px;
                float: right;
                margin-top: -65px;
                margin-right: 27px;
                display: inline-block;
            }

            .tel {
                width: 38px;
                height: 38px;
                float: right;
                // margin-top:-65px;
                // margin-right:27px;
            }
        }

        .address {
            width: 100%;
            height: 113px;
            border-bottom: 1px solid #ddd;
            padding: 0px 30px;
            padding-top: 20px;
            img {
                width: 32px;
                height: 32px;
                float: left;
                margin-top: 15px;
                margin-right: 20px;
            }

            p {
                font-size:24px;
                width: 496px;
                height: 64px;
                text-align: left;
                color: #999;
                display: table-cell;  
                vertical-align: middle;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

            }

            .map {
                width: 40px;
                height: 40px;
                float: right;
                margin-right: 27px;
                margin-top:-45px;
            }
        }

        .time {
            height: 88px;
            width: 100%;
            line-height: 88px;
            color: #999;
            padding: 0px 30px;

            img {
                width: 30px;
                height: 30px;
                margin-right: 15px;
            }

            span {
                span {
                    vertical-align: middle;
                }
            }

            span:first-child {
                margin-right: 60px;
                float: left;
            }
        }

        .space {
            width: 100%;
            height: 10px;
            background-color: #f5f5f5;
        }

        .commentList {
            width: 100%;
            height: 100%;
            background-color: #fff;

            .title {
                width: 100%;
                height: 78px;
                padding: 0px 30px;
                text-align: left;
                line-height: 78px;
                border-bottom: 1px solid #ddd;

                span {
                    float: left;
                    font-size: 30px;
                    margin-right: 30px;
                    color: #666;
                }

                ul {
                    height: 78px;
                    width: 160px;
                    float: left;

                    li {
                        float: left;
                        margin-top: -5px;

                        img {
                            width: 28px;
                            height: 26px;
                        }
                    }
                }

                .number {
                    color: #FF3D35;
                }

                .allcomment {
                    float: right;
                    color: #999;
                    font-size: 24px;
                }
            }

            .list {
                width: 100%;
                padding: 0px 30px;

                li {
                    width: 100%;
                    height: auto;
                    border-bottom: 1px solid #ddd;
                    text-align: left;
                    padding: 30px 0px;

                    .icon {
                        width: 54px;
                        height: 54px;
                        border-radius: 50%;
                        float: left;
                        margin-right: 20px;
                    }

                    p:nth-child(2) {
                        color: #666;
                        font-size: 28px;
                    }

                    p:nth-child(4) {
                        margin-top: 10px;
                        color: #333;
                        width: 90%;
                        margin-left: 69px;
                        font-size: 28px;
                    }

                    p {
                        img {
                            width: 28px;
                            height: 26px;
                        }
                    }
                }
            }

            .allCommentPage {
                height: 88px;
                width: 100%;
                line-height: 88px;

                span {
                    font-size: 30px;
                    color: #FF3D35;
                }

                img {
                    width: 20px;
                    height: 20px;
                    margin-top: -10px;
                }
            }
        }
    }

   
}
 #btn {
        width:45%;
        height:80px;
        background: rgba(229, 0, 18, 1);
        position: fixed;
        bottom: 20px;
        left: 28%;
        color: #fff;
        font-size: 30px;
        line-height: 80px;
        border-radius:44px;     
        box-shadow:0px 5px 20px 0px rgba(229,0,18,0.4);

    }
</style>
