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
        picture:true ,
        pictures:false,
        list:null,
        status:true,
        weixuan:'../../img/ic_check_defult.png',
        xuanzhong:'../../img/ic_checked.png',
        arr:[],
        check:true,
        totalPrice:0
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
            if (res.data.status.statusCode === 0) {
                this.setData({
                    picture: true,
                    pictures: false,
                    port: res.data.result.selfOperatedCart.goodsCarQueryList,

                })
                if (this.data.status == false) {
                    this.setData({
                        totalPrice: res.data.result.selfOperatedCart.goodsTotalPrice
                    })
                } else {
                    this.setData({
                        totalPrice: 0
                    })
                }
            } else {
                this.setData({
                    picture: false,
                    pictures: true,
                })
            }
            console.log(this.data.port)
        })
    },

    // 单选按钮
    xuanzheong(e){
        console.log('check',e)
        var arr = e.currentTarget.dataset.id.goodsId
        let xuanzhong = {
            customerId:589 ,
            goodsIds: [e.currentTarget.dataset.check.goodsId],
            shopId: 18,
            storeId: 56200,
            teminal: 2
        }
        http(api.baseUrl + '/orderShoppingCart/checkShoppingCartGoods','data' , xuanzhong ,'post').then(res=>{
            if(res.data.status.statusCode === 0){
                this.shopping()
            }else{
                wx.showToast({
                    title: 'res.data.status.statusReson',
                })
            }
        })
    },



    // selectAll(e){
    //     if(this.data.status == true){
    //         var arr = []
    //         var current = e.currentTarget.dataset.selectall
    //         for (var i = 0; i < current.length; i++) {
    //             var goodsIdsa = current[i].goodsId
    //             arr.push(goodsIdsa)
    //         }
    //         this.setData({
    //             arr: arr
    //         })

    //         let selectAll = {
    //             customerId: 589,
    //             goodsIds: this.data.arr,
    //             shopId: 18,
    //             storeId: 56200,
    //             teminal: 2
    //         }
    //         http(api.baseUrl + '/orderShoppingCart/allCheckShoppingCartGoods', "data", selectAll, "post").then(res => {
    //             console.log(res)
    //             if (this.data.status == true) {
    //                 this.setData({
    //                     status: false,
    //                 })
    //                 this.onLoad()
    //             } else {
    //                 this.setData({
    //                     status: true,
    //                 })
    //             }
    //         })
    //     }else{
    //         let select = {
    //             customerId:589,
    //             goodsIds:this.data.arr,

    //         }
    //     }
        
    // },

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
    acknowledgement(){
        wx.navigateTo({
            url: '../acknowledgement/acknowledgement',
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