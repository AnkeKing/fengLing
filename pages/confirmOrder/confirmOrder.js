// pages/confirmOrder/confirmOrder.js
var http = require("../../http/index.js");
var api = require("../../http/groupBying_config");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    polyline: [{
      points: [{
        longitude: 29.6463,
        latitude: 91.14695
      }, {
        longitude: 29.6463,
        latitude: 91.14695
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    nickName: "",
    phone: "",
    martop: 0,
    goodsArr: [],
    buildOrder_result: null,
    goodsList: null,
    createOrder_result:null
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      martop: getApp().globalData.statusBarHeight + getApp().globalData.jiaonan.height + 18,
      goodsArr: JSON.parse(options.goodsArr)
    })
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        // success
        console.log(res.data)
        that.setData({
          nickName: JSON.parse(res.data).nickName,
          phone: "15210795092"
        })
      },
    })
    this.getLocation();
    http(//获取商品清单
      api.storeGroupBuyDetail,
      "data",
      {
        groupBuyId: 30,
        groupBuyLeaderId: 15,
        memberId: 589,
        shopId: 18,
        storeId: 56200
      },
      "POST"
    ).then(res => {
      let goodsList = [];
      for (var s in res.data.result.goodsList) {
        for (var g in that.data.goodsArr) {
          if (res.data.result.goodsList[s].skuId == g) {
            res.data.result.goodsList[s].shopNum = that.data.goodsArr[g];
            goodsList.push(res.data.result.goodsList[s])
          }
        }
      }
      this.setData({
        goodsList: goodsList
      })
    })

    http(//团购清单
      api.buildOrder,
      "data",
      {
        groupBuyGoods: that.data.goodsArr,
        groupBuyId: "30",
        groupBuyLeaderId: "15",
        memberId: 589,
        merchantId: "403",
        shopId: 18,
        storeId: "56200"
      },
      "POST"
    ).then(res => {
      console.log("团购清单", res);

      that.setData({
        buildOrder_result: res.data.result,
        markers: [
          {
            iconPath: "../../img/ic_group_location.png",
            id: 0,
            latitude: res.data.result.lngAndlatMap.latitude,
            longitude: res.data.result.lngAndlatMap.longitude,
            width: 55,
            height: 72
          }
        ]
      })
    })
    http(//去购买
      api.createOrder,
      "data",
      {
        address: "",
        addressId: "",
        detailAddress: "",
        consignee: "123123 ",
        phoneNumber: "17600276890",
        deliveryMode: "1",
        groupBuyGoods: that.data.goodsArr,
        groupBuyId: "30",
        groupBuyLeaderId: "15",
        ip: "",
        latitude: 29.65204647110405,
        longitude: 91.15353927507525,
        memberId: 589,
        merchantId: "403",
        openId: "ougv30NhkXp6wyYeLYTOYLz1uh6k",
        remark: "",
        shopId: 18,
        storeId: "56200"
      },
      "POST"
    ).then(res => {
      that.setData({
        createOrder_result:res.data.result
      })
      console.log("去购买", res);
    })

  },
  getLocation() {
    var that = this;
    wx.showLoading({ title: "定位中", mask: true });
    wx.getLocation({
      type: 'gcj02', altitude: true,//高精度定位 //定位成功，更新定位结果 
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
          longitude: longitude, latitude: latitude,
          speed: speed, accuracy: accuracy,
        })
      }, //定位失败回调 
      fail: function () {
        wx.showToast({ title: "定位失败", icon: "none" })
      },
      complete: function () { //隐藏定位中信息进度 
        wx.hideLoading()
      }
    })
  },
  toSubmit() {
    http(//去购买
      api.createOrder,
      "data",
      {
        ip: "2",
        openId: "ougv30NhkXp6wyYeLYTOYLz1uh6k",
        orderNo: this.data.createOrder_result,
        userNumber: "2"
      },
      "POST"
    ).then(res => {
      console.log("支付", res);
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