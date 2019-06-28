// pages/confirmOrder/confirmOrder.js
var http = require("../../http/index.js");
var api = require("../../http/groupBying_config");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "../../img/ic_group_location.png",
      id: 0,
      latitude: 29.6463,
      longitude: 91.14695,
      width: 55,
      height: 72
    }],
    polyline: [{
      points: [{
        longitude: 29.6463,
        latitude: 91.14695
      }, {
        longitude: 29.6463,
        latitude: 91.14695
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    nickName: "",
    phone: ""
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http(
      api.storeGroupBuyList,
      "params",
       {
        storeId: 56200,
        pageIndex: 1,
        pageSize: 1
      },
      "post"
    ).then(res => {
      console.log("tuangou", res)
    })
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        // success
        console.log(res.data)
        that.setData({
          nickName: JSON.parse(res.data).nickName,
          phone: "15210795092"
        })
      },
    })
    wx.login({
      success: res => {
        if (res.code) {
          console.log("kkkk", res.code)
        }
      }
    })
    this.getLocation();
  },
  getLocation() {
    var that = this;
    wx.showLoading({ title: "定位中", mask: true });
    wx.getLocation({
      type: 'gcj02', altitude: true,//高精度定位 //定位成功，更新定位结果 
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
          longitude: longitude, latitude: latitude,
          speed: speed, accuracy: accuracy,
        })
      }, //定位失败回调 
      fail: function () {
        wx.showToast({ title: "定位失败", icon: "none" })
      },
      complete: function () { //隐藏定位中信息进度 
        wx.hideLoading()
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
    let plugin = requirePlugin("myPlugin");

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