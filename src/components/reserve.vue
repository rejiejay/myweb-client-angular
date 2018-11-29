<template>
	<div id="reserve">
		<div id="listTop"></div>
		<!-- 头部组件 -->
		<headers></headers>

		<!-- 步骤条 -->
		<div id="stepBar">
			<span class="active">选择车辆</span>
			<img src="../assets/img/icon_next03 copy@2x.png" alt="">
			<span>服务项目</span>
			<img src="../assets/img/icon_next01@2x.png" alt="">
			<span>预约门店</span>
		</div>

		<div id="main">

			<!-- 1 -->
			<p class="one">车辆信息</p>

			<!-- 2 -->
			<div  @click="goMyCar()" id="carInfo" >
				<div class="left">
					选择车辆 :
				</div>
				<div v-show="!showAddCar"  class="right">
					<p>{{infoData.carNo}}</p>
					<p class="carName" v-if="!showPerfect">{{infoData.brand+" "+infoData.series+" "+infoData.years+" "+infoData.model}}</p>
					<p v-if="showPerfect" class="addCarInfo">点击完善车辆信息</p>
					<img src="../assets/img/icon_arrow@2x.png">
				</div>
				<div v-show="showAddCar" class="noCar">
					<img src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/ycpd/customer/ycpd-carDelay/icon_plus%402x.png">
					<span>添加车辆</span>
				</div>
			</div>

			<!-- 预约首页直接列出服务项目选择 -->
			<p>选择预约项目</p>
			<div class="reserve-list">
				<ul>
					<li v-for="(item,index) in reserveList"  @click="jumpSelectOilPage(item.TypeID, item.Name, item.Image, item.ProductID)" :key="index">
					<img :src="item.Image">
					<span>{{item.Name}}</span>
					<a>选择</a>
					</li>
					<!-- <li></li> -->
				</ul>
			</div>


			<!-- 3 -->
			<!-- <p>保养记录</p> -->

			<!-- 4 -->
			<!-- <p>
				<span>总公里数 :</span>
				<input id="input" type="number" @blur="hideKeyBard" v-model="infoData.totalKm" placeholder="请填写仪表公里数">
			</p> -->

			<!-- 5 -->
			<!-- <p @click="openPicker">
				<span>上一次保养时间 :</span>
				<input type="text"  onfocus="this.blur()" v-model="infoData.lastTime" placeholder="请选择(首次可不填)">
				<img src="../assets/img/icon_arrow@2x.png">
			</p> -->

			<!-- 6 -->
			<!-- <p>
				<span>上一次保养公里数 :</span>
				<input id="input" type="number" v-model="infoData.lastKm" placeholder="请填写仪表公里数(首次可不填)">
			</p> -->
		
			<!-- 10 -->
			<!-- <p @click="getServiceItems">选择预约服务项目</p> -->
		</div>

		<!-- mint-ui日期选择插件 -->
		<mt-datetime-picker
			v-model="pickerVisible"
			type="date"
			ref="picker"
			@confirm="handleConfirm"
			year-format="{value} 年"
			month-format="{value} 月"
			date-format="{value} 日"
			:startDate="maxdata"
			:endDate="mindata"
			>
			
		</mt-datetime-picker>

		<!-- 弹出框 -->
		<div v-show="isShowTipBox" id="tipBox">
			<div class="tip">
				<p>您有 {{numbers}} 个待服务的预约记录</p>
				<p>
					<span @click="isShowTipBox=false">继续预约</span>
					<span @click="goReservationRecordListPage()">查看</span>
				</p>
			</div>
		</div>

		<!-- 输入车辆公里数 模态框 -->
		<div class="record-kilometer-modal flex-center" v-if="isRecordModalShow">
			<div class="kilometer-modal-shade" @click="isRecordModalShow = false"></div>
			<div class="kilometer-modal-main" :style="`width: ${clientWidth - 60}px;`">
				<div class="record-kilometer-title">请输入车辆公里数</div>

				<div class="record-kilometer-input">
					<div class="kilometer-input-title">总公里数</div>

					<div class="kilometer-input-container flex-start-center">
						<input  id="input" type="number" @blur="hideKeyBard" v-model="infoData.totalKm" placeholder="请填写仪表公里数"/>
					</div>
				</div>

				<div class="record-kilometer-input">
					<div class="kilometer-input-title">上一次保养时间</div>

					<div class="kilometer-input-container flex-start-center" @click="openPicker">
						<div :style="`padding-left: 10px; color: ${infoData.lastTime ? '#303133' : '#909399'};`" >{{infoData.lastTime ? infoData.lastTime : '请选择(首次可不填)'}}</div>
					</div>
				</div>

				<div class="record-kilometer-input">
					<div class="kilometer-input-title">上一次保养公里数</div>

					<div class="kilometer-input-container flex-start-center">
						<input id="input" type="number" v-model="infoData.lastKm" placeholder="请填写仪表公里数(首次可不填)" />
					</div>
				</div>

				<div class="record-kilometer-operate flex-start">
					<div class="kilometer-operate-btn kilometer-operate-back" @click="isRecordModalShow = false">返回</div>
					<div style="width: 15px;"></div>
					<div class="kilometer-operate-btn kilometer-operate-confirm flex-rest" @click="getServiceItems">确认</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import headers from "../components/header.vue";  //引入自己写好的header组件
