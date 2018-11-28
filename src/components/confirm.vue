<template>
    <div>
        <div id="main">
            <div id="listTop"></div>
            <!-- 头部 -->
            <i id="allmap"></i>
            <div id="header">
                <p>
                    <img class="position_icon" src="../assets/img/icon_position@2x.png">
                    <span>{{city}}</span>
                </p>
                <div>
                    <img class="logo" :src="this.$route.query.name=='平安'?require('../assets/img/pingan_LOGO@2x.png'):require('../assets/img/PICC LOGO@2x.png')">
                    <p v-if="this.$route.query.name=='人保'">养车频道&中国人保服务平台</p>
                    <p v-if="this.$route.query.name=='平安'">养车频道&中国平安服务平台</p>
                </div>
            </div>
             <!-- 步骤条 -->
            <div id="stepBar">
                <span class="active">选择车辆</span>
                <img  src="../assets/img/icon_next03 copy@2x.png" alt="">
                <span class="active">服务项目</span>
                <img src="../assets/img/icon_next03 copy@2x.png" alt="">
                <span class="active">预约门店</span>
            </div>
            <div id="shopInfo">
               <div class="top">
                   <img class="icon" :src="storeInfo.StoreImg" alt="">
                   <p>{{storeInfo.StoreName}}</p>
                   <p>
                       <img v-for="star in storeInfo.StartLevel"  src="../assets/img/icon_star01@2x.png" alt="">
                       <img v-for="star1 in 5-storeInfo.StartLevel"   src="../assets/img/icon_star02@2x.png" alt="">
                       <span>{{storeInfo.StartLevel}}.0</span>
                   </p>
                   <p>
                       <img src="../assets/img/icon_position@2x.png">
                       <span>{{storeInfo.Address}}</span>
                       <span>{{distance}}km</span>
                   </p>
                   <p @click="goShopList">修改</p>
               </div>
               <div class="bottom">
                  <a @click="goCall">
                      <img src="../assets/img/icon_call@2x.png" alt="">
                      <span>联系门店</span>
                  </a>
                  <p @click="goMap">
                      <img src="../assets/img/icon_map03@2x.png">
                      <span>地图导航</span>
                  </p>
               </div>
            </div>
            <div class="time" @click="isShowTime=true">
                <span>预约时间 :</span>
                <input type="text" v-model="showTime" onfocus="this.blur()" placeholder="请选择预约时间">
                <img src="../assets/img/icon_arrow@2x.png" alt="">
            </div>

            	<!-- 8 -->
			<p class="userName">
				<span>联 &nbsp;系&nbsp; 人 :</span>
				<input id="input" type="text" v-model="userInfo.userName" @focus="showInput" placeholder="联系人姓名">
			</p>

			<!-- 9-->
			<p class="userNumber">
				<span>联系电话 :</span>
				<span>{{userInfo.userNumber}}</span>
			</p>
            <div @click="showpreviewBox" id="btn">
                确认预约
            </div>
            
                <!-- 确认预约预览  -->
            <div v-show="showpreview" id="preview">
                <div class="content">
                    <p class="one">请确认您的预约信息</p>
                    <div class="div">
                        <p>预约服务:</p>
                        <p>{{serviceName}}</p>
                    </div>
                    <div class="div">
                        <p>预约门店:</p>
                        <p>{{storeInfo.StoreName}}</p>
                    </div>
                    <div class="div">
                        <p>门店地址:</p>
                        <p>{{storeInfo.Address}}</p>
                    </div>
                    <div class="div">
                        <p>预约时间:</p>
                        <p>{{showTime}}</p>
                    </div>
                    <div class="div">
                        <p>联系人:</p>
                        <p>{{userInfo.userName}}</p>
                    </div>
                    <div class="div">
                        <p>联系电话:</p>
                        <p>{{userInfo.userNumber}}</p>
                    </div>
                    <div class="btn">
                        <p @click="showpreview=false">返回修改</p>
                        <p  @click="goReservationState">确认预约</p>
                    </div>
                </div>
            </div>

        </div>

		   <!-- 预约时间模块 -->
            <div v-show="isShowTime" id="time">
                <div id="hideTimeBox" @click="isShowTime=false"></div>
                <div id="timeBox">
                    <div class="header">
                        <p>选择预约到店时间</p>
                    </div>
                    <div class="changTime">
                        <ul class="dateTime">
                            <li @click="changDate(index)" :class="[item.isSelect?'baiSe':'']" v-for="(item,index) in timeData" :key="index">
                                {{item.name}}
                            </li>
                        </ul>
                        <ul class="timeRight">
                            <li @click="changTime(index)" v-for="(item,index) in timeData1" :key="index">{{item.time}}</li>
                        </ul>
                    </div>  
                </div>
            </div>
        
    </div>
