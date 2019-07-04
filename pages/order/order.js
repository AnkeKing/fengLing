// pages/order/order.js
const app = getApp()
const http = require('../../http/index.js')
const api = require('../../http/config.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: app.globalData.statusBarHeight,
        list:null,
    },

    indentDetail(e){
        console.log('type',e.currentTarget.dataset.order.orderNo)
        wx.navigateTo({
            url: '../indentDetail/indentDetail?orderNo = ' + e.currentTarget.dataset.order.orderNo,
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let chuan = {
            "currentPage": 1,
            "customerId": 589,
            "orderStatus": ["PENDING_PAYMENT", "STORE_WAITING_RECEIPT", "CONSIGNMENT", "DISTRIBUTION","COMPLETED","CANCEL","STOCKING","PICKUP"],
 "pageSize": 10,
                "shopId": 18
        }

        http(api.baseUrl + "/order/orderlist", "data", chuan, "post").then(res => {
            console.log(res)
            if (res.data.status.statusCode === 0) {
                this.setData({
                    list:res.data.result
                })
            }
            console.log('订单',this.data.list)
        })
    },



    delet(e){
        console.log('e',e)
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