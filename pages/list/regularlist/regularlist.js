// pages/list/regularlist/regularlist.js
const app = getApp()
const api=require("../../../http/config.js")
const http=require("../../../http/index.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: "",
        inputValue: "",
        result: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        this.setData({
            statusBarHeight: app.globalData.statusBarHeight
        });
        this.http1()
    },
    // 返回上一级
    backtrack() {
        wx.navigateBack({ changed: true });
    },
    http1() {
        let li = {
            "customerId": 589,
            "shopId": 18,
            "storeId": 56200,
            "goodsName": this.data.inputValue,
            "currentPage": 1,
            "pageSize": 10
        };
        http(
            api.regularlist,
            "data",
            li,
            "POST"
        ).then(res => {
            console.log("清单", res);
            if (res.data.status.statusCode == 0) {
                if (res.data.result != undefined) {
                    this.setData({
                        result: res.data.result
                    })
                } else {
                    this.setData({
                        result: []
                    })
                }
            }
        })
    },
    bindKeyInput: function (e) {
        // console.log(e.detail.value)
        this.setData({
            inputValue: e.detail.value
        });
        this.http1()
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
