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
    },


  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        this.setData({
            capsule: wx.getMenuButtonBoundingClientRect().height
        })
        
        this.initEleWidth();

        let can={
            customerId: 589, 
            shopId: 18, 
            storeId: 56200, 
            teminal: 2
        }

        let minus = {
            customerId: "",
            goodsId: "",
            goodsType:"" ,
            quantity: "",
            shopId: "",
            storeId: "",
            teminal: 2
        }
        let cartQuantity = {
            memberId: 589,
            customerId: 589 ,
            shopId: 18,
            storeId: 56200
        }

        http(api.order, "data", can ,"post" ).then(res=>{
           console.log("购物车商品",res)
            if (res.data.status.statusCode === 0){
                this.setData({
                    port: res.data.result.selfOperatedCart.goodsCarQueryList
                })
            }
        })

        http(api.minus, "params", minus , "post").then(res=>{
            console.log('购物车商品数量减',res)
        })

        http(api.shoppingQuantity,'data',cartQuantity,'post').then(res=>{
            console.log('获取购物车商品数量',res)
        })

    },

    acknowledgement(){
        wx.navigateTo({
            url: '../acknowledgement/acknowledgement',
        })
    },

    


    // 开始滑动事件
    touchS: function (e) {
        console.log('开始',e)
        if (e.touches.length == 1) {
            this.setData({
                //设置触摸起始点水平方向位置 
                startX: e.touches[0].clientX
            });
        }
    },
    touchM: function (e) {
        console.log('移动', e)
        var that = this;
        initdata(that)
        if (e.touches.length == 1) {
            //手指移动时水平方向位置 
            var moveX = e.touches[0].clientX;
            //手指起始点位置与移动期间的差值 
            var disX = this.data.startX - moveX;
            var delBtnWidth = this.data.delBtnWidth;
            var txtStyle = "";
            if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变 
                txtStyle = "left:0px";
            } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离 
                txtStyle = "left:-" + disX + "px";
                if (disX >= delBtnWidth) {
                    //控制手指移动距离最大值为删除按钮的宽度 
                    txtStyle = "left:-" + delBtnWidth + "px";
                }
            }
            console.log(txtStyle)

        }
    },
    // 滑动中事件
    touchE: function (e) {
        console.log('结束', e)
        if (e.changedTouches.length == 1) {
            //手指移动结束后水平位置 
            var endX = e.changedTouches[0].clientX;
            //触摸开始与结束，手指移动的距离 
            var disX = this.data.startX - endX;
            var delBtnWidth = this.data.delBtnWidth;
            //如果距离小于删除按钮的1/2，不显示删除按钮 
            var txtStyle = "";
            txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
            //获取手指触摸的是哪一项 
            var index = e.currentTarget.dataset.index;
            var idx = e.currentTarget.dataset.idx;
            var port = this.data.port;
            port[idx].goodsList[index].shows = txtStyle;
            // console.log("1", port[index].shows);
            //更新列表的状态 
            this.setData({
                port: port
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
        console.log(e)
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
        http(api.delCartGoods,'data',data,'post')
        .then(res => {
            if(res.data.status.statusCode === 0) {
                this.onLoad();
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