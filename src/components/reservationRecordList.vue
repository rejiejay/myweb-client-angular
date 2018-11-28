<template>
    <div>
        <div id="list">
            <ul>
                <li @click="goInfoPage(item.BookID)" v-for="(item,index) in listData" :key="index">
                    <p>{{item.CarNo}} &nbsp;{{item.ServiceName}}</p>
                    <p>{{item.StoreName}}</p>
                    <p>{{item.BookDate+' '+item.BookTime}}</p>
                    <p>
                        <span :class="[item.Status=='待处理'?'yellow':item.Status=='已预约'?'green':'gray']">{{item.Status}}</span>
                        <img src="../assets/img/icon_arrow@2x.png" alt="">
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                listData:[
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约成功'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'取消预约'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'已核销'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约成功'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约成功'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                    // {carNo:'粤B8888',address:'深圳市福特坂田4S店',time:'2018-08-30 10:30-11:30',type:'预约待处理'},
                ]
            }
        },
        created() {
            this.getAppointmentList()
        },
        methods:{
            goInfoPage(BookID){
                this.$router.push({
                    path:'/reservationState',query:{BookID:BookID,CustomerID:this.$route.query.id}
                })
            },

            //获取预约列表
            getAppointmentList() {
                let data ={
                    CustomerID:this.$route.query.id,
                    Status:'1,6,4,7,8',
                    IsMatch:'0'
                }
                this.$http.getDatas1(data).then(res => {
                    console.log(res.data)
                    
                    for(let i= 0;i<res.data.Data.List.length;i++){
                        if(res.data.Data.List[i].Status=='门店拒绝'||res.data.Data.List[i].Status=='门店取消'||res.data.Data.List[i].Status_=='8'){
                           res.data.Data.List[i].Status='待处理'
                        }
                    }
                    this.listData = res.data.Data.List
                });
            }
        }
    }
</script>
<style lang="stylus" scoped>
    #list {
        width:100%;
        height:100%;
        ul {
            width:100%;
            height:100%;
            li {
                width:100%;
                height:163px;
                background-color :#fff;
                padding:25px 30px 30px 30px;
                position:relative;
                margin-top:10px;
                p {
                    color:#666;
                    font-size:24px;
                    text-align:left;
                }
                p:first-child {
                    width:74%;
                    height:36px;
                    color:#333;
                    font-size:28px;
                    margin-bottom:5px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                p:nth-child(2) {
                    width:80%;
                    height:28px;
                    margin-bottom:8px;
                    overflow :hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                p:last-child {
                    font-size:28px;
                    position:absolute;
                    right:30px;
                    top:60px;
                    img {
                        width:20px;
                        height:22px;
                    }
                    .yellow {
                        color :#FF8D18;
                    }
                    .green {
                        color:#00B90A;
                    }
                    .gray {
                        color:#999;
                    }
                }
            }
        }
    }
</style>

