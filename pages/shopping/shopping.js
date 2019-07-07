// pages/shopping/shopping.js
// 默认声明一个函数记录list显示的数据---删除状态
var initdata = function (that) {
    var port = that.data.port
    for (var i = 0; i < port.length; i++) {
        port[i].shows = ""
    }
    that.setData({
        port: port
    })
}

const app= getApp()
const http = require('../../http/index.js')
const api = require('../../http/config.js')
Page({

  /**
   * 页面的初始数据
   */

    data: {
        statusBarHeight: app.globalData.statusBarHeight,
        delBtnWidth: 185,//按钮宽度
        port:{
            shows: ''
        },
        capsule:null,
        list:null,
        weixuan:'../../img/ic_check_defult.png',
        xuanzhong:'../../img/ic_checked.png',
        arr:[],
        check:true,
        totalPrice:0,
        ports:{
            shows:''
        },
        totalsPrice:0
    },


  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        this.setData({
            capsule: wx.getMenuButtonBoundingClientRect().height
        })
        
        this.initEleWidth();

        this.shopping()

    },

    // 全选和取消全选
    AllSelect(e){
        console.log(e)
        let status = e.currentTarget.dataset.status;
        let ids = e.currentTarget.dataset.ids;
        let url;
        if(status ==0){
            url = api.baseUrl + '/orderShoppingCart/allNoCheckShoppingCartGoods'
        }else{
            url = api.baseUrl + '/orderShoppingCart/allCheckShoppingCartGoods'
        }
        let allselect = {
            customerId: 589,
            goodsIds:ids,
            shopId:18 ,
            storeId: 56200,
            teminal: 2
        }
        http( url , 'data' , allselect , 'post').then(res=>{
            console.log(res)
            if(res.data.status.statusCode === 0){
                this.shopping()
            }
        })
    },


    //获取购物车商品接口
    shopping(){
        let can = {
            customerId: 589,
            shopId: 18,
            storeId: 56200,
            teminal: 2
        }

        http(api.baseUrl + '/orderShoppingCart/getShoppingCartGroup', "data", can, "post").then(res => {
            console.log("购物车商品", res)
            // if (res.data.status.statusCode === 0) {
            //     this.setData({
            //         port: res.data.result.selfOperatedCart.goodsCarQueryList,
            //         totalPrice: res.data.result.selfOperatedCart.goodsTotalPrice,
            //         ports: res.data.result.agentCart.goodsCarQueryList,
            //         totalsPrice: res.data.result.agentCart.goodsTotalPrice
            //     })
                
            // } 
            if(res.data.status.statusCode === 0){
                let goodsartQueryList = res.data.result.agentCart.goodsCarQueryList;
                let selfOpenatedCart = res.data.result.selfOperatedCart.goodsCarQueryList;
                for (let i = 0; i < selfOpenatedCart.length;i++){
                    selfOpenatedCart[i].check = false;
                    selfOpenatedCart[i].allIds = [];

                    // 方法1:
                    let status = true;
                    for (let j = 0; j < selfOpenatedCart[i].goodsList.length;j++){
                        if (!selfOpenatedCart[i].goodsList[j].checkedState){
                            status = false;
                            break
                        }
                    }
                    selfOpenatedCart[i].checked = status;



                    // // 方法2:
                    // let count= 0
                    // for (let j = 0; j < selfOpenatedCart[i].goodsList.length;j++){
                    //     selfOpenatedCart.allIds.push(selfOpenatedCart[i].goodsList[j].goodsId)
                    //     if (!selfOpenatedCart[i].goodsList[j].checkedState){
                    //         count++
                    //     }
                    // }
                    // if(count>0){
                    //     selfOpenatedCart[i].checked = false
                    // }else{
                    //     selfOpenatedCart[i].checked = true
                    // }
                }
                for (let o = 0; o < goodsartQueryList.length; o++) {
                    goodsartQueryList[o].check = false;
                    goodsartQueryList[o].allIds = [];

                    // 方法1:
                    let status = true;
                    for (let k = 0; k < goodsartQueryList[o].goodsList.length; k++) {
                        if (!goodsartQueryList[o].goodsList[k].checkedState) {
                            status = false;
                            break
                        }
                    }
                    goodsartQueryList[o].checked = status;
                }
                this.setData({
                    port: selfOpenatedCart,
                    totalPrice: res.data.result.selfOperatedCart.goodsTotalPrice,
                    totalsPrice: res.data.result.agentCart.goodsTotalPrice,
                    ports: goodsartQueryList
                })
            }
        })
    },

    // 取消选中
    xuanzhong(e){
        console.log('check',e)
        var arr = e.currentTarget.dataset.id.goodsId
        let xuanzhong = {
            customerId:589 ,
            goodsIds: [e.currentTarget.dataset.id.goodsId],
            shopId: 18,
            storeId: 56200,
            teminal: 2
        }
        http(api.baseUrl + '/orderShoppingCart/noCheckShoppingCartGoods','data' , xuanzhong ,'post').then(res=>{
            console.log('取消选中',res)
            if(res.data.status.statusCode === 0){
                this.shopping()
            }else{
                wx.showToast({
                    title: res.data.status.statusReson,
                    icon:'none'
                })
            }
        }).catch(err=>{
            wx.showToast({
                title: err,
                icon:'none'
            })
        })
    },

    // 选中
    weixuan(e){
        var arr = e.currentTarget.dataset.id.goodsId
        let weixuan = {
            customerId: 589,
            goodsIds: [e.currentTarget.dataset.id.goodsId],
            shopId: 18,
            storeId: 56200,
            teminal: 2
        }
        http(api.baseUrl + '/orderShoppingCart/checkShoppingCartGoods','data' ,weixuan , 'post').then(res=>{
            if(res.data.status.statusCode === 0){
                console.log('weixuan',res)
                this.shopping(),
                this.setData({
                    // totalPrice:
                })
            }else{
                wx.showToast({
                    title: res.data.status.statusReason,
                    icon:'none'
                })
            }
        })
    },

    // 商品数量减
    minus(e){
        console.log(e)
        let minus = {
            customerId: 589,
            goodsId: e.currentTarget.dataset.minus.goodsId,
            goodsType: e.currentTarget.dataset.minus.goodsType,
            quantity: e.currentTarget.dataset.minus.quantity,
            shopId: 18,
            storeId: 56200,
            teminal: 2
        }
        http(api.baseUrl + '/orderShoppingCart/subtractShoppingCart', "data", minus, "post").then(res => {
            this.onLoad()
        })

    },

    // 商品数量加
    add(e){
        let add= {
            customerId: 589,
            goodsId: e.currentTarget.dataset.add.goodsId,
            goodsType: e.currentTarget.dataset.add.goodsType,
            quantity: e.currentTarget.dataset.add.quantity,
            shopId: 18,
            storeId: 56200,
            teminal: 2
        }
        http(api.baseUrl + '/orderShoppingCart/addShoppingCart','data' ,add , "post").then(res=>{
            this.onLoad()
        })
    },

    // 跳转页面
    acknowledgement(e){
        wx.navigateTo({
            url: '../acknowledgement/acknowledgement',
        }) 
    },
    // 跳到详情页
    acknowledgement(e){
        console.log(e.currentTarget.dataset.port.goodsId)
        wx.navigateTo({
            url: '../commodity/commodity?goodsId=' + e.currentTarget.dataset.port.goodsId ,
        })
    },
    acknow(e){
        wx.navigateTo({
            url: '../commodity/commodity?goodsId='+e.currentTarget.dataset.ports.goodsId,
        })
    },

    

    touchS: function (e) {
        // console.log('开始',e)
        if (e.touches.length == 1) {
            this.setData({
                //设置触摸起始点水平方向位置 
                startX: e.touches[0].clientX
            });
        }
    },

    // 滑动中事件
    touchE: function (e) {
        if (e.changedTouches.length == 1) {
            //手指移动结束后水平位置 
            var endX = e.changedTouches[0].clientX;
            //触摸开始与结束，手指移动的距离 
            var disX = this.data.startX - endX;
            var delBtnWidth = this.data.delBtnWidth;
            //如果距离小于删除按钮的1/2，不显示删除按钮 
            var txtStyle = "";
            txtStyle = (disX > (delBtnWidth / 2) ? "left:-" + delBtnWidth + "px" : "left:0px");
            //获取手指触摸的是哪一项 
            var index = e.currentTarget.dataset.index;
            var idx = e.currentTarget.dataset.idx;
            var port = this.data.port;
            var ports = this.data.ports;
            port[idx].goodsList[index].shows = txtStyle;
            ports[idx].goodsList[index].shows = txtStyle;
            // console.log("1", port[index].shows);
            //更新列表的状态 
            this.setData({
                port: port,
                ports:ports
            });
        } else {
            console.log("2");
        }
    },
    //获取元素自适应后的实际宽度 
    getEleWidth: function (w) {
        var real = 0;
        try {
            var res = wx.getSystemInfoSync().windowWidth;
            var scale = (750 / 2) / (w / 2);
            // console.log(scale); 
            real = Math.floor(res / scale);
            return real;
        } catch (e) {
            return false;
            // Do something when catch error 
        }
    },
    initEleWidth: function () {
        var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth: delBtnWidth
        });
    },
    delItem: function (e) {
        // console.log(e)
        var index = e.currentTarget.dataset.index;
        var item = e.currentTarget.dataset.item;
        var port = this.data.port;
        let data = {
            customerId: 589,
            goodsId: item.goodsId,
            goodsType: item.goodsType,
            quantity: item.quantity,
            shopId: 18,
            storeId: 56200,
            teminal: 2
        }
        http(api.baseUrl + '/orderShoppingCart/deleteShoppingCart','data',data,'post')
        .then(res => {
            if(res.data.status.statusCode === 0) {
                this.shopping()
            }
        })

    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})