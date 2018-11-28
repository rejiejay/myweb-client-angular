import axios from 'axios'
let baseUrl
let url
//测试环境
if (process.env.type === 'test'||process.env.NODE_ENV === 'development') {
	baseUrl = 'http://api.demo.hotgz.com'
  	url = 'http://store.demo.ichebaoyang.com/wx/Handler.ashx'
// 正式环境
} else {
  	baseUrl = 'http://ycpdapi.hotgz.com'
  	url = 'http://store.demo.ichebaoyang.com/wx/Handler.ashx'
}
export default {
    //获取车牌信息
	getCarList1: (data) => {
		return axios.post(baseUrl+'/Customer/GetCustomerInfoByOpenID?OpenID='+data)
	},

	//获取预约列表     //获取详情页也是这个接口参数BookID:'',CustomerID:''
   	getDatas1: (data) => {
		return axios.post(baseUrl+'/Apointment/GetApointmentList',data)
	},

	//获取人保/平安服务项目
	getServiceItems1:(data)=>{
		return axios.post(baseUrl+'/Product/GetStoreProduct',data)
	},

	//获取油品
	getApproveProduct1:(data)=>{
		return axios.get(baseUrl+'/Apointment/GetApproveProduct?'+data)
	},

	//获取门店列表
	getShopList1:(data)=>{
		return axios.post(baseUrl+'/Store/GetStoreList',data)
	},

	//获取门店详情
	getStoreInfo1:(data)=>{
		return axios.post(baseUrl+'/Store/GetStoreInfo',data)
	},

	//确认预约
	apointment1:(data)=>{
		return axios.post(baseUrl+'/Apointment/GetAddApointment',data)
	},

	//取消预约
	cancelApointment1:(data)=>{
		return axios.post(baseUrl+'/Apointment/UpdateABYApointment',data)
	},

	//获取服务详情
	GetProduct1:(data)=>{
		return axios.get(baseUrl+'/Product/GetProduct?ProductID='+data)
	},

	//获取油品列表
	GetProductByLevel1:(data)=>{
		return axios.get(baseUrl+'/Product/GetProductByLevel?'+data)
	},

	//获取厂家指导手册
	getManual1:(data)=>{
		return axios.get(baseUrl+'/Apointment/GetCarList?'+data)
	},

	//获取openID
	getOpenID1:(data)=>{
		return axios.post(baseUrl+'/Customer/GetOpenId',data)
	},

	//获取用户信息
	getUserInfo1:(data)=>{
		return axios.post(baseUrl+'/Customer/GetCustomerInfoByOpenID?OpenID='+data)
	},

	//获取上一次保养时间和公里数
	GetTop1Apointment1:(data)=>{
		return axios.get(baseUrl+'/Customer/GetTop1Apointment?'+data)
	},

	//获取上一次保养时间和公里数
	upDatePosition1:(data)=>{
		return axios.get(data)
	},

	//获取门店类型
	getStoreType1:()=>{
		return axios.get(baseUrl+'/Store/GetStoreListInfoType')
	},

	// 获取服务项目
	getProduct1:()=>{
		return axios.get(baseUrl+'/Product/GetProductListInfoType')
	},

	// 获取服务项目http://api.map.baidu.com/geoconv/v1/?coords=114.07416125809836,22.62548475488523&from=1&to=5&ak=FtLd67GQPzH6R73XfKIt8EYyg5DCcTe3
	upDataPosition:(data)=>{
		return axios.get(data)
	},
	
}
