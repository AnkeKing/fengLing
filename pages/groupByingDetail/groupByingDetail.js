// pages/groupByingDetail/groupByingDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateObj:{},
    shopCount:0,
    martop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      martop:getApp().globalData.statusBarHeight+getApp().globalData.jiaonan.height+18
    })
  },
  add(){
    let count=this.data.shopCount;
    count++;
    this.setData({
      shopCount:count
    })
  },
  sub(){
    let count=this.data.shopCount;
    count--;
    this.setData({
      shopCount:count
    })
  },
  toBying(){
    wx.navigateTo({url: '../confirmOrder/confirmOrder'})
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