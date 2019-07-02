const app=getApp()
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const api = require("../../http/config.js");
const http = require('../../http/index.js');
//获取城市列表
var getCityList = function (that) {
    let ff={
        shopId: 18
    }
    http(api.baseUrl + "/shopInfoController/shopCoverageRange", "params",ff, "get").then(res => {
        if (res.data.status.statusCode == 0) {
            if (res.data.result.length > 0) {
                var locCity = that.data.locCity ? that.data.locCity : res.data.result[0].item[0].name;
                that.setData({
                    locCity: locCity,
                    city: res.data.result
                })
            } else {
                that.setData({
                    city: null
                })
            }
        } else {
            wx.showToast({
                title: res.data.status.statusReason,
                icon: 'none'
            })
        }
    })
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Topha:null,
    jiaonan:null,
    deliverr:false,
    pickk: true,
    address:null,
    keywords:"",
      markers:{},
      lat:null,
      lng:null,
      locationCityName:null,
      userData:null
  },
//   送货上门,到店自提切换
    deliver(){//送货上门
        console.log("a")
        this.setData({
            deliverr: true
        })
        this.setData({
            pickk: false
        })
    },
    pick(){//到店自提
        this.setData({
            deliverr: false
        })
        this.setData({
            pickk: true
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let thit = this
 
      wx.getStorage({
          key: 'userData',
          success: function (res) {
              // success
              thit.setData({
                  userData: JSON.parse(res.data)
              })
              console.log(thit.data.userData)
          },
      })
      console.log(this.data.userData)
    this.setData({
      Topha: app.globalData.statusBarHeight
    })
    this.setData({
      jiaonan: app.globalData.jiaonan
    })
      console.log(app.globalData.statusBarHeight)
      console.log(app.globalData.jiaonan.top)
     wx.getLocation({
         type:"gjc02",
         success:function(res){
             console.log("获取用户经纬度",res.latitude, res.longitude)
             let from={
                 lat: res.latitude,
                 lng: res.longitude
             }
             http(api.baseUrl + "/location/analysis", "params", from, "get").then(res=>{
                 console.log(res.data.result.result.sematic_description)
                 console.log("经纬度逆向解析",res.data)
                 thit.setData({
                     locationCityName: res.data.result.result.addressComponent.city,
                     markers: { address: res.data.result.result.sematic_description, latitude: res.data.result.result.location.lat, longitude: res.data.result.result.location.lng },
                     address: res.data.result.result.sematic_description,
                     lat: res.data.result.result.location.lat,
                     lng: res.data.result.result.location.lng
                 })
                 
             })
         },
         fail: err => {
             console.log(err)
             thit.setData({
                 address: "定位失败",
             });
             clearInterval(thit.interval);
         }
     })
  },
    bindKeyInput: function (e) {
        var keywords = e.detail.value
        console.log(keywords)
        this.setData({
            keywords: keywords
        })
        http(api.baseUrl + "/location/vagueArea?kw="+keywords+"&region=").then(res=>{
            console.log(res)
        })
        if (keywords != "") {
            this.setData({
                showHistory: false
            })
        } else {
            this.setData({
                showHistory: true
            })
        }
        var that = this;
        var fail = function (data) {
            console.log(data)
        }

    },
  //新增收货地址
    jumpNewAddress(){
            console.log("a")
    },
    // 刷新按钮
    getLocation(){
        console.log("刷新")
    },
    goBack(){
        wx.navigateBack({
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
      getCityList(this)
      wx.getSetting({
          success: res => {
              if (res.authSetting['scope.userLocation']) {
                  console.log("已授权位置");
              } else {
                  console.log("未授权位置");
                  wx.showModal({
                      content: '检测到您未授权定位权限，是否去设置？',
                      confirmColor: "#F83737",
                      success: function (res) {
                          if (res.confirm) {
                              wx.openSetting({
                                  success: (res) => {
                                      console.log(res)
                                      res.authSetting = {
                                          "scope.userLocation": true
                                      }
                                  }
                              })
                          } else if (res.cancel) {
                              console.log('用户点击取消')
                          }
                      }
                  })
              }
          }
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