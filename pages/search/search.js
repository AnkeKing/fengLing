// pages/search/search.js
const app = getApp()
const api = require("../../http/config.js");
const http = require('../../http/index.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Topha: null,
        jiaonan: null,
        keywords:null,
        search:false,
        historySearch: [], //历史记录
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(this.data.historySearch)
        this.setData({
            Topha: app.globalData.statusBarHeight
        })
        // 胶南高度
        this.setData({
            jiaonan: app.globalData.jiaonan
        })
    },
    // 搜索按钮显示隐藏
    onInputText: function (e) {
        this.setData({
            keywords: e.detail.value
        })
        if (e.detail.value.length > 0) {
            this.setData({
                search: true
            })
        } else {
            this.setData({
                search: false
            })
        }
    },
    toSearch: function (e) {
      
    },
    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    goBack() {
        wx.navigateBack({
        })
    },
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