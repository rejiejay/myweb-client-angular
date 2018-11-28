<template>
    <div>
          <!-- 油品列表页 -->
        <div id="qiYouList">
            <ul v-show="!showList">
                <li @click="changeQiYou(item.Name,item.ProductID,item.Image1)" v-for="(item,index) in qiYouList" :key="index">
                    <img :src="item.Image1">
                    <span>{{item.Name}}</span>
                    <a>确定</a>
                </li>
            </ul>
            <p v-show="showList">暂无数据</p>
        </div>
    </div>
</template>

<script>
export default {
    name: '',

    data () {
        return {
             //更换油品数据列表
                qiYouList:[
                   
                ],

                showList:false,
        }
    },

    created(){
        this.GetProductByLevel()
    },

    methods: {
        changeQiYou(name,ApproveProductID,qiYouImg){
            window.sessionStorage.setItem('qiYouName',name)
            window.sessionStorage.setItem('qiYouImg',qiYouImg)
            this.$router.push({
                path:'/main',query:{ApproveProductID:ApproveProductID,name:window.sessionStorage.getItem('name')}
            })
        },

        //获取油品列表
        GetProductByLevel(){
            let data = `oilLevel=${this.$route.query.OilLevel}&Volume=${this.$route.query.Volume}`
            this.$http.GetProductByLevel1(data).then(res=>{
                console.log(res.data)
                if(res.data.Code===200){
                    if(res.data.Data.List.length=='0'){
                        this.showList = true
                    }else {
                        this.qiYouList = res.data.Data.List
                    }
                }
                
            },err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style lang='stylus' scoped>
     //汽油列表
    #qiYouList {
        width:100%;
        height:100vh;
        background-color :#fff;
        ul {
            width: 100%;
            height:100%;
            li {
                width:100%;
                background-color: #fff;
                height:140px;
                padding:30px 30px;
                margin-bottom:10px;
                img {
                    width:100px;
                    height:75px;
                    float :left;
                    margin-right:10px;
                }
                span {
                    float :left;
                    text-align:left;
                    display:inline-block;
                    width:430px;
                    height:74px;
                    color:#666666;
                    font-size:28px;
                    overflow :hidden;
                }
                a {
                    display:inline-block;
                    width:110px;
                    height:55px;
                    border-radius:5px;
                    border:1px solid rgba(229,0,18,1);
                    font-size:28px;
                    color:rgba(229,0,18,1);
                    line-height:28px;
                    line-height:55px;
                     float :right;
                     margin-top:10px;
                }
            }       
        }

        p {
            font-size:30px;
            padding-top:180px;
        }
    }
</style>
