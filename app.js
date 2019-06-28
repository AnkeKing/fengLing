//app.js
const api = require("./http/config.js");
const http = require('./http/index.js');
App({
  onLaunch: function (ops) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //小程序在群里被打开后，获取情景值和shareTicket
    if (ops.scene == 1044) {
      console.log("shareTicket",ops.shareTicket)
     }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          http("https://web-gateway.newbeescm.com/ms-web/weCat/auth/403/" + res.code + "?version=2&type=1"
          ).then(res => {

            this.globalData.data = res.data
            console.log(this.globalData.data)
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = JSON.stringify(res.userInfo)
              wx.setStorage({
                key: 'userInfo',
                data: JSON.stringify(res.userInfo)
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    data: null,
    jiaonan: wx.getMenuButtonBoundingClientRect()
  }
})

  
