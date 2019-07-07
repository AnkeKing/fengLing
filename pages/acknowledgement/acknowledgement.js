// pages/acknowledgement/acknowledgement.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: app.globalData.statusBarHeight,
        selected: true,
        selected1: false
    },

    selected: function (e) {
        this.setData({
            selected1: false,
            selected: true
        })
    },
    selected1: function (e) {
        this.setData({
            selected: false,
            selected1: true
        })
    },


    list(){
        wx.navigateTo({
            url: '../list/address/newAddress/newAddress',
        })
    },

    back(){
        wx.navigateBack({
            delta:1,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowHeight: res.windowHeight
                });
            }
        });
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