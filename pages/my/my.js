// pages/my/my.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: "",
        phone: "17636643721",
        userInfo: {},
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.setData({
            statusBarHeight: app.globalData.statusBarHeight,
            userInfo: app.globalData.userInfo,
            phone: this.data.phone
        })
    },
    getUserInfo: function(e) {

        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.record']) {
                    wx.authorize({
                        scope: 'scope.record',
                        success() {
                            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                            wx.startRecord()
                        }
                    })
                }
            }
        })
    },
    // 跳到收藏页
    collect(){
        wx.navigateTo({
            url: '../../list/collect/collect',
        })
    },
    // 跳到常购清单页
    regularlist(){
        wx.navigateTo({
            url: '../../list/regularlist/regularlist',
        })
    },
    // 跳到收货地址页
    address(){
        wx.navigateTo({
            url: '../../list/address/address',
        })
    },
    // 跳到绑定手机页
    bindphone(){
        wx.navigateTo({
            url: '../../list/bindphone/bindphone',
        })
    },
    phone_button: function() {
        wx.makePhoneCall({
            phoneNumber: "400-666-0246"
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})