import 'mint-ui/lib/style.css'
import Vue from "vue";	
import { DatetimePicker} from 'mint-ui';
import { Indicator ,Toast} from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);
// import { Toast } from "mint-ui";			

export default {

	components: {
		headers,
		Toast,
		Indicator
	},

	data() {
		return {
            clientWidth: document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth, // 设备的宽度
			clientHeight: document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight, // 设备高度

			pickerVisible:new Date('2018-01'),
			numbers: '',
			//页面数据详情
			infoData: {
				carNo: "",       //车牌号
				brand: "",       //品牌
				series:'',       //车系
				years:'',        //年份
				model:'',        //车型  
				totalKm: "",     //总公里数
				lastTime: '',    //上一次保养时间
				lastKm:"",       //上一次保养公里数
				name: "",        //联系人
				telNo: "",       //电话号码
				CustomerID:''	 //车主id
			},

			//预约服务列表数据
			reserveList: [
				// {name: "到店保养",src: require("../assets/img/gril/1.jpg"),isSelect: false},
				// {name: "上门/到店通用保养",src: require("../assets/img/gril/2.jpg"),isSelect: false},
                // {name: "精致洗车",src: require("../assets/img/gril/3.jpg"),isSelect: false},
			],
			
			isRecordModalShow: false, // 是否显示 输入车辆公里数 模态框

			showAddCar: false,         //如没有车牌信息就显示添加车辆信息
			showPerfect: false,		  //如只有车牌信息就显示完善车辆信息	          
			isShowTipBox: false,      //控制提示框的显示隐藏
			maxdata: new Date('2008-01-01'),
			mindata: new Date(),
		};
	},

	created() {
		//调用车主信息方法
		this.getCarList();	
		
		//调用预约记录方法
		setTimeout(() => {
			this.getAppointmentList();
		}, 700);
	},

    mounted: function () {
        this.getServiceList(); // 获取人保/平安服务
    },

	methods: {
		/**
		 * 获取人保/平安服务
		 */
		getServiceList: function getServiceList() {
			Indicator.open('获取列表中...');
			let data = {
				TypeName: window.sessionStorage.getItem('name'), // '平安',
				Status: '-1'
			}
			this.$http.getServiceItems1(data).then(res => {
				console.log('获取人保/平安服务', res.data);
				if(res.data.Code == '200') {
					Indicator.close();
					this.reserveList = res.data.Data.List;
				}
			}, caches => { // 请求失败的情况
				Indicator.close();
				Toast({ message: '获取失败', duration: 1000 });
			});
		},

		//调用mint-ui方法显示选择日期组件
		openPicker() {
			this.$refs.picker.open();
		},

		//mint-ui方法 点击日期组件中的确定获取选中的日期的值
	    handleConfirm(){ 
		    //格式化时间  变成 2018-04-10 这种样式
		    var date = new Date(this.pickerVisible);//传入选择的时间
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			if (month < 10) {
				month = '0' + month
			}
			if (day < 10) {
				day = '0' + day
			}
            this.infoData.lastTime = year + '-' + month
		},

		// 超链接跳转我的车辆 
		goMyCar(){
			window.location.href = `http://${window.location.host}/wx20/register/index.html#/mycar/${this.infoData.CustomerID}/${'1'}/${this.$route.query.openId}/${window.sessionStorage.getItem('name')}`;
			//window.location.href = `http://192.168.31.113:8000#/mycar/${this.infoData.CustomerID}/${'1'}/${this.$route.query.openId}/${window.sessionStorage.getItem('name')}`;
		},

		//跳转到选择油品页
		saveData(severName,Image,ProductID) {
		    //点击时保存当前的服务项目名到vuex
			window.sessionStorage.setItem('serviceName',severName)
			window.sessionStorage.setItem('serviceImg',Image)
			this.$router.push({
				path: "/main",query:{ProductID:ProductID,name:window.sessionStorage.getItem('name')}
			});
		},

		//跳转到预约服务列表
		goReservationRecordListPage() {
			this.$router.push({
				path: "/reservationRecordList",query:{id:this.infoData.CustomerID}
			});
		},

		//获取车主车辆信息
		getCarList() {
			let data = this.$route.query.openId;//'o9rEN00lVZE05rDcEp_u8RhrLEX8'
			window.sessionStorage.setItem('openId',this.$route.query.openId)
			this.$http.getCarList1(data).then(res => {
				// console.log(res.data)
				if(res.data.Code===200){
					this.infoData.CustomerID = res.data.Data.CustomerID
					//判断是否有车牌号码
					if(res.data.Msg=='没有数据'||res.data.Data.CarNo=='') {
						//没有就是显示添加车辆
						this.showAddCar = true
						
					}else  {
						this.infoData.carNo = res.data.Data.CarNo
						this.infoData.telNo = res.data.Data.Mobile
						this.infoData.series = res.data.Data.Series
						this.infoData.years = res.data.Data.Years
						this.infoData.name = res.data.Data.ContactName
					}
					if(res.data.Data.Brand==''||res.data.Data.Series==''||res.data.Data.Years==''||res.data.Data.Model==''){
						this.showPerfect = true
					}else {
						this.infoData.brand = res.data.Data.Brand 
						this.infoData.series = res.data.Data.Series
						this.infoData.years = res.data.Data.Years
						this.infoData.model = res.data.Data.Model
					}
					//调用修改车辆方法
					// this.upDateCarInfo()
					// 调用获取上一次保养时间和公里数
					this.GetTop1Apointment1()
				}
			
				
			});
		},

		// 替换车辆信息展示
		upDateCarInfo(){
			if(this.$route.query.carNo||this.s.$route.query.brand){
				this.infoData.carNo = this.$route.query.carNo
				this.infoData.brand = this.$route.query.brand
				this.infoData.series = this.$route.query.series
				this.infoData.years = this.$route.query.years
				this.infoData.model = this.$route.query.model
			}
		},

		// 或取上一次保养时间 OpenID   CarNo 
		GetTop1Apointment1(){
			let data = `OpenID=${this.$route.query.openId}&CarNo=${this.infoData.carNo}`
			this.$http.GetTop1Apointment1(data).then(res=>{
				console.log('或取上一次保养时间', res.data);
				// 解决控制台报错信息
				if (res.data.Code === 200 && res.data.Msg === '') {
					if (res.data.Data[0].BookTime.substring(0, 4) == 1900){
						this.infoData.lastTime = '';
					} else {
						this.infoData.lastTime = res.data.Data[0].BookTime
					}
					if (res.data.Data[0].TotalKilometres=='0.00'){
						this.infoData.lastKm = ''
					}else {
						this.infoData.lastKm = res.data.Data[0].TotalKilometres
					}
				}
			})
		},

		// 获取预约信息
		getAppointmentList() {
			let data ={
				CustomerID:this.infoData.CustomerID,//"180912010001951487",
				Status:'1,6,4,7,8',
				IsMatch:'0'
			}
			this.$http.getDatas1(data).then(res => {
				console.log('获取预约信息', res.data)
				if(res.data.Data.TotalRecord!='0'){
					this.numbers = res.data.Data.TotalRecord
					this.isShowTipBox = true
				}else {
					this.isShowTipBox = false
				}
			});
		},

		/**
		 * 跳转到选择油品页
		 * @param {number} TypeID 保养id 当 id 为一的时候是保养类型
		 * @param {string} severName 服务名称
		 * @param {string} Image 服务图片
		 * @param {string} ProductID 唯一标识
		 */
		jumpSelectOilPage:function jumpSelectOilPage(TypeID, severName, Image, ProductID) {
			// 这个是必须要传过去的
			window.sessionStorage.setItem('infoData', JSON.stringify(this.infoData));

		    // 点击时保存当前的服务项目名到vuex
			window.sessionStorage.setItem('serviceName', severName);
			window.sessionStorage.setItem('serviceImg', Image);
			window.sessionStorage.setItem('ProductID', ProductID);

			// 判断是不是保养类型， 如果 为 1 说明是保养类型
			if (TypeID === 1) {
				// 保养类型才需要输入公里数
				this.isRecordModalShow = true; // 显示 输入车辆公里数 模态框
			} else {
				// 其他的情况表示不是保养类型, 不是保养类型的情况下直接进行跳转
				this.jumpToRouter('/main', {
					ProductID: ProductID,
					name: window.sessionStorage.getItem('name')
				});
			}
		},

		// 前往服务项目列表页
		getServiceItems(){
			window.sessionStorage.setItem('infoData', JSON.stringify(this.infoData));

			if ( this.infoData.totalKm == '' ) {
				Toast({
					message: '请先输入总公里',
					duration: 1000
				});
			} else if ( this.infoData.carNo == '' || this.infoData.brand == '' || this.infoData.series == '' || this.infoData.years == '' || this.infoData.model == '' ) {
				Toast({
					message: '车辆不能为空',
					duration: 1000
				});
			} else {
				// this.$router.push({
				// 	path:'/reserveList'
				// });
				this.jumpToRouter('/main', {
					ProductID: window.sessionStorage.ProductID,
					name: window.sessionStorage.getItem('name')
				});
			}
		},

        /**
         * 跳转到路由
         * @param {object} query 携带的参数 非必填
         */
        jumpToRouter: function jumpToRouter(url, query) {
            let routerConfig = {
                path: url,
            }

            query ? routerConfig.query = query : null; // 初始化携带的参数 非必填

            this.$router.push(routerConfig);
        },

		// 输入框失去焦点事件
		hideKeyBard(){
			let top = document.getElementById('listTop')
			if(top){
				top.scrollIntoView()
			}
		},
	}
};
</script>

