// pages/groupBying/groupBying.js
var http = require("../../http/index.js");
var api = require("../../http/groupBying_config");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stopDate: "2019/07/21 05:21:21",
    openDate: "2019/06/19 07:27:27",
    allDateArr: [],
    martop: 0,
    result: null,
    nickName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    this.countDown();
    http(
      api.storeGroupBuyList,
      "params",
      {
        storeId: 56200,
        pageIndex: 1,
        pageSize: 5
      },
      "POST"
    ).then(res => {
      console.log("tuangou", res)
      that.setData({
        martop: getApp().globalData.statusBarHeight + getApp().globalData.jiaonan.height + 18,
        result: res.data.result
      })
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          nickName: JSON.parse(res.data).nickName,
        })
        console.log("赋值",that.data.nickName)
      },
    })
  },
  //小于10的格式化函数
  timeFormat(param) {
    return param < 10 ? '0' + param : param;
  },
  //倒计时
  countDown() {
    for (var t in this.data.result) {//开团时间：this.data.result[t].teamBuyStartTime
      let stopTime = this.data.result[t].teamBuyEndTime - new Date().getTime();
      let obj = null;
      if (stopTime > 0) {// 如果活动未结束，对时间进行处理
        let time = stopTime / 1000; // 获取天、时、分、秒 
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day), hou: this.timeFormat(hou),
          min: this.timeFormat(min), sec: this.timeFormat(sec)
        }
      } else {//活动已结束，全部设置为'00' 
        obj = { day: '00', hou: '00', min: '00', sec: '00' }
      }
      let arr = this.data.allDateArr;
      arr[t] = obj;
      this.setData({
        allDateArr: arr
      })
    }
    setTimeout(this.countDown, 1000);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that=this;
    let sendinfo = {
      num: 1, nickName: that.data.nickName,
    }
    let str = JSON.stringify(sendinfo);
    return {
      title: "可爱的" + that.data.nickName + '向你分享了小程序',
      path: '/page/user?sendinfo=' + str,
      imageUrl: "https://hbimg.huabanimg.com/589dfa8a22c324f01a749d9e5d5b6fb0f389470e231f6-KMXCiK_fw658",
      success: function (res) {
        // 转发成功 
      }, fail: function (res) {
        // 转发失败 
      }
    }
  },
  toDetail() {
    wx.navigateTo({
      url: '../groupByingDetail/groupByingDetail?dateObj=' + {
        stopDate: "2019/07/21 05:21:21",
        openDate: "2019/06/19 07:27:27"
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
    wx.showShareMenu({
      withShareTicket: true
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


})