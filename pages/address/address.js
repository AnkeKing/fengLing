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
                console.log("城市列表", res.data.result)
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
      userData:null,
      receiverAddress:[],//收货地址,
      search_list:[],//搜索城市列表
      city:null,
      locCity:"",
      storeList:[]
  },
//   送货上门,到店自提切换
    deliver(){//送货上门
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
      if (options!=undefined){
          this.setData({
              locCity: options.city
          })
      }
     
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
    this.setData({
      Topha: app.globalData.statusBarHeight
    })
    this.setData({
      jiaonan: app.globalData.jiaonan
    })
     wx.getLocation({
         type:"wgs84",
         success:function(res){
             console.log("获取用户经纬度",res.latitude, res.longitude)
             let from={
                 lat: res.latitude,
                 lng: res.longitude
             }
             http(api.baseUrl + "/location/analysis", "params", from, "get").then(res=>{
                 console.log(res.data.result.result.sematic_description)
                 console.log("经纬度逆向解析",res.data)
                 console.log(res.data.result.result.sematic_description)
                 thit.setData({
                     locationCityName: res.data.result.result.addressComponent.city,
                     markers: { address: res.data.result.result.sematic_description, latitude: res.data.result.result.location.lat, longitude: res.data.result.result.location.lng },
                     address: res.data.result.result.sematic_description,
                     lat: res.data.result.result.location.lat,
                     lng: res.data.result.result.location.lng
                 })
                 thit.getStoreBuyLocation(thit)
             })
         },
         fail: err => {
             thit.setData({
                 address: "定位失败",
             });
             clearInterval(thit.interval);
         }
     })
     let ha={
         memberId: 589,
         pageNum: 1,
         pageSiz: 100,
         memberSource: 601
     }
      http(api.baseUrl+"/newMemberAddress/getListByMemberId","params",ha,"get").then(res=>{
          console.log("获取收货地址", res.data.result.addressList)
          if (res.data.status.statusCode==0){
                this.setData({
                    receiverAddress:res.data.result.addressList
                })
          }else{
              receiverAddress:[]
          }
     })
  },
    dz(e){
        wx.navigateTo({
            url: '../cityList/cityList',
        })
        console.log(e.currentTarget.dataset.city)
        wx.setStorage({
            key: 'city',
            data: e.currentTarget.dataset.city,
        })
    },
    xg(e){
        console.log(e.currentTarget.dataset.aa)
        let str = JSON.stringify(e.currentTarget.dataset.aa)
        wx.navigateTo({
            url: '/pages/list/address/editAddress/editAddress?mm='+str,
        })
    },
    bindKeyInput: function (e) {
        var keywords = e.detail.value
        console.log(keywords)
        this.setData({
            keywords: keywords
        })
        http(api.baseUrl + "/location/vagueArea?kw="+keywords+"&region="+this.data.locCity).then(res=>{
            if (res.data.status.statusCode==0){
                    console.log("搜索城市列表",res.data.result.result)
                    this.setData({
                        search_list:res.data.result.result
                    })
            }
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
           wx.navigateTo({
               url: '/pages/list/address/newAddress/newAddress',
           })
    },
    district(e){
        console.log(e.currentTarget.dataset.district)
        wx.setStorage({
            key: 'district',
            data: e.currentTarget.dataset.district,
        })
        wx.switchTab({
            url: '../home/home',
        })
    },
    // 刷新按钮
    getLocationn(){
       this.onLoad()
    },
    goBack(){
        wx.navigateBack({})
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
      this.onLoad()
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
    hhh(){
       wx.switchTab({
           url: '../home/home',
       })
    },
//   根据经纬度匹配门店
    getStoreBuyLocation(thit){
        console.log(this.data.lat, this.data.lng)
        let ha={
            shopId:18 ,
            memberId:589 ,
            lat:this.data.lat ,
            lng: this.data.lng,
            supportDelivery: 0
        }
        http(api.baseUrl + "/location/match","params", ha, "get").then(res=>{
            console.log(res.data.status.statusCode)
            if (res.data.status.statusCode===0){
                console.log(res.data.result.storeList)
                thit.setData({
                    storeList: res.data.result.storeList[0]
                })
            }
            console.log(this.data.storeList)
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