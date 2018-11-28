<template>
    <div id="shopList">
        <!-- 搜索框 -->
        <form v-if="!showNoStore" id="search_box" action="javascript:return true;">
           <input id="myinput" type="search" v-model="searchName"  @keyup.13="search()" ref="input1" placeholder="输入关键字搜索">
           <img class="icon_search" src="../assets/img/icon_search@2x.png">
        </form>
       <div id="listTop"></div>
          <!-- 排序 and 筛选栏 -->
    <div v-if="!showNoStore" class="filter flex-start" id="tab">
        <div class="filter-item flex-center"
            v-bind:class="{'filter-activate-item' : (sortSelect == '0')}"
            @click="filterHandle('0')"
        >
            <div class="filter-item-content">
                <span>距离优先</span>
            </div>

            <div class="filter-item-line flex-center"><span></span></div>
        </div>
        
        <div class="filter-item flex-center"
            v-bind:class="{'filter-activate-item' : (sortSelect == '3')}"
            @click="filterHandle('3')"
        >
            <div class="filter-item-content">
                <span>好评优先</span>
            </div>

            <div class="filter-item-line flex-center"><span></span></div>
        </div>
        
        <div class="filter-item flex-center"
            v-bind:class="{'filter-activate-item' : (shopTypeSelect !== '门店类型')}"
            @click="shopTypeMenuVisible = !shopTypeMenuVisible,shopTypeBox=!shopTypeBox,shopTypeBox1=false,shopTypeMenuVisible1 =false"
        >
            <div class="filter-item-content">
                <span>{{shopTypeSelect}}</span>
                <svg class="storeTypeIcon" width="8" height="8" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path fill="#606266" d="M6.84542978,14.5264945 L0.288775776,7.69230265 C-0.0935724214,7.29376997 -0.0804523013,6.66074094 0.318080384,6.27839274 C0.50428598,6.09974899 0.752340184,6 1.01038304,6 L14.9896198,6 C15.5419045,6 15.9896198,6.44771525 15.9896198,7 C15.9896198,7.25804285 15.8898708,7.50609706 15.711227,7.69230265 L9.15457301,14.5264945 C8.5428159,15.1641468 7.52996945,15.185139 6.89231715,14.5733819 C6.87636581,14.5580783 6.86073333,14.5424458 6.84542978,14.5264945 Z"></path>
                </svg>
            </div>

            <div class="filter-item-line flex-center"><span></span></div>
        </div>
        
        <div class="filter-item flex-center"  
            v-bind:class="{'filter-activate-item' : (shopTypeSelect1 !== '服务项目')}"
            @click="shopTypeMenuVisible1 =! shopTypeMenuVisible1,shopTypeBox1=!shopTypeBox1,shopTypeBox=false,shopTypeMenuVisible=false"
        >
            <div class="filter-item-content">
                <span>{{shopTypeSelect1}}</span>
                <svg width="14" height="14" t="1536202186757" class="filter-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3758" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path d="M272.2 63.6c-114.9 0-208 93.1-208 208s93.1 208 208 208h208v-208c0-114.9-93.1-208-208-208z m144 352h-144c-79.4 0-144-64.6-144-144s64.6-144 144-144 144 64.6 144 144v144z m544-144c0-114.9-93.1-208-208-208s-208 93.1-208 208v208h208c114.9 0 208-93.2 208-208z m-352 0c0-79.4 64.6-144 144-144s144 64.6 144 144-64.6 144-144 144h-144v-144z m-544 480c0 114.9 93.1 208 208 208s208-93.1 208-208v-208h-208c-114.9 0-208 93.1-208 208z m352 0c0 79.4-64.6 144-144 144s-144-64.6-144-144 64.6-144 144-144h144v144z m336-208h-208v208c0 114.9 93.1 208 208 208s208-93.1 208-208-93.1-208-208-208z m0 352c-79.4 0-144-64.6-144-144v-144h144c79.4 0 144 64.6 144 144s-64.6 144-144 144z" p-id="3759"></path>
                </svg>
            </div>
        </div>
    </div>
    
    <!-- 门店类型 下拉 -->
    <div class="shop-type-shade" @click="shopTypeMenuVisible = false,shopTypeBox=false" style="height:100%" v-if="shopTypeMenuVisible"></div>
    <div v-show="shopTypeBox" class="shop-type" id="shop-type-show" v-bind:class="{'shop-type-show' : shopTypeMenuVisible}">
        <div class="shop-type-content"> 
            <div class="type-item type-item-line" @click="shopTypeHandle('所有门店',storeTypeId='',shopTypeBox=!shopTypeBox)" v-bind:class="{'filter-activate-item' : (shopTypeSelect !== '')}">
                <div>所有门店</div>
            </div>
            <div class="type-item" v-for="(item, key) in shopTypeList" :key="key" v-bind:class="{'type-item-selected' : (item.Name === shopTypeSelect),'type-item-line' : (key !== (shopTypeList.length - 1))}" @click="shopTypeHandle(item.Name,item.Name,shopTypeBox=!shopTypeBox)">
                <div>{{item.Name}}</div>
            </div>
        </div>
    </div>

    <!-- 侧边栏 筛选 -->
      <div class="shop-type-shade" @click="shopTypeMenuVisible1 = false,shopTypeBox1=false" style=" height:100%" v-if="shopTypeMenuVisible1"></div>
    <div class="shop-type" id="shop-type-show1" v-show="shopTypeBox1" v-bind:class="{'shop-type-show' : shopTypeMenuVisible1}">
        <div class="shop-type-content"> 
            <div class="type-item type-item-line" @click="shopTypeHandle1('所有项目',storeTypeId1='',shopTypeBox1=!shopTypeBox1)" v-bind:class="{'filter-activate-item' : (shopTypeSelect1 !== '')}">
                <div>所有项目</div>
            </div>
            <div class="type-item" v-for="(item, key) in shopTypeList1" :key="key" v-bind:class="{'type-item-selected' : (item.Name === shopTypeSelect1),'type-item-line' : (key !== (shopTypeList1.length - 1))}" @click="shopTypeHandle1(item.Name,item.listID,shopTypeBox1=!shopTypeBox1)">
                <div>{{item.Name}}</div>
            </div>
        </div>
    </div>

       <!-- 门店列表 -->
        
        <div v-if="!showNoStore" id="main">
           <ul>
               <li class="list" v-for="(Item,indexs) in listData" :key="indexs">
                   <img  @click="goStoreInfo(Item.StoreID,Item.distance,Item.StoreProductID)" :src="Item.IMAGE_URL">
                   <div  @click="goStoreInfo(Item.StoreID,Item.distance,Item.StoreProductID)" class="info">
                       <p class="one">{{Item.StoreName}}</p>
                       <div>
                        <img class="first_img" v-for="star in Number(Item.StartLevel)" src="../assets/img/icon_star01@2x.png">
                        <img  v-for="starTwo in Number(5-Item.StartLevel)" src="../assets/img/icon_star02@2x.png">
                        <span>{{Item.StartLevel}}.0</span>
                       </div>
                       <p class="three">
                           <img src="../assets/img/icon_position@2x.png">
                           <span>{{Item.Address}}</span>
                           <span>{{Item.distance.toFixed(2)}}km</span>
                       </p>
                   </div>
                   <div class="change" @click="goConfirm(Item.StoreID,Item.distance,Item.StoreProductID)">选择</div>
               </li>
           </ul>
        </div>
     
        <!-- 当没有搜索到门店时 -->
        <div v-if="showNoStore" id="noStore">
            <p>
                <img src="../assets/img/没有门店@2x.png" alt="">
            </p>
            <p>该服务暂时没有可服务门店</p>
            <p>请选择其他服务</p>
            <p @click="back" class="button">
                重新选择服务
            </p>
        </div>

        <!-- 返回按钮 -->
        <div @click="back" id="Return">
            <img src="../assets/img/Combined Shape@2x.png" alt="">
            <p>返回</p>
        </div>

        <!-- 返回顶部 -->
        <div @click="goTop" id="goTop">
            <img src="../assets/img/icon_top@2x.png" alt="">
            <p>顶部</p>
        </div>

    </div>
