const app=getApp()
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Topha:null,
    jiaonan:null,
    deliverr:false,
    pickk: true,
      address:null
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
    this.setData({
      Topha: app.globalData.statusBarHeight
    })
    this.setData({
      jiaonan: app.globalData.jiaonan
    })
    let thit=this
     wx.getLocation({
         type:"gjc02",
         success:function(res){
             console.log(res.latitude, res.longitude)
             thit.getAddress(res.latitude, res.longitude)
         },
        fail:function(err){
            console.log(err)
        }
     })
    
  },
    getAddress(latitude, longitude) {
        // 生成 QQMapWX 实例
        console.log(latitude, longitude)
        let qqmapsdk = new QQMapWX({
            key: 'X2SBZ-FPLCD-I7E46-P5D43-T3O3Z-ANBBX'
        })
        // reverseGeocoder 为 QQMapWX 解析 经纬度的方法
        let thit = this
        qqmapsdk.reverseGeocoder({
            location: { latitude, longitude },
            success(res) {
                console.log('success', res.result.address)
                thit.setData({
                    address: res.result.address
                })
            },
            fail:function(res){
                console.log(res)
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