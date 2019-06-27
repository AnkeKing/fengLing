//index.js
//获取应用实例
const app = getApp()
const api = require("../../http/config.js");
const http = require('../../http/index.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    Topha:null,
    jiaonan: null,
    mobile:null,
    code:null,
    password:null
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
  password(e){
    console.log(e.detail.value)
    this.setData({
      password:e.detail.value
    })
  },
  mobile(e){
    this.setData({
      mobile: e.detail.value
    })
  },
  huoqu(){
    // 获取验证码
    console.log(this.data.mobile)
   let form={
     mobile:this.data.mobile,
      shopId: app.globalData.data.result.shopInfoDTO.id,
      messageType:'BIND_WECHAT_PHONE'
    }
    http('https://pre-web-gateway.newbeescm.com/ms-web/u/sendMessage?mobile=' + this.data.mobile + " & shopId=" + app.globalData.data.result.shopInfoDTO.id + "&messageType=BIND_WECHAT_PHONE").then(res=>{
      console.log(res.data.attachment.code)
      this.setData({
        code:res.data.attachment.code
      })
    })
    
    
  },
  queren(){
    console.log(app.globalData.data.result)
    // http(
    //   api.baseUrl + "/memberAccount/bindMobileForMember?sourceType=" + "APP" + "&memberSource=601&" + "mobile=" + this.data.mobile + "&password=" + this.data.password + "&code=" + this.data.code + "&wechatOpenId=" + app.globalData.data.result.wechateId + "&merchantId=" + app.globalData.data.result.shopInfoDTO.merchantId,
   
    // ).then(res => {
    //   console.log(res)
    // })
    let ff={
      sourceType: 'APP',
      memberSource: 601,
      mobile: this.data.mobile ,
      password: this.data.password ,
      code: this.data.code,
      wechatOpenId: app.globalData.data.result.wechateId,
      merchantId: app.globalData.data.result.shopInfoDTO.merchantId
    }
    http(api.baseUrl +"/memberAccount/bindMobileForMember","params",ff,"get").then(res => {
      console.log(res)
    })
}
})