</template>
<script>
import html5WxBMapLocation from "../assets/js/html5WxBMapLocation.js";
import { Indicator,Toast } from 'mint-ui'; // mint-ui 组件
import { error } from 'util';
export default {
    components:{
       Indicator,
       Toast

    },
    data() {
        return {
            searchName: "",  //搜索名

            //列表数据
            listData: [
            ],

            showNoStore:false,  //当没有门店时显示

              /**
             * 排序
             * @param {String} 0 距离优先 默认
             * @param {String} 3 好评优先
             */
			sortSelect: '0', 

            // 门店类型
			shopTypeSelect: '门店类型', // 如果为空, 则表示筛选全部
            storeTypeId:'',
			shopTypeMenuVisible: false, // 是否显示模态框
            shopTypeList: [],
            shopTypeBox:false,
            // 筛选 服务项目
			shopTypeSelect1: '服务项目', // 如果为空, 则表示筛选全部
            storeTypeId1:this.$route.query.productTypeId?this.$route.query.productTypeId:'',
			shopTypeMenuVisible1: false, // 是否显示模态框
            shopTypeList1: [],
            shopTypeBox1:false,

        };
    },
    created() {
        // 调用获取门店列表方法
        this.getShopList();

        
        this.getStoreType()

        this.getProduct()
    },
    methods: {
         /**
         * 点击 排序 and 筛选栏
         * @param {String} condition 排序的条件
         */
        filterHandle: function filterHandle(condition) {
            this.shopTypeBox = false
            this.shopTypeBox1 = false
            this.shopTypeMenuVisible1 = false
            this.shopTypeMenuVisible = false
            // const _this = this;
			
			// 距离优先
            if (condition == '0') {
                this.sortSelect = '0';
            }

            // 好评优先
            if (condition == '3') {
                this.sortSelect = '3';
            }
            this.getShopList1()
        },
        
        /**
         * 门店下拉选择
         * @param {String} condition 排序的条件
         */
		shopTypeHandle: function shopTypeHandle(shopType,Name) {
            
            this.storeTypeId = Name
			this.shopTypeSelect = shopType; // 设置选中
            this.shopTypeMenuVisible = false; // 隐藏下拉模态框
            this.getShopList1()
		},
		shopTypeHandle1: function shopTypeHandle1(shopType1,listID) {
            this.shopTypeBox =false
            this.shopTypeMenuVisible =false
             this.storeTypeId1 = listID
			this.shopTypeSelect1 = shopType1; // 设置选中
            this.shopTypeMenuVisible1 = false; // 隐藏下拉模态框
            this.getShopList1()
		},

          // 获取门店类型
        getStoreType(){
            this.$http.getStoreType1().then(res=>{
                console.log(res.data)
                this.shopTypeList = res.data.Data
            })
        },

        // 获取服务项目
        getProduct(){
            this.$http.getProduct1().then(res=>{
                console.log(res.data)
                for(let i=0;i<res.data.Data.length;i++){
                    if(res.data.Data[i].curLevel=='1'){
                        this.shopTypeList1.push({Name:res.data.Data[i].Name,listID:res.data.Data[i].ListID})
                    }
                }
            })
        },

        // 前往地图导航
        goMap() {
            window.location.href = `http://kf.szpiccxxjsb.cn/wxapi/map/map.html?lat=${this.shopInfoData.latitude}&lng=${this.shopInfoData.longitude}&type=bd&name=${this.shopInfoData.StoreName}&address=${this.shopInfoData.Address}`;
        },

        // 前往门店详情
        goStoreInfo(StoreID,distance,StoreProductID){
            window.sessionStorage.setItem('StoreProductID',StoreProductID)
            window.sessionStorage.setItem('distance',distance)
            this.$router.push({
                path:'/storeInfo',query:{StoreID:StoreID,distance:distance}
            })
        },

        // 获取门店列表
        getShopList() {
            let that = this
            Indicator.open('获取门店列表中...'); // 开启提示信息
            html5WxBMapLocation(this, false).then(position => {
                console.log(position.latitude)
                console.log(position.longitude)  
                // http://api.map.baidu.com/geoconv/v1/?coords=114.07416125809836,22.62548475488523&from=1&to=5&ak=FtLd67GQPzH6R73XfKIt8EYyg5DCcTe3   
                var url ="http://api.map.baidu.com/geoconv/v1/?coords="+position.longitude+","+position.latitude+"&from=1&to=5&ak="+"iEcXQ5MV5hbAx7str9MeVQ8jtwY07tDT";
                $.ajax({
                    url: url,
                    type: 'GET',
                    contentType: "application/json",
                    dataType: 'jsonp',//这里要用jsonp的方式不然会报错
                    success: function(res) {
                        console.log(res)
                        // config.lng = data.result[0].x;//经度
                        // config.lat  = data.result[0].y;//纬度
                        Indicator.open('获取门店列表中...'); // 开启提示信息
                        let infoData = JSON.parse(window.sessionStorage.getItem("infoData"));
                        let data = {
                            ServiceType1:that.storeTypeId1,   // 服务项目ID
                            StoreType_Name: that.storeTypeId,      // 门店类型
                            key:that.searchName,
                            ApproveProductID: window.sessionStorage.getItem('ApproveProductID'),
                            latitude: res.result[0].y,
                            longitude: res.result[0].x,
                            sort: that.sortSelect,
                            productID: window.sessionStorage.getItem('ProductID'),
                            city:'',
                            platformName:window.sessionStorage.getItem('name'),//'平安',
                            Brand: infoData.brand,
                            Series: infoData.series
                        };
                        that.$http.getShopList1(data).then(res => {
                            console.log(res.data);
                            if(res.data.Code===200){
                                if(res.data.Data.list==''){
                                    that.showNoStore = true
                                }
                            
                                Indicator.close(); // 关闭提示信息
                                that.listData = res.data.Data.list
                                console.log(that.listData)
                                let anchorElement = document.getElementById('listTop')
                                if (anchorElement) {
                                    anchorElement.scrollIntoView(false)
                                }
                            }
                        });
                    },
                    error:function(){
                        Toast({
                            message:'定位异常,请刷新重试',
                            duration:1000,
                        })
                    }
                });
            });
        },

         // 获取门店列表 提示暂无该门店
        getShopList1() {
            let that = this
            html5WxBMapLocation(this, false).then(position => {
                console.log(position.latitude)
                console.log(position.longitude)
                var url ="http://api.map.baidu.com/geoconv/v1/?coords="+position.longitude+","+position.latitude+"&from=1&to=5&ak="+"iEcXQ5MV5hbAx7str9MeVQ8jtwY07tDT";
                $.ajax({
                    url: url,
                    type: 'GET',
                    contentType: "application/json",
                    dataType: 'jsonp',//这里要用jsonp的方式不然会报错
                    success: function(res) {
                        console.log(res)
                        // config.lng = data.result[0].x;//经度
                        // config.lat  = data.result[0].y;//纬度
                        Indicator.open('获取门店列表中...'); // 开启提示信息
                        let infoData = JSON.parse(window.sessionStorage.getItem("infoData"));
                        let data = {
                            ServiceType1:that.storeTypeId1,   // 服务项目ID
                            StoreType_Name: that.storeTypeId,      // 门店类型
                            key:that.searchName,
                            ApproveProductID: window.sessionStorage.getItem('ApproveProductID'),
                            latitude:  res.result[0].y,
                            longitude: res.result[0].x,
                            sort: that.sortSelect,
                            productID: window.sessionStorage.getItem('ProductID'),
                            city:'',
                            platformName:window.sessionStorage.getItem('name'),//'平安',
                            Brand: infoData.brand,
                            Series: infoData.series
                        };
                        that.$http.getShopList1(data).then(res => {
                            console.log(res.data);
                            if(res.data.Code===200){
                                if(res.data.Data.list==''){
                                    that.listData=[]
                                    Toast({
                                        message:'暂无该服务门店',
                                        duration:1000,
                                    })
                                }
                                // 关闭提示信息
                                Indicator.close(); 
                                that.listData = res.data.Data.list
                                console.log(that.listData)
                                let anchorElement = document.getElementById('listTop')
                                if (anchorElement) {
                                    anchorElement.scrollIntoView(false)
                                }
                            }
                        });
                    },
                    error:function(){
                        Toast({
                            message:'定位异常,请刷新重试',
                            duration:1000,
                        })
                    }
                });
            });
        },

        // 搜索功能
        search(){
            this.$refs.input1.blur();  //关闭键盘
            this.getShopList1()         //调用获取门店列表方法
        },

        // 前往服务预约确认页面
        goConfirm(StoreID,distance,StoreProductID){
            window.sessionStorage.setItem('distance',distance)
            window.sessionStorage.setItem('StoreProductID',StoreProductID)
            let infoData = JSON.parse(window.sessionStorage.getItem("infoData"));
            let data = {
                StoreID:StoreID,
                Brand: infoData.brand,//"宝马",
                Series: infoData.series,//"5系",
                platform:window.sessionStorage.getItem('name'),//'人保',
                has4SProduct:false,
                FreeService:'',
                ProductType:''
            }
            this.$http.getStoreInfo1(data).then(res => {
                // console.log(res.data);
                if(res.data.Code===200){
                    window.sessionStorage.setItem('storeInfo',JSON.stringify(res.data.Data))
                    this.$router.push({
                        path: "/confirm",query:{name:window.sessionStorage.getItem('name')}
                    });
                }else {
                    Toast({
                        message:'出现异常啦',
                        duration:1000
                    })
                }
            });

        },

        // 重新选择服务  退一步
        back() {
            window.history.go(-1)
        },

        // 返回顶部
        goTop(){
            let goTop = document.getElementById('listTop')
            if(goTop) {
                goTop.scrollIntoView(false)
            }
        }
    }
};
</script>
<style lang="stylus" scoped>
   