</template>
<script>
import headers from "../components/header.vue";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import { MessageBox } from "mint-ui";
import "mint-ui/lib/style.min.css";
export default {
  components: {
    headers,
    Toast,
    Indicator,
    MessageBox
  },
  data() {
    return {
      city: window.sessionStorage.getItem("cityName"),
      showTime: "",
      isShowTime: true, // 控制预约时间模块显示隐藏
      // 预约时间-日期列表
      timeData: [],
      // 预约时间-时间列表
      timeData1: [
        { time: "08:00-10:00", active: false },
        { time: "10:00-12:00", active: false },
        { time: "12:00-14:00", active: false },
        { time: "14:00-16:00", active: false },
        { time: "16:00-18:00", active: false }
      ],
      storeInfo: "",
      date: "", // 接收预约日期
      time: "", // 接收预约时间
      userInfo: {
        userName: "",
        userNumber: ""
      },
      distance: "",

      showpreview: false, // 控制确认预约预览显示
      serviceName: window.sessionStorage.getItem("serviceName")
    };
  },
  created() {
    this.storeInfo = JSON.parse(window.sessionStorage.getItem("storeInfo"));
    this.distance = window.sessionStorage.getItem("distance");

    this.getUserInfo();

    this.getSessionStorage();

    //调用预约的日期展示
    this.getTime();

    //当用户没选时获取默认的日期
    let datatime = this.timeData;
    for (let i = 0; i < datatime.length; i++) {
      if (datatime[i].isSelect == true) {
        this.date = datatime[i].time;
      }
    }
  },

  mounted() {
    let goTop = document.getElementById("listTop");
    if (goTop) {
      goTop.scrollIntoView();
    }
  },

  methods: {
    // 显示是否预约模块
    showpreviewBox() {
      if (this.userInfo.userName == "") {
        return Toast({
          message: "请输入联系人",
          duration: 1000
        });
      }
      if (this.showTime == "") {
        return Toast({
          message: "请选择预约时间",
          duration: 1000
        });
      } else {
        this.showpreview = true;
      }
    },
    //确认预约
    goReservationState() {
      window.sessionStorage.setItem("userName", this.userInfo.userName);
      window.sessionStorage.setItem("time", this.showTime);
      window.sessionStorage.setItem("isShowime", this.isShowTime);
      if (this.userInfo.userName == "") {
        return Toast({
          message: "请输入联系人",
          duration: 1000
        });
      }
      if (this.showTime == "") {
        Toast({
          message: "请选择预约时间",
          duration: 1000
        });
      } else {
        // 传参调用接口来确认预约
        let infoData = JSON.parse(window.sessionStorage.getItem("infoData"));
        var now = new Date();
        var year = now.getFullYear();
        var time = year + "-" + this.showTime.replace(/\(.*?\)/g, "");
        var newTime = time.substring(0, time.length - 6);
        let data = {
          VinNo: "",
          CustomerID: infoData.CustomerID,
          UserName: this.userInfo.userName,
          Mobile: this.userInfo.userNumber,
          CarNo: infoData.carNo,
          Brand: infoData.brand,
          Series: infoData.series,
          Years: infoData.years,
          Model: infoData.model,
          ProductID: window.sessionStorage.getItem("ProductID"),
          ApproveProductID: window.sessionStorage.getItem("ApproveProductID"),
          bookTime: newTime,
          TotalKilometres: infoData.totalKm,
          LastMaintenanceDate: infoData.lastTime,
          LastKilometres: infoData.lastKm,
          StoreID: `${this.storeInfo.StoreId}`,
          StoreProductID: window.sessionStorage.getItem("StoreProductID"),
          TypeName: window.sessionStorage.getItem("name")
        };
        Indicator.open("请稍后...");
        this.$http.apointment1(data).then(
          res => {
            console.log(res.data);
            var day = new Date();
            var hours = day.getHours(); //获取预约时的小时 用来判断预约详情页展示商家是当天还是第二天确认
            // 如果返回Code 200 就预约成功
            if (res.data.Code === 200) {
              Indicator.close();
              Toast({
                message: "预约成功",
                duration: 1000
              });
              this.$router.push({
                path: "/reservationState",
                query: {
                  BookID: res.data.Data.BookID,
                  CustomerID: infoData.CustomerID,
                  hours: hours
                }
              });

              // 否则提示已经有此项服务的预约了
            } else if (res.data.Code === 409) {
              Indicator.close();
              MessageBox.confirm("", {
                title: "提示",
                message: "此服务已有预约是否查看详情",
                closeOnClickModal: true,
                confirmButtonText: "查看"
              })
                // 点击查看时前往详情
                .then(action => {
                  this.$router.push({
                    path: "/reservationState",
                    query: {
                      BookID: res.data.Data.BookID,
                      CustomerID: infoData.CustomerID,
                      hours: hours
                    }
                  });
                })
                // 点击取消时 返回当前页面 隐藏提示框
                .catch(() => {
                  this.showpreview = false;
                });
            } else if (res.data.Code === 403) {
              Indicator.close();
              alert(res.data.Msg)
            }
          },
          err => {
            Indicator.close();
            Toast({
              message: `服务器异常`,
              duration: 1000
            });
          }
        );
      }
    },

    goMap() {
      window.sessionStorage.setItem("userName", this.userInfo.userName);
      window.sessionStorage.setItem("time", this.showTime);
      window.sessionStorage.setItem("isShowime", this.isShowTime);
      window.location.href = `http://kf.szpiccxxjsb.cn/wxapi/map/map.html?lat=${
        this.storeInfo.latitude
      }&lng=${this.storeInfo.longitude}&type=bd&name=${
        this.storeInfo.StoreName
      }&address=${this.storeInfo.Address}`;
    },

    goCall() {
      window.location.href = `tel:${this.storeInfo.ContactPhone}`;
    },

    //前往商店列表页
    goShopList() {
      this.$router.push({
        path: "/shopList"
      });
    },

    //预约的日期展示
    getTime() {
      var arr = new Array("日", "一", "二", "三", "四", "五", "六");
      var date1 = new Date();
      var date2 = new Date(date1);
      // 往后1天
      date2.setDate(date1.getDate() + 1);
      var month = date2.getMonth() + 1;
      var day = date2.getDate();
      var week = date2.getDay();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      var times = month + "-" + day + "(" + "周" + arr[week] + ")";
      this.timeData.push({ time: times, isSelect: true, name: "明天" });
      //2
      date2.setDate(date1.getDate() + 2);
      var month1 = date2.getMonth() + 1;
      var day1 = date2.getDate();
      var week1 = date2.getDay();
      if (month1 < 10) {
        month1 = "0" + month1;
      }
      if (day1 < 10) {
        day1 = "0" + day1;
      }
      var times1 = month1 + "-" + day1 + "(" + "周" + arr[week1] + ")";
      this.timeData.push({ time: times1, isSelect: false, name: "后天" });
      //3
      date2.setDate(date1.getDate() + 3);
      var month3 = date2.getMonth() + 1;
      var day3 = date2.getDate();
      var week3 = date2.getDay();
      if (month3 < 10) {
        month3 = "0" + month3;
      }
      if (day3 < 10) {
        day3 = "0" + day3;
      }
      var times3 = month3 + "-" + day3 + "(" + "周" + arr[week3] + ")";
      this.timeData.push({ time: times3, isSelect: false, name: times3 });
      //4
      date2.setDate(date1.getDate() + 4);
      var month4 = date2.getMonth() + 1;
      var day4 = date2.getDate();
      var week4 = date2.getDay();
      if (month4 < 10) {
        month4 = "0" + month4;
      }
      if (day4 < 10) {
        day4 = "0" + day4;
      }
      var times4 = month4 + "-" + day4 + "(" + "周" + arr[week4] + ")";
      this.timeData.push({ time: times4, isSelect: false, name: times4 });
      //5
      date2.setDate(date1.getDate() + 5);
      var month5 = date2.getMonth() + 1;
      var day5 = date2.getDate();
      var week5 = date2.getDay();
      if (month5 < 10) {
        month5 = "0" + month5;
      }
      if (day5 < 10) {
        day5 = "0" + day5;
      }
      var times5 = month5 + "-" + day5 + "(" + "周" + arr[week5] + ")";
      this.timeData.push({ time: times5, isSelect: false, name: times5 });
      //6
      // date2.setDate(date1.getDate() + 6);
      // var month6 = date2.getMonth() + 1;
      // var day6 = date2.getDate();
      // var week6 = date2.getDay();
      // if (month6 < 10) {
      //   month6 = "0" + month6;
      // }
      // if (day6 < 10) {
      //   day6 = "0" + day6;
      // }
      // var times6 = month6 + "-" + day6 + "(" + "周" + arr[week6] + ")";
      // this.timeData.push({ time: times6, isSelect: false, name: times6 });
      // //7
      // date2.setDate(date1.getDate() + 7);
      // var month7 = date2.getMonth() + 1;
      // var day7 = date2.getDate();
      // var week7 = date2.getDay();
      // if (month7 < 10) {
      //   month7 = "0" + month7;
      // }
      // if (day7 < 10) {
      //   day7 = "0" + day7;
      // }
      // var times7 = month7 + "-" + day7 + "(" + "周" + arr[week7] + ")";
      // this.timeData.push({ time: times7, isSelect: false, name: times7 });
      console.log(this.timeData);
    },

    //获取选择预约的日期
    changDate(index) {
      let data = this.timeData;
      for (let i = 0; i < data.length; i++) {
        if (i == index) {
          console.log(data[i].time);
          data[i].isSelect = true;
          this.date = data[i].time;
        } else {
          data[i].isSelect = false;
        }
      }
    },

    //获取选择预约的时间
    changTime(index) {
      let data = this.timeData1;
      for (let i = 0; i < data.length; i++) {
        if (index == i) {
          this.time = data[i].time;
          console.log(this.date, this.time);
          this.isShowTime = false;
          this.showTime = this.date + " " + this.time;
        }
      }
    },

    // 获取姓名 电话
    getUserInfo() {
      let data = JSON.parse(window.sessionStorage.getItem("infoData"));
      this.userInfo.userName = data.name;
      this.userInfo.userNumber = data.telNo;
    },

    //
    showInput() {
      document.querySelector("#input").scrollIntoView();
    },

    // 获取本地存储里的值
    getSessionStorage() {
      if (window.sessionStorage.getItem("time")) {
        this.showTime = window.sessionStorage.getItem("time");
        this.isShowTime = window.sessionStorage.getItem("isShowTime");
        this.userInfo.userName = window.sessionStorage.getItem("userName");
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
#main {
	width: 100%;
	height: 100vh;
	position:fixed;
	top:0px;
	left:0px;
	overflow :hidden;

	#header {
		width: 100%;
		height: 131px;
		background-color: #fff;

		p:nth-child(1) {
			height: 100%;
			width: 145px;
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
				display: inline-block;
				width: 60%;
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

	// 步骤条
	#stepBar {
		width: 100%;
		height: 108px;
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

	#shopInfo {
		height: 261px;
		width: 100%;
		background-color: #fff;
		position: relative;

		.top {
			height: 180px;
			width: 100%;
			padding: 30px;
			text-align: left;
			border-bottom: 1px solid #ddd;

			.icon {
				width: 160px;
				height: 120px;
				float: left;
				margin-right: 20px;
			}

			p:nth-child(2) {
				font-size: 30px;
				color: #333;
				margin-top: -6px;
				margin-bottom: 4px;
				height: 38px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 65%;
			}

			p:nth-child(3) {
				height: 40px;
				line-height: 40px;
				font-size: 28px;
				color: #FF3D35;
				margin-bottom: 6px;

				img {
					width: 28px;
					height: 26px;
					margin-top: -8px;
				}
			}

			p:nth-child(4) {
				img {
					width: 20px;
					height: 25px;
				}

				span {
					color: #999;
					vertical-align: middle;
				}

				span:nth-child(2) {
					display: inline-block;
					width: 40%;
					// height:26px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			p:nth-child(5) {
				width: 110px;
				height: 55px;
				border: 1.5px solid #E50012;
				border-radius: 5px;
				line-height: 55px;
				color: #E50012;
				font-size: 30px;
				text-align: center;
				position: absolute;
				top: 63px;
				right: 30px;
			}
		}

		.bottom {
			width: 100%;
			height: 80px;

			p {
				width: 49%;
				height: 100%;
				font-size: 28px;
				color: #808080;
				line-height: 80px;

				img {
					width: 32px;
					height: 32px;
				}
			}

			// p:first-child {
			// border-right:1px solid #ddd;
			// float:left;
			// }
			a {
				width: 49%;
				height: 100%;
				font-size: 28px;
				color: #808080;
				line-height: 80px;
				display: inline-block;
				float: left;

				img {
					width: 32px;
					height: 32px;
				}
			}

			p:nth-child(2) {
				border-left: 1px solid #ddd;
				float: right;
			}
		}
	}

	.time {
		width: 100%;
		height: 88px;
		background-color: #fff;
		position: relative;
		padding: 0px 30px;
		margin-top: 10px;

		input {
			width: 100%;
			height: 88px;
			border: none;
			font-size: 28px;
			padding-left: 156px;
			box-sizing: border-box;
			color: #333;
		}

		input::-webkit-input-placeholder { /* WebKit browsers */
			color: #ccc;
			font-size: 28px;
		}

		input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
			color: #ccc;
			font-size: 28px;
		}

		input::-moz-placeholder { /* Mozilla Firefox 19+ */
			color: #ccc;
			font-size: 28px;
		}

		input:-ms-input-placeholder { /* Internet Explorer 10+ */
			color: #999;
			font-size: 28px;
		}

		span {
			position: absolute;
			font-size: 28px;
			color: #666;
			top: 29px;
		}
	}

	.userName {
		width: 100%;
		height: 88px;
		background-color: #fff;
		position: relative;
		padding: 0px 30px;
		margin-top: 1.5px;

		input {
			width: 100%;
			height: 88px;
			border: none;
			font-size: 28px;
			padding-left: 160px;
			box-sizing: border-box;
			color: #333;
		}

		input::-webkit-input-placeholder { /* WebKit browsers */
			color: #ccc;
			font-size: 28px;
		}

		input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
			color: #ccc;
			font-size: 28px;
		}

		input::-moz-placeholder { /* Mozilla Firefox 19+ */
			color: #ccc;
			font-size: 28px;
		}

		input:-ms-input-placeholder { /* Internet Explorer 10+ */
			color: #999;
			font-size: 28px;
		}

		span {
			position: absolute;
			font-size: 28px;
			color: #666;
			top: 29px;
		}
	}

	.userNumber {
		height: 88px;
		background-color: #E9E9E9;
		line-height: 88px;
		padding: 0px 30px;
		text-align: left;

		span:nth-child(1) {
			font-size: 29px;
			color: #666;
			margin-right: 19px;
		}

		span:nth-child(2) {
			color: #666;
			font-size: 28px;
		}
	}

	#btn {
		width: 91%;
		height: 88px;
		font-size: 28px;
		line-height: 88px;
		margin: 0 auto;
		margin-top: 40px;
		background-color: #E50012;
		color: #fff;
		border-radius: 7px;
	}


	// 预约预览盒子样式
	#preview {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0px;
		background-color: rgba(0, 0, 0, 0.5);

		.content {
			width: 85%;
			height: auto;
			background-color: #FCFCFC;
			border-radius: 24px;
			margin: 0 auto;
			margin-top: 35%;
			padding: 0px 30px;
			font-size: 28px;
			text-align: left;
			padding-bottom: 50px;

			.one {
				color: #333;
				font-weight: bold;
				height: 98px;
				line-height: 98px;
				border-bottom: 1px solid #ddd;
			}

			.div {
				width: 100%;
				height: auto;
				display: flex;
				margin-bottom: 20px;
				margin-top: 20px;

				p:first-child {
					float: left;
					flex: 1;
					color: #666;
				}

				p:last-child {
					width: 70%;
					float: left;
					flex: 3;
				}
			}

			.btn {
				width: 100%;
				// padding:0px 100px;
				height: 76px;
				box-sizing: border-box;
				margin-top: 40px;

				p {
					width: 40%;
					height: 76px;
					line-height: 76px;
					text-align: center;
					border-radius: 8px;
				}

				p:first-child {
					border: 1px solid #999;
					color: #999;
					float: left;
					margin-left: 45px;
				}

				p:last-child {
					float: right;
					color: #fff;
					background-color: #E50012;
					margin-right: 45px;
				}
			}
		}
	}
}

	// 预约时间盒子
	#time {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0px;
		background: rgba(0, 0, 0, 0.5);

		#hideTimeBox {
			width: 100%;
			height: 810px;
		}

		#timeBox {
			width: 100%;
			height: 520px;
			background-color: #fff;
			position: fixed;
			bottom: 0px;

			.header {
				background-color: #F2F2F2;
				padding-top: 30px;
				width: 100%;
				height: 100px;

				p:nth-child(1) {
					font-size: 30px;
					color: #333;
				}

				p:nth-child(2) {
					font-size: 24px;
					color: #F71918;
				}
			}

			.changTime {
				width: 100%;
				height: 423px;

				.dateTime {
					width: 280px;
					height: 100%;
					float: left;
					overflow:auto;
					

					li {
						width: 100%;
						height: 84px;
						font-size: 30px;
						color: #999;
						line-height: 84px;
						background: rgba(240, 240, 240, 1);
						border-bottom: 1px solid #fff;
					}

					.baiSe {
						background-color: #fff;
						color: #333 !important;
					}
				}

				.timeRight {
					float: right;
					width: 450px;
					height: 100%;
					overflow: auto;

					li {
						width: 100%;
						height: 84px;
						line-height: 84px;
						font-size: 30px;
						color: #333;
						border-bottom: 1px solid #ddd;
					}
				}
			}
		}
	}
</style>

