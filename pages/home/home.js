// pages/home/home.js
const app=getApp();
const api = require("../../http/config.js");
const http = require('../../http/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //  困在全局直接在全局取
      statusBarHeight: app.globalData.statusBarHeight
  }, 

// tab点击事件
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
    
  },
  getLocation: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 31.0938140000,//要去的纬度-地址
          longitude: 121.5039390000,//要去的经度-地址
          name: "西藏拉萨市城关区吉日街道办事处江苏路36号",
          address: '西藏拉萨市城关区吉日街道办事处江苏路36号'
        })
      }
    })
  },
 callme:function(){
    wx.makePhoneCall({
      phoneNumber:"17600181028",
    })
 },

// 竖向点击事件
  ckb: function (e) {
    var that = this;
    if (this.data.Tab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        Tab: e.target.dataset.current,
      })
    }
  },

  




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http(api.in_theaters).then(res => {
      console.log(res)
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