#shopList {
    // background-color: ;
    height: 100%;
    width:100%;
}

// 搜索框
#search_box {
    width: 100%;
    position: fixed;
    top:0px;
    height: 110px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    z-index: 3;
    input {
        margin-top: 25px;
        height: 62px;
        width: 90%;
        border: 1px solid #f5f5f5;
        border-radius: 10px;
        background-color: #f5f5f5;
        padding-left: 75px;
        box-sizing: border-box;
        font-size: 26px;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #ccc;
    }
    input:-moz-placeholder, textarea:-moz-placeholder {
        color: #ccc;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
        color: #ccc;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color: #ccc;
    }
    .icon_search {
        height: 32px;
        width: 32px;
        position: absolute;
        top: 38px;
        left: 60px;
    }
}

// 排序 and 筛选栏
.filter {
    position: fixed;
    left: 0px;
    top: 110px;
    width: 100%;
    height: 80px;
    line-height: 80px;
    background: #fff;
    border-bottom: 1px solid #ddd;

    .filter-item {
        position: relative;
        font-size: 28px;
        color: @black2;
        width: 25%;
        float:left;

        // 筛选的SVG
        .filter-icon {
            position: relative;
            top: 5px;
        }
        .storeTypeIcon {
           position:relative;
           top:-4px;
        }
    }

    // 激活的模块
    .filter-activate-item {
        color: #E50012;

        path {
            fill: #E50012;
        }
    }

    // 分割线
    .filter-item-line {
        position: absolute;
        top:22px;
        right: 0px;
        width: 1px;
        height: 60px;
        float:left;

        span {
            display: block;
            height: 36px;
            width: 1px;
            background: #dddddd;
        }
    }
}

