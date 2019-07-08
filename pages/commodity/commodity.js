// pages/commodity/commodity.js
const api = require("../../http/config.js");
const http = require('../../http/index.js');
var WxParse = require('../../wxParse/wxParse.js');
let app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        Topha: null,
        jiaonan: null,
        result:null,
        imgUrls:[],
        sc:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 手机自带信息高度
        this.setData({
            Topha: app.globalData.statusBarHeight
        })
        // 胶南高度
        this.setData({
            jiaonan: app.globalData.jiaonan
        })
        let ff={
            shopId: 18,
            storeId: 56200,
            goodsId: options.goodsId,
            teminal: 2
        }
        // 详情
        http(api.baseUrl + "/shopGoods/detail","params",ff,"get").then(res=>{
            if (res.data.status.statusCode==0){
                console.log(res.data.result)
                this.setData({
                    result: res.data.result,
                    imgUrls: res.data.result.goodsPics.split(",")
                })
                var article = res.data.result.goodsDetail
                var that=this
                WxParse.wxParse("article", "html", article, that)
                // 判断是否收藏
                this.sfsc(res.data.result)
            }
        })

    },
    // 判断是否收藏
    sfsc(result){
        console.log(result)
        let fa = {
            "customerId": 589,
            "memberId": 589,
            "shopId": 18,
            "storeId":result.storeId,
            "goodsName": result.goodsName,
            "goodsId": result.goodsId
        }
        // 判断是否为收藏
        http(api.baseUrl + "/shopInfoController/getGoodsConllectionByConditions", "data", fa, "post").then(res => {
            console.log(res.data.result)
            if (res.data.result == 1) {
                console.log("已收藏", res.data.result)
                this.setData({
                    sc: true
                })
            } else if (res.data.result == 0) {
                console.log("没收藏")
                this.setData({
                    sc: false
                })
            }
        })
    },
    // 取消收藏
    quxiao() {
        console.log(this.data.result)
        let fa={
            collectionIds:this.data.result.id
        }
        http(api.baseUrl + "/shopInfoController/deleteCollectionOfGoods", "params", fa, "post").then(res=>{
            console.log(res.data.result)
            this.onLoad()
        })
    },
    tianjia(){
        
    },
    // 加入购物车
    jrgwc(){
        let fa={
            customerId:589 ,
            shopId: 18,
            goodsId: this.data.result.goodsId ,
            quantity: 1,
            teminal: 2,
            storeId: this.data.result.storeId
        }
        http(api.baseUrl + "/orderShoppingCart/goodsToShoppingCart","data",fa,"post").then(res=>{
                console.log(res)
            if (res.data.status.statusCode==0){
                wx.showToast({
                    title: '已加入购物车',
                    icon:"none",
                    duration: 2000
                })
                
            }
        })
    },
    houtui(){
        wx.navigateBack({})
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