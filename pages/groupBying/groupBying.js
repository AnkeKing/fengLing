// pages/groupBying/groupBying.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stopDate: "2019/07/21 05:21:21",
    currentDate: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    this.countDown();
  },
  //小于10的格式化函数
  timeFormat(param) {
    return param < 10 ? '0' + param : param;
  },
  //倒计时
  countDown() {
    let stopTime = new Date(this.data.stopDate).getTime()-new Date().getTime();
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
    this.setData({
      currentDate: obj
    })
    setTimeout(this.countDown, 1000);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let sendinfo = {
      num: 1, nickName: getApp().globalData.userInfo.nickName,
    }
    console.log(getApp().globalData.userInfo);
    console.log("分享返回", res);
    let str = JSON.stringify(sendinfo);
    return {
      title: "可爱的" + sendinfo.nickName + '向你分享了小程序',
      path: '/page/user?sendinfo=' + sendinfo,
      imageUrl: "https://hbimg.huabanimg.com/589dfa8a22c324f01a749d9e5d5b6fb0f389470e231f6-KMXCiK_fw658",
      success: function (res) {
        // 转发成功 
      }, fail: function (res) {
        // 转发失败 
      }
    }
  },
  toDetail(){
    wx.navigateTo({url: '../groupByingDetail/groupByingDetail',})
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