// 筛选 门店类型 下拉
.shop-type {
    position: fixed;
    left: 0px;
    top: 192px;
    width: 100%;
    height: auto;
    background: #fff;
    overflow-y: auto;
    z-index: @z-index-shopslist-shop-type-content;

    transition: top 0.2s;
    -moz-transition: top 0.2s;	/* Firefox 4 */
    -webkit-transition: top 0.2s;	/* Safari 和 Chrome */
    -o-transition: top 0.2s;	/* Opera */


    .shop-type-content {
        padding-left: 30px;
        text-align:left;
    }
    
    .type-item {
        font-size: 28px;
        line-height: 80px;
        color: @black2;
    }
    
    .type-item-line {
        border-bottom: 1px solid #ddd;
    }

    // 选中状态
    .type-item-selected {
        color: #E50012;
    }
}
// .shop-type-show { // 显示
//     top: 96px;
// }
.shop-type-shade { // 遮罩层
    position: fixed;
    left: 0px;
    top: 192px;
    width: 100%;
    line-height: 80px;
    background: rgba(0, 0, 0, 0.36);
    z-index: @z-index-shopslist-shop-type-shade;
}

// 门店列表
#main {
    width: 100%;
    height:100%;
    margin-top: 190px;
    background-color: #fff;
    ul {
        width: 100%;
         height:100%;
        .list {
            width: 100%;
            height: 185px;
            background-color:#fff;
            padding: 30px;
            border-bottom: 1px solid #ddd;

            img {
                width: 160px;
                height: 120px;
                float: left;
            }

            .info {
                float: left;
                margin-left: 20px;
                width: 57%;

                .one {
                    color: #333;
                    font-size: 28px;
                    font-weight: bold;
                    text-align: left;
                    width:100%;
                    height:40px;
                    overflow :hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                div {
                    margin-top: 10px;
                    line-height: 30px;
                    img {
                        width: 28px;
                        height: 26px;
                        margin-right:6px;
                    }

                    span {
                        color: #FF3D35;
                        font-size: 28px;
                    }
                }

                .three {
                    margin-top: 16px;
                    text-align: left;
                    font-size: 24px;
                    color: #666;
                    line-height: 28px;
                    width:126%;

                    img {
                        width: 20px;
                        height: 25px;
                        margin-right: 10px;
                    }

                    span:last-child {
                        float: right;
                    }

                    span:nth-child(2) {
                        width: 72%;
                        height: 29px;
                        overflow: hidden;
                        display: inline-block;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }

            .change {
                width: 110px;
                height: 55px;
                border: 1.5px solid #E50012;
                color: #E50012;
                font-size: 28px;
                line-height: 55px;
                float: right;
                margin-top: 23px;
                border-radius: 5px;
            }
        }
        .list:first-child {
            border-bottom:1px solid #ddd;
        }
    }
}

#noStore {
    padding-top:200px;
    p {
        font-size:28px;
        color:#999;
    }
    img {
        width:368px;
        height:368px;
    }
    .button {
        width:360px;
        height:88px;
        background-color:#FF8D18;
        border-radius:5px;
        font-size:30px;
        line-height:88px;
        color:#fff;
        margin:0 auto;
        margin-top:50px;
    }
}

#Return {
    width:75px;
    height:75px;
    position:fixed;
    bottom:200px;
    right:10px;
    box-shadow:0px 0px 10px 0px rgba(0,0,0,0.12);
    border-radius:50%;
    background:rgba(255,255,255,0.95);
    img {
        height:28px;
        width:28px;
        margin-top:10px;
    }
    p {
        font-size:18px;
    }
}

#goTop {
    width:75px;
    height:75px;
    position:fixed;
    bottom:110px;
    right:10px;
    box-shadow:0px 0px 10px 0px rgba(0,0,0,0.12);
    border-radius:50%;
    background:rgba(255,255,255,0.95);
    img {
        height:28px;
        width:28px;
        margin-top:11px;
    }
    p {
        font-size:18px;
    }
}

</style>