<style lang="stylus" scoped>
	#reserve {
		width: 100%;
		min-height: 100%;
	}
	// 步骤条
	#stepBar {
		width: 100%;
		height: 100px;
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

	#main {
		width: 100%;
		.one {
			color:#333;
			font-size:28px;
			text-align:left;
			padding:0px 30px;
			margin-bottom:10px;
			margin-top:0px;
			font-weight:700;

		}
		p:nth-child(3) {
			color:#333;
			font-size:28px;
			text-align:left;
			padding:0px 30px;
			margin-bottom:10px;
			margin-top:20px;
			font-weight:700;
		}
		#carInfo {
			font-size:28px;
			height:100px;
			width:100%;
			background-color :#fff;
			color:#666;
			.left {
				width:25%;
				height:100%;
				float:left;
				line-height:100px;
				text-align:left;
				padding-left:30px;
				
			}
			.right {
				width:75%;
				height:100%;
				float:right;
				text-align:left;
				padding-top:15px;
				padding-right:30px;
				p:nth-child(1)  {
					color:#333;
				}
				p:nth-child(2)  {
					font-size:24px;
				}
				.carName {
					width:95%;
					height:30px;
					overflow :hidden;
				}
				img {
					float:right;
					margin-top:-50px;
					width:30px;
					height:30px;
				}
				.addCarInfo {
					color:#e50012;
				}
			}
			.noCar {
				width:245px;
				height:65px;
				border:1px solid #e50012;
				float:left;
				margin-top:17px;
				line-height:65px;
				margin-left:1px;
				border-radius:10px;
				img {
					width:24px;
					height:24px;
					vertical-align:middle;
				}
				span {
					font-size:26px;
					color:#e50012;
					vertical-align:middle;
				}
				
			}
		}

		p:nth-child(4),p:nth-child(6) {
			width:100%;
			height:88px;
			background-color :#fff;
			position:relative;
			padding:0px 30px;
			margin-bottom:1.5px;
			input {
				width:100%;
				height:88px;
				border:none;
				font-size:28px;
				padding-left:160px;
				box-sizing:border-box;
				color:#333;
			}
			input::-webkit-input-placeholder { /* WebKit browsers */ 
				color: #ccc; 
				font-size:28px;
			} 
			input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
				color: #ccc; 
				font-size:28px;
			} 
			input::-moz-placeholder { /* Mozilla Firefox 19+ */ 
				color: #ccc; 
				font-size:28px;
			} 
			input:-ms-input-placeholder { /* Internet Explorer 10+ */ 
				color: #999; 
				font-size:28px;
			} 
			span {
				position:absolute;
				font-size:28px;
				color:#666;
				top:29px;
			}
		}
		p:nth-child(5) {
			width:100%;
			height:88px;
			background-color :#fff;
			position:relative;
			padding:0px 30px;
			margin-bottom:1.5px;
			span {
				position:absolute;
				font-size:28px;
				color:#666;
				top:29px;
			}
			img {
				position:absolute;
				width:30px;
				height:30px;
				top:28px;
				right:30px;
			}
			input {
				width:100%;
				height:88px;
				border:none;
				font-size:28px;
				padding-left:250px;
				box-sizing:border-box;
				color:#333;
			}
			input::-webkit-input-placeholder { /* WebKit browsers */ 
				color: #ccc; 
				font-size:29px;
			} 
			input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
				color: #ccc; 
				font-size:29px;
			} 
			input::-moz-placeholder { /* Mozilla Firefox 19+ */ 
				color: #ccc; 
				font-size:29px;
			} 
			input:-ms-input-placeholder { /* Internet Explorer 10+ */ 
				color: #999; 
				font-size:29px;
			} 
		}
		p:nth-child(6) {
			input {
				padding-left:280px;
			}
		}
		
		p:nth-child(7) {
			width: 91%;
			height:88px;
			font-size:28px;
			line-height:88px;
			margin:0 auto;
			margin-top:40px;
			background-color: #E50012;
			color: #fff;
			border-radius:7px;
		}
	}

	// 弹出框样式
	#tipBox {
		position: fixed;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);

		.tip {
			width: 540px;
			height: 270px;
			background-color: #fff;
			margin: 0 auto;
			margin-top: 450px;
			border-radius: 24px;
			font-size: 30px;

			p:first-child {
				width: 100%;
				height: 182px;
				line-height: 182px;
				border-bottom: 1px solid #ddd;
			}

			p:nth-child(2) {
				height: 87px;
				width: 100%;
				line-height: 87px;

				span {
					display: inline-block;
					text-align: center;
					height: 100%;
					width: 49%;
					float: left;
				}

				span:first-child {
					border-right: 1px solid #ddd;
				}

				span:nth-child(2) {
					color: #5594FF;
				}
			}
		}
	}

	// 预约首页直接列出服务项目选择
	.reserve-list {
		ul {
			width: 100%;
			margin-bottom: 100px;

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
	}

	// 输入车辆公里数模态框
	$black1 = #303133;
	$black2 = #606266;
	$black3 = #909399;
	$black4 = #C0C4CC;
	$record-kilometer-modal-z-index = 3;
	$kilometer-shade-z-index = 4;
	$kilometer-main-z-index = 5;
	.record-kilometer-modal {
		position: fixed;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
		z-index: $record-kilometer-modal-z-index;

		.kilometer-modal-shade {
			position: fixed;
			left: 0px;
			top: 0px;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.46);
			z-index: $kilometer-shade-z-index;
		}

		.kilometer-modal-main {
			position: relative;
			padding-bottom: 30px;
			border-radius: 10px;
			color: $black2;
			background: #fff;
			z-index: $kilometer-main-z-index;
		}

		// 标题
		.record-kilometer-title {
			padding-top 30px;
			padding-left 30px;
			padding-bottom 15px;
		    text-align: left;
			font-size: 32px;
			font-weight: bold;
			color: $black1;
		}

		// 一个输入项
		.record-kilometer-input {
			padding: 0px 30px;

			.kilometer-input-title {
				padding-top: 15px;
				padding-bottom: 15px;
            	color: $black1;
				font-size: 28px;
			    text-align: left;
			}

            .kilometer-input-container {
            	color: $black4;
                height: 80px;
                border-radius: 5px;
                border: 1px solid #ddd;
            }

		}
		
        input {
            width: 95%;
            padding: 0px 2.5%;
            border: none;
            outline: none;
            font-size: 28px;
            color: @black4;
            background-color: transparent;
        }

        input::-webkit-input-placeholder,
        input::-moz-placeholder,   /* Mozilla Firefox 19+ */
        input:-moz-placeholder,  /* Mozilla Firefox 4 to 18 */
        input:-ms-input-placeholder { /* Internet Explorer 10-11 */ 
            color: @black1;
        }


		// 返回确认
		.record-kilometer-operate {
			padding: 30px 30px 0px 30px;

			.kilometer-operate-btn {
				height: 80px;
				line-height 80px;
				border-radius: 5px;
			}

			.kilometer-operate-back {
				width: 240px;
				color: $black3;
				border: 1px solid #ddd;
			}

			.kilometer-operate-confirm {
				color: #fff;
				background: #e50012;
			}
		}
	}


</style>

