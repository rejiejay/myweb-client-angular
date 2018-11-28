<template>
    <div>
          <!-- 编辑评论 -->
            <div id="comment">
                <p>请对本次服务进行评价</p>
                <p>
                  <img v-for="(item,index) in imgData" :key="index" @click="item.active=!item.active,redStar(index)" :src="item.active?require('../assets/img/icon_star03@2x.png'):item.src">
                </p>
                <p>
                  <span v-for="(item,index) in comment" :key="index" @click="item.active=!item.active,change(index)"  :class="[item.active?'bgcColor':'']">{{item.name}}</span>
                </p>
                <textarea v-model="commentTxt" name="commentTxt" maxlength="300" id="" cols="10" rows="10" placeholder="请输入评价内容,300字以内"></textarea>
                <p  v-show="commentTxt==''&&isChange==false&&changeStrat==false">确定</p>
                <p v-show="commentTxt!==''||isChange==true||changeStrat==true" @click="success()">确定</p>
            </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    name: '',

    data () {
        return {
             imgData: [
                { src: require("../assets/img/icon_star04@2x.png"), active: false },
                { src: require("../assets/img/icon_star04@2x.png"), active: false },
                { src: require("../assets/img/icon_star04@2x.png"), active: false },
                { src: require("../assets/img/icon_star04@2x.png"), active: false },
                { src: require("../assets/img/icon_star04@2x.png"), active: false }
            ],
            comment: [
                { name: "服务专业", active: false },
                { name: "环境好", active: false },
                { name: "服务热情", active: false }
            ],
            commentTxt: "", // 输入的评价
            commentTxt1:'', // 选择的评价
            number:'',      // 评分
            isChange: false, 
            changeStrat:false
        }
    },

    methods: {
         //点击星星
        redStar(index) {
            let data = this.imgData;
            for (let i = 0; i < data.length; i++) {

                if (data[4].active == true) {
                     this.changeStrat = true
                    data[0].active = true;
                    data[1].active = true;
                    data[2].active = true;
                    data[3].active = true;
                }
                if (data[3].active == true) {
                     this.changeStrat = true
                    data[0].active = true;
                    data[1].active = true;
                    data[2].active = true;
                }
                if (data[2].active == true) {
                     this.changeStrat = true
                    data[0].active = true;
                    data[1].active = true;
                }
                if (data[1].active == true) {
                    this.changeStrat = true
                    data[0].active = true;
                }
                if (data[0].active == true) {
                    this.changeStrat = true
                }
                if(data[0].active==false&&data[1].active==false&&data[2].active==false&&data[3].active==false&&data[4].active==false){
                    this.changeStrat = false
                }
                
            }
        },
        change(index) {
            let data = this.comment;
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].active)
                if(data[i].active ==true){
                this.isChange = true
                }
                if(data[0].active==false&&data[1].active==false&&data[2].active==false) {
                    this.isChange = false
                }
            }
        },
        success() {
            let data2 = []
            for(let i=0;i<this.imgData.length;i++){
                if(this.imgData[i].active==true){
                    data2.push(this.imgData[i].active)
                }
            }
            // 获取星星评分
            this.number = data2.length

            for(let i=0;i<this.comment.length;i++){
                if(this.comment[i].active==true){
                    this.commentTxt1 += this.comment[i].name+','
                }
            }
            let data = {
                CustomerID:this.$route.query.CustomerID,
                Status:'2',
                Evaluate : ''+this.number,
                EvaluateContent: this.commentTxt1+this.commentTxt,
                BookID:this.$route.query.BookID
            }
            this.$http.cancelApointment1(data).then(res=>{
               if(res.data.Code === 200){
                    // 提示完成
                    Toast({
                        message: "评价完成",
                        duration: 1500
                    });
                    window.history.go(-1)
                    // 清空输入框
                    this.commentTxt = ''
                    // // 清空选中的评论
                    for(let i=0;i<this.comment.length;i++){
                        this.comment[i].active = false
                    }
                    // 把星星变回灰色
                    for(let i=0;i<this.imgData.length;i++){
                        this.imgData[i].active = false
                    }
                    // 把确定按钮变成灰色的
                    this.isChange = false
               }else {
                   Toast({
                       message:'评价失败',
                       duration:1000
                   })
               }

            })   
        }
    }
}
</script>

<style lang='stylus' scoped>
    #comment {
        width: 100%;
        height: 100vh;
        background-color: #fff;
        padding: 0px 30px;
        box-sizing: border-box;
        padding-top:200px;
        p:first-child {
            font-size:24px;
            height: 80px;
            line-height: 80px;
            color: #ccc;
        }
        p:nth-child(2) {
            text-align: center;
            img {
                width: 62px;
                height: 60px;
                margin-left: 10px;
            }
        }
        p:nth-child(3) {
            width: 100%;
            margin-top:80px;
            padding: 30px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
                width: 30%;
                height: 70px;
                display: inline-block;
                text-align: center;
                border: 1.5px solid #ddd;
                border-radius: 35px;
                line-height: 70px;
                color: #999;
                font-size: 26px;
            }
            .bgcColor {
                background-color: #ffeff0;
                border: 1.5px solid rgba(229, 0, 18, 1);
                color: #e50012;
            }
        }
        textarea {
            width: 100%;
            height: 150px;
            margin-top:40px;
            outline: none;
            border:none;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            color: #333;
            background-color:#FAFAFA;
            font-size:26px;
        }

        textarea::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
        /* WebKit browsers */ 
            color: #ccc; 
        } 
        textarea:-moz-placeholder, textarea:-moz-placeholder { 
        /* Mozilla Firefox 4 to 18 */ 
            color:#ccc; 
        } 
        textarea::-moz-placeholder, textarea::-moz-placeholder { 
        /* Mozilla Firefox 19+ */ 
            color: #ccc; 
        } 
        textarea:-ms-input-placeholder, textarea:-ms-input-placeholder { 
        /* Internet Explorer 10+ */ 
            color: #ccc; 
        }
        p:nth-child(5) {
            font-size:30px;
            width: 100%;
            height: 88px;
            color: #fff;
            background-color: rgba(229,0,18,0.5);
            border-radius: 12px;
            text-align: center;
            line-height: 88px;
            margin-top: 40px;
        }
        p:last-child {
            width: 100%;
            height: 88px;
            font-size:30px;
            color: #fff;
            background-color: #ccc;
            border-radius: 6px;
            text-align: center;
            line-height: 88px;
            margin-top: 40px;
            background-color: #e50012 !important;
        }
  }
</style>
