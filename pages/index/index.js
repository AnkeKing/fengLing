//index.js
//获取应用实例
const app = getApp()
const api = require("../../http/config.js");
const http = require('../../http/index.js');
const rlg = require("../../rlh/rlh.js");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    Topha:null,
    jiaonan: null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad: function () {
    
    this.setData({
      Topha: app.globalData.statusBarHeight
    })
    this.setData({
      jiaonan: wx.getMenuButtonBoundingClientRect()
    })
    console.log(this.data.Topha)
    console.log(this.data.jiaonan)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  huoqu(){
  console.log("aa")
  let thit=this
    wx.login({
      success(res) {
        console.log("code",res.code)
        
      }
    })
}
})
