<template>
    <div id="haha">
        <!-- 选择预约服务的项目列表数据 -->
		<div id="reserveList">
			<ul>
				<li v-for="(item,index) in reserveList"  @click="saveData(item.Name,item.Image,item.ProductID)" :key="index">
				<img :src="item.Image">
				<span>{{item.Name}}</span>
				<a>选择</a>
				</li>
				<!-- <li></li> -->
			</ul>
			<p @click="goExamples()">
				到店需出示对应的“服务券”二维码  <span>如何查看我的二维码
					<img src="../assets/img/Path.png" alt="">
				</span>
				
			</p>
		</div>   
    </div>
</template>

<script>
import { Indicator ,Toast} from 'mint-ui';

export default {
	
    components:{
        Indicator,
        Toast
    },

    data () {
        return {
            	//预约服务列表数据
			reserveList: [
				// {name: "到店保养",src: require("../assets/img/gril/1.jpg"),isSelect: false},
				// {name: "上门/到店通用保养",src: require("../assets/img/gril/2.jpg"),isSelect: false},
                // {name: "精致洗车",src: require("../assets/img/gril/3.jpg"),isSelect: false},
            ]
			
        }
    },
    created() {
        this.getServiceItems()
    },

    methods: {
        //获取人保/平安服务
		getServiceItems(){
			Indicator.open('获取列表中...');
			let data = {
				TypeName:window.sessionStorage.getItem('name'),//'平安',
				Status:'-1'
			}
			this.$http.getServiceItems1(data).then(res=>{
				console.log(res.data)
				if(res.data.Code =='200'){
					Indicator.close();
					this.isShowReserveList = true
					this.reserveList = res.data.Data.List
				}	
				//请求未成功
			},caches=>{
				Indicator.close();
				Toast({
					message: '获取失败',
					duration: 1000
				});
			})
        },
        
		// 跳转到选择油品页
		saveData(severName,Image,ProductID) {
		    //点击时保存当前的服务项目名到vuex
			window.sessionStorage.setItem('serviceName',severName)
			window.sessionStorage.setItem('serviceImg',Image)
			window.sessionStorage.setItem('ProductID',ProductID)
			this.$router.push({
				path: "/main",query:{ProductID:ProductID,name:window.sessionStorage.getItem('name')}
			});
		},

		//前往示例
		goExamples(){
			this.$router.push({
				path:'/examples'
			})
		}
    }
}
</script>

<style lang='stylus' scoped>
    // 选择预约服务列表
	#reserveList {
		width: 100%;
		background-color: #f5f5f5;
        height:100%;
		padding-top:80px;
    
      
		ul {
			width: 100%;
			margin-bottom:100px;
			li {
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
		}
		p {
			width: 100%;
			height: 80px;
			background-color: rgba(0, 0, 0, 0.5);
			position: fixed;
			top: 0px;
			color: #fff;
			padding-top: 25px;
			background-color:#FFF3D3;
			color:#FF3C22;
			vertical-align:middle;
			font-size:24px;
			span {
				float:right;
				margin-right:30px;
			}
			img {
				width:20px;
				height:20px;
				margin-top:-5px;
			}
		}
	}

</style>
