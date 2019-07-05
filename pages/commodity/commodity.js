// pages/commodity/commodity.js
const api = require("../../http/config.js");
const http = require('../../http/index.js');
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Topha: null,
        jiaonan: null,
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
            goodsId: 2052635,
            teminal: 2
        }
        http(api.baseUrl + "/shopGoods/detail","params",ff,"get").then(res=>{
            console.log(res.data.result)
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