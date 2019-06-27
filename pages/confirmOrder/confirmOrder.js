// pages/confirmOrder/confirmOrder.js
var http = require("../../http/index.js")
var api = require("../../http/groupBying_config")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routeInfo: {
      startLat: 0.0,    //起点经度 选填
      startLng: 0.0,    //起点纬度 选填
      startName: "未获取到起点",   // 起点名称 选填
      endLat: 0.0,    // 终点经度必传
      endLng: 0.0,  //终点纬度 必传
      endName: "未获取到终点",  //终点名称 必传
      mode: "car"  //算路方式 选填
    },
    storeLocation: "西藏拉萨市城关区吉日街道办事处江苏路36号",
    key: "6DJBZ-5IZ6P-2UEDN-VL3DL-WEDHZ-SMBXV"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _page = this;
    console.log(options);
    var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
    var qqmapsdk;
    var that = this // 实例化API核心类 
    qqmapsdk = new QQMapWX({
      key: 'C2XBZ-FIGWD-76B4E-H3GJV-FGCME-Z3FJS' //这是你申请的key值 
    });
    wx.getLocation({
      type: 'wgs84', //默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02' 
      success: function (res) {
        console.log(res)
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude, longitude: res.longitude
          },
          success: function (addressRes) {
            var address = addressRes.result.address_component.city //返回的结果 
            console.log(address)
            that.setData({ address: address })
            console.log(that);
          }
        })
      },
    })





    http(api.storeLocation + "address=" + this.data.storeLocation + "&key=" + this.data.key).then(res => {
      console.log("...", res.data.result.location.lat);
      console.log("...", res)
      // _page.setData({
      //   routeInfo: {
      //     startLat: parseFloat(res.data.result.location.lat),    //起点经度 选填
      //     startLng: parseFloat(res.data.result.location.lng),    //起点纬度 选填
      //     startName: options.get_address,   // 起点名称 选填
      //     endLat: parseFloat(0),    // 终点经度必传
      //     endLng: parseFloat(0),  //终点纬度 必传
      //     endName: options.give_address,  //终点名称 必传
      //     mode: "car"  //算路式 选填
      //   }
      // })
      // wx.getLocation({
      //   type: 'wgs84', //默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02' 
      //   success: function (res) {
      //     console.log("，，，",res)
      //     qqmapsdk.reverseGeocoder({
      //       location: {
      //         latitude: res.latitude,
      //         longitude: res.longitude
      //       },
      //       success: function (addressRes) {
      //         var address = addressRes.result.address_component.city //返回的结果
      //         console.log(address)
      //         that.setData({
      //           address: address
      //         })
      //         console.log(that)
      //       }
      //     })
      //   },
      // })

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