// pages/list/address/newAddress/newAddress.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: app.globalData.statusBarHeight,
        addressName: '点击选择地址',
        color: "#cdcdcd",
        sex: -1,//1 男  2  女
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

    },
    select() {
        var that = this;
        wx.chooseLocation({
            success(res) {
                console.log(res.name)
                that.setData({
                    addressName: res.name,
                    color: "#333333"
                })
            }
        })
    },
    // 返回上一级
    backtrack() {
        wx.navigateBack({ changed: true });
    },
    // 性别
    clickSexButton: function (options) {
        let sexId = options.currentTarget.dataset.sexid;
        this.setData({
            sex: sexId
        })
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